import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ScannerBridgeService} from './scanner-bridge.service';

/**
 * Edition d'une piece jointe dans l'application installee sur le poste.
 *
 * Parcours vise : on depose le document sur le poste, Word s'ouvre, le poste
 * surveille le fichier, et des que l'utilisateur a termine la version modifiee
 * remonte seule dans le fil de conversation.
 *
 * Chaine : Angular -> extension Chrome -> serveur local `scanner.js` (resident,
 * port 3000) -> depot et ouverture. La surveillance ne peut pas vivre dans le
 * host natif, qui se termine apres chaque message : c'est le serveur resident
 * qui tient le registre des documents sortis.
 *
 * ETAT D'AVANCEMENT — les routes `/edition/*` du poste sont PREPAREES mais pas
 * encore ecrites (voir `ROUTES_EDITION` dans `fi-7480/navigateur/routes.js`), et
 * l'extension publiee ne connait pas encore l'action `edition`. Les appels
 * echouent donc proprement aujourd'hui, avec un message lisible. Rien ne sera a
 * changer ici le jour ou le poste repondra.
 *
 * UNE SEULE action d'extension est demandee (`edition`), les quatre operations
 * passant par le champ `operation` : les actions de l'extension sont figees par
 * la publication au Web Store, autant n'en ajouter qu'une.
 */

/** Operations du poste, calquees sur les routes `/edition/*` preparees. */
export type OperationEdition = 'ouvrir' | 'etat' | 'recuperer' | 'abandonner';

/** Ou en est une piece confiee au poste. */
export type PhaseEdition = 'inactif' | 'ouverture' | 'edition' | 'retour' | 'erreur';

export interface EtatEdition {
    /** Identifiant de la piece dans le fil. */
    pieceId: string;
    phase: PhaseEdition;
    /** Message lisible, renseigne en phase `erreur`. */
    message?: string;
    /** Nom du fichier tel que le poste l'a depose. */
    nomLocal?: string;
}

/** Document revenu du poste, pret a etre publie dans le fil. */
export interface RetourEdition {
    pieceId: string;
    fichier: File;
}

/** Ce que le poste renvoie pour un document en cours d'edition. */
interface DocumentPoste {
    id: string;
    nom?: string;
    /** `true` des que l'application locale a rendu la main. */
    termine?: boolean;
    /** Nom retenu par le poste apres son renommage. */
    nomFinal?: string;
    [k: string]: any;
}

@Injectable({providedIn: 'root'})
export class EditionLocaleService {

    /** Extensions confiees au poste. Word seul pour l'instant. */
    private static readonly EXTENSIONS = ['doc', 'docx'];

    /** Intervalle d'interrogation du poste pendant qu'un document est sorti. */
    private static readonly PERIODE_SONDAGE = 4000;

    /** Une edition peut durer : le plafond ne sert que de filet. */
    private static readonly DUREE_MAX = 4 * 60 * 60 * 1000;

    /** Etat courant de chaque piece, lu par les deux points d'entree de l'UI. */
    private readonly etats = new Map<string, EtatEdition>();
    readonly etats$ = new BehaviorSubject<Map<string, EtatEdition>>(new Map());

    /** Emis quand une version modifiee est revenue du poste. */
    readonly retour$ = new Subject<RetourEdition>();

    /** Sondages en cours, pour pouvoir les arreter. */
    private readonly sondages = new Map<string, any>();

    constructor(private pont: ScannerBridgeService) {
    }

    /** Vrai si la piece releve de l'edition sur poste. */
    estEditable(extension: string): boolean {
        return EditionLocaleService.EXTENSIONS.includes((extension || '').toLowerCase());
    }

    etat(pieceId: string): EtatEdition {
        return this.etats.get(pieceId) || {pieceId, phase: 'inactif'};
    }

    /** Vrai tant que la piece est entre les mains du poste. */
    estOccupee(pieceId: string): boolean {
        const phase = this.etat(pieceId).phase;
        return phase === 'ouverture' || phase === 'edition' || phase === 'retour';
    }

    private majEtat(pieceId: string, etat: Partial<EtatEdition>): void {
        const courant = this.etat(pieceId);
        this.etats.set(pieceId, {...courant, ...etat, pieceId});
        this.etats$.next(new Map(this.etats));
    }

    /**
     * Confie la piece au poste : depot, puis ouverture dans l'application
     * associee. Le poste surveille ensuite le fichier ; cette methode rend la
     * main des que l'ouverture est lancee, pas a la fin de l'edition.
     *
     * `url` est celle de la piece en ligne : c'est le poste qui la telecharge,
     * la page ne fait pas transiter le fichier.
     */
    async ouvrir(piece: { id: string; nom: string; url: string }, contexte: any = {}): Promise<void> {
        if (this.estOccupee(piece.id)) return;

        this.majEtat(piece.id, {phase: 'ouverture', message: ''});

        try {
            const reponse = await this.pont.appelerExtension<DocumentPoste>('edition', {
                operation: 'ouvrir' as OperationEdition,
                id: piece.id,
                nom: piece.nom,
                url: piece.url,
                ...contexte,
            }, 30000);

            this.majEtat(piece.id, {phase: 'edition', nomLocal: reponse?.nom || piece.nom});
            this.lancerSondage(piece.id);
        } catch (e: any) {
            this.majEtat(piece.id, {phase: 'erreur', message: this.messageLisible(e)});
        }
    }

    /**
     * Interroge le poste jusqu'a ce qu'il signale la fin de l'edition. C'est le
     * poste qui decide : il connait la fermeture de l'application et la
     * stabilisation du fichier, la page n'en sait rien.
     */
    private lancerSondage(pieceId: string): void {
        this.arreterSondage(pieceId);

        const debut = Date.now();
        const minuteur = setInterval(async () => {
            if (Date.now() - debut > EditionLocaleService.DUREE_MAX) {
                this.arreterSondage(pieceId);
                this.majEtat(pieceId, {
                    phase: 'erreur',
                    message: "L'edition dure depuis trop longtemps : le suivi a ete interrompu.",
                });
                return;
            }

            try {
                const doc = await this.pont.appelerExtension<DocumentPoste>('edition', {
                    operation: 'etat' as OperationEdition,
                    id: pieceId,
                }, 10000);

                if (doc?.termine) {
                    this.arreterSondage(pieceId);
                    await this.recuperer(pieceId, doc);
                }
            } catch (e: any) {
                // Un poste momentanement injoignable ne doit pas annuler une
                // edition en cours : on laisse le sondage reprendre au tour
                // suivant et on ne touche pas a la phase.
                console.warn('[Edition locale] sondage sans reponse', e);
            }
        }, EditionLocaleService.PERIODE_SONDAGE);

        this.sondages.set(pieceId, minuteur);
    }

    private arreterSondage(pieceId: string): void {
        const minuteur = this.sondages.get(pieceId);
        if (minuteur) {
            clearInterval(minuteur);
            this.sondages.delete(pieceId);
        }
    }

    /** Rapatrie la version modifiee et la publie sur `retour$`. */
    private async recuperer(pieceId: string, doc: DocumentPoste): Promise<void> {
        this.majEtat(pieceId, {phase: 'retour'});

        try {
            const resultat = await this.pont.appelerExtension<{ nom: string; base64: string }>('edition', {
                operation: 'recuperer' as OperationEdition,
                id: pieceId,
            }, 60000);

            if (!resultat?.base64) throw new Error('Le poste n\'a pas renvoye de contenu.');

            const nom = resultat.nom || doc.nomFinal || doc.nom || 'document.docx';
            this.retour$.next({pieceId, fichier: this.enFichier(resultat.base64, nom)});
            this.majEtat(pieceId, {phase: 'inactif', nomLocal: nom, message: ''});
        } catch (e: any) {
            this.majEtat(pieceId, {phase: 'erreur', message: this.messageLisible(e)});
        }
    }

    /** Abandonne l'edition et demande au poste de purger sa copie. */
    async abandonner(pieceId: string): Promise<void> {
        this.arreterSondage(pieceId);
        this.majEtat(pieceId, {phase: 'inactif', message: ''});

        try {
            await this.pont.appelerExtension('edition', {
                operation: 'abandonner' as OperationEdition,
                id: pieceId,
            }, 15000);
        } catch (e: any) {
            // L'abandon est d'abord un geste local : meme si le poste ne repond
            // pas, l'utilisateur doit retrouver une interface disponible.
            console.warn('[Edition locale] abandon non confirme par le poste', e);
        }
    }

    /** Remet l'etat a zero, sans parler au poste (changement de conversation). */
    reinitialiser(): void {
        this.sondages.forEach(m => clearInterval(m));
        this.sondages.clear();
        this.etats.clear();
        this.etats$.next(new Map());
    }

    private enFichier(base64: string, nom: string): File {
        // Le poste peut renvoyer une data-URL ou du base64 nu.
        const donnees = base64.includes(',') ? base64.split(',')[1] : base64;
        const binaire = atob(donnees);
        const octets = new Uint8Array(binaire.length);
        for (let i = 0; i < binaire.length; i++) octets[i] = binaire.charCodeAt(i);

        return new File([octets], nom, {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
    }

    /**
     * L'echec le plus frequent aujourd'hui est « Action non reconnue: edition »,
     * renvoye par l'extension publiee qui ne connait pas encore cette action.
     * Le dire franchement vaut mieux qu'un message d'erreur technique.
     */
    private messageLisible(e: any): string {
        const brut = (e?.message || e || '').toString();
        if (/action non reconnue/i.test(brut)) {
            return "Le poste n'est pas encore equipe de l'edition locale "
                + '(fonction absente de la version installee).';
        }
        return brut || "Le poste n'a pas pu etre joint.";
    }
}
