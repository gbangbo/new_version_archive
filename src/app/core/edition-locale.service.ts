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
    /**
     * Commentaire saisi pendant l'edition, publie avec la contribution.
     * Conserve ici et non dans le composant : il doit survivre au changement
     * de conversation et au rafraichissement du fil.
     */
    commentaire?: string;
}

/** Document revenu du poste, pret a etre publie dans le fil. */
export interface RetourEdition {
    pieceId: string;
    fichier: File;
    /** Mot de l'auteur, saisi pendant l'edition. Vide s'il n'a rien ecrit. */
    commentaire?: string;
    /**
     * Le poste tenait encore le document ouvert au moment de la publication :
     * ce qui sera saisi apres coup ne partira pas. A dire a l'utilisateur.
     */
    encoreOuvert?: boolean;
}

/** Un sondage en cours : son minuteur, son depart, et son verrou d'appel. */
interface Sondage {
    minuteur: any;
    debut: number;
    /** Vrai pendant qu'un controle est en vol, pour ne pas en lancer deux. */
    enVol: boolean;
}

/** Ce que le poste renvoie pour un document en cours d'edition. */
interface DocumentPoste {
    id: string;
    nom?: string;
    /** `false` quand le poste ne connait plus ce document (registre purge). */
    present?: boolean;
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
    private readonly sondages = new Map<string, Sondage>();

    constructor(private pont: ScannerBridgeService) {
        // Chrome ralentit les minuteurs des onglets caches — jusqu'a un par
        // minute passe cinq minutes d'arriere-plan. Un document ferme pendant
        // ce temps remonterait donc avec beaucoup de retard. On force un
        // controle des le retour sur l'onglet : le registre du poste, lui, est
        // reste a jour.
        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') this.controlerTous();
            });
        }
    }

    /** Controle immediat de tous les documents suivis. */
    private controlerTous(): void {
        this.sondages.forEach((_, pieceId) => void this.controler(pieceId));
    }

    /** Vrai si la piece releve de l'edition sur poste. */
    estEditable(extension: string): boolean {
        return EditionLocaleService.EXTENSIONS.includes((extension || '').toLowerCase());
    }

    etat(pieceId: string): EtatEdition {
        return this.etats.get(pieceId) || {pieceId, phase: 'inactif'};
    }

    /**
     * Piece actuellement confiee au poste, s'il y en a une.
     *
     * UNE SEULE EDITION A LA FOIS. Deux documents sortis en meme temps, ce
     * sont deux Word ouverts et deux retours dont rien ne dit lequel ira dans
     * quel message — et le poste n'a aucun verrou qui l'en empeche. La regle
     * est donc tenue ici, au seul endroit qui connait l'etat de toutes les
     * pieces.
     */
    pieceEnCours(): EtatEdition | null {
        for (const etat of this.etats.values()) {
            if (this.estOccupee(etat.pieceId)) return etat;
        }
        return null;
    }

    /**
     * Vrai si cette piece est bloquee par l'edition d'une AUTRE. Sert a
     * griser le bouton plutot qu'a laisser l'utilisateur buter dessus.
     */
    bloqueeParUneAutre(pieceId: string): boolean {
        const occupee = this.pieceEnCours();
        return !!occupee && occupee.pieceId !== pieceId;
    }

    /** Commentaire en cours de saisie pour cette piece. */
    commentaire(pieceId: string): string {
        return this.etat(pieceId).commentaire || '';
    }

    /**
     * Enregistre le mot que l'auteur joindra a sa contribution.
     *
     * Saisi pendant que Word est ouvert : l'utilisateur explique ce qu'il a
     * modifie sans quitter la page, et le texte part avec le document des son
     * retour — automatique a la fermeture de Word, ou provoque par `terminer`.
     */
    definirCommentaire(pieceId: string, texte: string): void {
        this.majEtat(pieceId, {commentaire: texte});
    }

    /**
     * Met fin a l'edition sans attendre la fermeture de Word et publie le
     * document tel qu'il est enregistre sur le poste.
     *
     * Le poste rend le fichier present sur le disque sans exiger que
     * l'application l'ait relache : ce qui remonte est donc le dernier
     * ENREGISTREMENT de l'utilisateur, pas forcement ce qu'il voit a l'ecran.
     * C'est a l'interface de le dire clairement avant d'appeler ceci.
     */
    async terminer(pieceId: string): Promise<void> {
        if (this.etat(pieceId).phase !== 'edition') return;

        this.arreterSondage(pieceId);
        await this.recuperer(pieceId, {id: pieceId});
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
    /**
     * `contexte` porte l'imputation et le **contributeur** : le poste renomme le
     * document avec ce nom au retour, seul moyen de distinguer les contributions
     * puisqu'aucun verrou n'empêche deux personnes d'éditer en parallèle.
     */
    async ouvrir(piece: { id: string; nom: string; url: string },
                 contexte: { imputation?: string; contributeur?: string } = {}): Promise<void> {
        if (this.estOccupee(piece.id)) return;

        // Garde defensif : l'interface grise deja le bouton, mais rien ne doit
        // pouvoir sortir un second document par un autre chemin.
        const occupee = this.pieceEnCours();
        if (occupee) {
            console.warn('[Edition locale] refus : « ' + (occupee.nomLocal || occupee.pieceId)
                + " » est deja en cours d'edition.");
            return;
        }

        // Le nom est connu des maintenant : il sert au message qui explique
        // pourquoi les autres pieces sont bloquees, des la phase « ouverture ».
        this.majEtat(piece.id, {phase: 'ouverture', message: '', nomLocal: piece.nom});

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

        const minuteur = setInterval(
            () => void this.controler(pieceId),
            EditionLocaleService.PERIODE_SONDAGE,
        );
        this.sondages.set(pieceId, {minuteur, debut: Date.now(), enVol: false});
    }

    /**
     * Demande au poste ou en est un document, et le rapatrie s'il est termine.
     *
     * Sorti du minuteur pour servir aussi au reveil d'onglet et a la reprise :
     * c'est le meme controle dans les trois cas, et il doit rester le seul
     * endroit qui decide de recuperer.
     */
    private async controler(pieceId: string): Promise<void> {
        const sondage = this.sondages.get(pieceId);
        if (!sondage || sondage.enVol) return;

        if (Date.now() - sondage.debut > EditionLocaleService.DUREE_MAX) {
            this.arreterSondage(pieceId);
            this.majEtat(pieceId, {
                phase: 'erreur',
                message: "L'edition dure depuis trop longtemps : le suivi a ete interrompu.",
            });
            return;
        }

        sondage.enVol = true;
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
        } finally {
            // `sondages` a pu etre vide entre-temps : on relache le verrou sur
            // l'entree retrouvee, pas sur une reference peut-etre perimee.
            const courant = this.sondages.get(pieceId);
            if (courant) courant.enVol = false;
        }
    }

    private arreterSondage(pieceId: string): void {
        const sondage = this.sondages.get(pieceId);
        if (sondage) {
            clearInterval(sondage.minuteur);
            this.sondages.delete(pieceId);
        }
    }

    /** Rapatrie la version modifiee et la publie sur `retour$`. */
    private async recuperer(pieceId: string, doc: DocumentPoste): Promise<void> {
        this.majEtat(pieceId, {phase: 'retour'});

        try {
            const resultat = await this.pont.appelerExtension<{
                nom: string; base64: string; encoreOuvert?: boolean;
            }>('edition', {
                operation: 'recuperer' as OperationEdition,
                id: pieceId,
            }, 60000);

            if (!resultat?.base64) throw new Error('Le poste n\'a pas renvoye de contenu.');

            const nom = resultat.nom || doc.nomFinal || doc.nom || 'document.docx';
            const commentaire = this.commentaire(pieceId);

            this.retour$.next({
                pieceId,
                fichier: this.enFichier(resultat.base64, nom),
                commentaire,
                encoreOuvert: !!resultat.encoreOuvert,
            });
            // Le commentaire est consomme : la piece redevient vierge pour une
            // edition suivante, qui ne doit pas heriter du mot precedent.
            this.majEtat(pieceId, {phase: 'inactif', nomLocal: nom, message: '', commentaire: ''});
        } catch (e: any) {
            this.majEtat(pieceId, {phase: 'erreur', message: this.messageLisible(e)});
        }
    }

    /**
     * Reprend les editions que la page avait perdues de vue.
     *
     * POURQUOI
     * Le sondage vit dans la page : il meurt avec elle. Si l'utilisateur ferme
     * l'onglet ou le navigateur pendant qu'il travaille dans Word — ou si le
     * poste redemarre — le document modifie reste sur le disque du poste et
     * plus personne ne vient le chercher. Le travail existe mais n'arrive
     * jamais dans le fil.
     *
     * Le registre du poste, lui, a survecu : il est la source de verite. On le
     * lit a l'ouverture d'une conversation et on raccroche les documents qui la
     * concernent — ceux deja termines sont publies, ceux encore ouverts
     * reprennent leur sondage.
     *
     * Silencieux par construction : un poste absent est le cas ordinaire (tout
     * le monde n'a pas le service installe), il ne doit pas afficher d'erreur a
     * chaque ouverture de conversation.
     *
     * @param piecesDuFil identifiants des pieces de la conversation affichee.
     */
    async reprendre(piecesDuFil: string[]): Promise<void> {
        const attendus = new Set(piecesDuFil.filter(Boolean));
        if (!attendus.size) return;

        let registre: { documents?: DocumentPoste[] };
        try {
            registre = await this.pont.appelerExtension<{ documents?: DocumentPoste[] }>('edition', {
                operation: 'etat' as OperationEdition,
            }, 10000);
        } catch {
            return;
        }

        for (const doc of registre?.documents || []) {
            const id = doc?.id;
            // Hors de cette conversation, ou deja suivi : on n'y touche pas.
            if (!id || !attendus.has(id) || this.sondages.has(id)) continue;
            if (doc.present === false) continue;

            if (doc.termine) {
                this.majEtat(id, {phase: 'retour', nomLocal: doc.nomFinal || doc.nom});
                await this.recuperer(id, doc);
            } else {
                this.majEtat(id, {phase: 'edition', nomLocal: doc.nom, message: ''});
                this.lancerSondage(id);
            }
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
        this.sondages.forEach(s => clearInterval(s.minuteur));
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
