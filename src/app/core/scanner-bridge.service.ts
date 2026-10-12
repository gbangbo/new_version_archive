import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * Pont entre l'application web et l'extension Chrome « ArchivePro Scanner Bridge ».
 *
 * Chaine complete :
 *   Angular  --chrome.runtime.sendMessage-->  extension  --HTTP-->  serveur local 127.0.0.1:3000
 *            <--------------------------------          <--------   (host natif -> NAPS2 -> scanner)
 *
 * L'extension est publiee sur le Chrome Web Store (ID abkpjkfghjedpafajkgbhafcogacopao)
 * et force-installee par politique. Elle injecte son ID dans la page ; c'est ce qui
 * permet de la joindre depuis ici.
 *
 * IMPORTANT : l'extension ne s'injecte que sur les origines declarees a son manifeste
 * (archivepro.ci, *.archivepro.ci, localhost:3000, 127.0.0.1:3000). Sur une autre
 * origine — un `ng serve` sur localhost:4200 par exemple — la detection echouera.
 * Elargir le manifeste imposerait une nouvelle soumission au Web Store (~1 mois
 * d'examen) : il faut donc developper sur une origine deja couverte.
 */

/** Fichier numerise tel que le serveur local le decrit. */
export interface ScanFile {
    name: string;
    size?: number;
    date?: string;
    fullPath?: string;
    browserUrl?: string;

    [k: string]: any;
}

export interface ScannerStatus {
    scanning: boolean;
    message: string;
    scanCount: number;
    outputDir: string;
    userHome?: string;
    uiUrl?: string;
    files: ScanFile[];
}

/**
 * Resultat d'une demande d'annulation.
 * `message` porte l'echec REEL - celui de la voie extension - et non celui du
 * repli : c'est lui qu'il faut montrer a l'utilisateur et lire dans un rapport.
 */
export interface ResultatAnnulation {
    ok: boolean;
    message?: string;
}

/** Enveloppe renvoyee par background.js pour toutes les actions. */
interface BridgeResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;

    [k: string]: any;
}

@Injectable({providedIn: 'root'})
export class ScannerBridgeService {

    /** ID de l'extension, injecte dans la page par le content script. */
    private extensionId: string | null = null;

    /** Detection en cours — evite de lancer plusieurs attentes en parallele. */
    private detection: Promise<string | null> | null = null;

    /** true des que l'extension a repondu au moins une fois. */
    readonly available$ = new BehaviorSubject<boolean>(false);

    /** Delai maximal d'une action ; un scan papier peut etre long. */
    private static readonly TIMEOUT_DEFAUT = 20000;
    // Le host n'impose plus de duree : il attend tant que la fenetre NAPS2 vit.
    // Ce plafond n'est donc qu'un filet, pour le cas ou le service worker de
    // l'extension serait arrete par Chrome et la reponse perdue. L'arret voulu
    // passe par annulerScan() ou par la fermeture de NAPS2.
    private static readonly TIMEOUT_SCAN = 1800000;

    /**
     * Nom de fichier reserve qui transforme une demande de scan en demande
     * d'annulation cote host. Les dix actions de l'extension sont figees par la
     * publication au Web Store - en ajouter une imposerait un reexamen de
     * plusieurs semaines - et la page n'a pas le droit d'appeler le poste en
     * direct. Passer par l'action 'scan' est le seul canal qui reste.
     */
    private static readonly COMMANDE_ANNULER = '__ARCHIVEPRO_ANNULER__';

    /**
     * Meme commande en appel direct, tentee en second. Elle ne marche que
     * depuis un contexte que Chrome autorise a joindre le reseau prive : pas
     * depuis `http://archivepro.ci`, mais depuis une page locale ou un poste
     * servi en HTTPS. Gardee parce qu'elle ne coute rien et depanne au besoin.
     */
    private static readonly URL_ANNULATION = 'http://localhost:3000/scan/annuler';

    // ────────────────────────────────────────────────────────────
    // Detection de l'extension
    // ────────────────────────────────────────────────────────────

    /**
     * Recherche l'ID de l'extension. Trois sources possibles, remplies par
     * content-isolated.js / content-main.js / background.js :
     *   - window.ARCHIVEPRO_EXTENSION_ID
     *   - localStorage ARCHIVEPRO_EXTENSION_ID
     *   - attribut data-archivepro-id sur <html>
     * A defaut, on attend l'evenement « archivepro-extension-ready ».
     */
    detecter(timeoutMs = 5000): Promise<string | null> {
        if (this.extensionId) return Promise.resolve(this.extensionId);
        if (this.detection) return this.detection;

        this.detection = new Promise<string | null>((resolve) => {
            const immediat = this.lireIdInjecte();
            if (immediat) {
                this.retenirId(immediat);
                resolve(immediat);
                return;
            }

            let termine = false;

            const finir = (id: string | null) => {
                if (termine) return;
                termine = true;
                window.removeEventListener('archivepro-extension-ready', surEvenement as EventListener);
                clearInterval(sondage);
                clearTimeout(echeance);
                if (id) this.retenirId(id);
                resolve(id);
            };

            const surEvenement = (e: CustomEvent<{ extensionId: string }>) => finir(e?.detail?.extensionId || null);
            window.addEventListener('archivepro-extension-ready', surEvenement as EventListener);

            // L'evenement peut avoir ete emis avant notre abonnement : on sonde aussi.
            const sondage = setInterval(() => {
                const id = this.lireIdInjecte();
                if (id) finir(id);
            }, 200);

            const echeance = setTimeout(() => finir(null), timeoutMs);
        }).finally(() => {
            this.detection = null;
        });

        return this.detection;
    }

    private lireIdInjecte(): string | null {
        const w = window as any;
        if (w.ARCHIVEPRO_EXTENSION_ID) return w.ARCHIVEPRO_EXTENSION_ID;

        try {
            const stocke = localStorage.getItem('ARCHIVEPRO_EXTENSION_ID');
            if (stocke) return stocke;
        } catch (_) {
            // localStorage indisponible (navigation privee stricte) : sans consequence
        }

        const attribut = document.documentElement.getAttribute('data-archivepro-id');
        return attribut || null;
    }

    private retenirId(id: string): void {
        this.extensionId = id;
        this.available$.next(true);
    }

    /** L'API chrome.runtime.sendMessage n'existe que dans un navigateur Chromium. */
    private get messagerie(): any | null {
        const chrome = (window as any).chrome;
        return chrome?.runtime?.sendMessage ? chrome.runtime : null;
    }

    // ────────────────────────────────────────────────────────────
    // Envoi d'une action a l'extension
    // ────────────────────────────────────────────────────────────

    /**
     * Envoie une action et resout avec le `data` de la reponse.
     * Rejette avec un message lisible si l'extension est absente, ne repond pas,
     * ou renvoie success:false.
     */
    private async envoyer<T = any>(action: string, params: any = {}, timeoutMs = ScannerBridgeService.TIMEOUT_DEFAUT): Promise<T> {
        const runtime = this.messagerie;
        if (!runtime) {
            throw new Error("Ce navigateur ne permet pas de joindre l'extension. Utilisez Google Chrome.");
        }

        const id = await this.detecter();
        if (!id) {
            this.available$.next(false);
            throw new Error(
                "Extension ArchivePro introuvable sur cette page. Verifiez qu'elle est presente "
                + 'dans chrome://extensions et que la page est bien servie depuis un domaine archivepro.ci.'
            );
        }

        return new Promise<T>((resolve, reject) => {
            let termine = false;

            const echeance = setTimeout(() => {
                if (termine) return;
                termine = true;
                reject(new Error(`Aucune reponse de l'extension pour l'action « ${action} » (delai depasse).`));
            }, timeoutMs);

            try {
                runtime.sendMessage(id, {action, ...params}, (reponse: BridgeResponse<T>) => {
                    if (termine) return;
                    termine = true;
                    clearTimeout(echeance);

                    // lastError doit etre lu, sinon Chrome journalise une erreur non geree.
                    const lastError = (window as any).chrome?.runtime?.lastError;
                    if (lastError) {
                        this.available$.next(false);
                        reject(new Error(lastError.message || "Communication impossible avec l'extension."));
                        return;
                    }

                    if (!reponse) {
                        reject(new Error("Reponse vide de l'extension."));
                        return;
                    }

                    if (!reponse.success) {
                        reject(new Error(reponse.error || `Echec de l'action « ${action} ».`));
                        return;
                    }

                    this.available$.next(true);
                    resolve((reponse.data !== undefined ? reponse.data : reponse) as T);
                });
            } catch (e: any) {
                if (termine) return;
                termine = true;
                clearTimeout(echeance);
                reject(new Error(e?.message || "Communication impossible avec l'extension."));
            }
        });
    }

    // ────────────────────────────────────────────────────────────
    // Actions exposees par background.js
    // ────────────────────────────────────────────────────────────

    /** Verifie que l'extension repond. Ne garantit pas que le scanner est pret. */
    ping(): Promise<any> {
        return this.envoyer('ping', {}, 5000);
    }

    /** Etat du poste de scan : scan en cours, nombre de fichiers, dossier de sortie. */
    status(): Promise<ScannerStatus> {
        return this.envoyer<ScannerStatus>('status');
    }

    /**
     * Declenche une numerisation. Passe par le host natif (NAPS2), donc long :
     * chargement du bac, defilement des pages, ecriture du fichier.
     */
    scan(filename: string, contexte: { userid?: string; code_societe?: string; token?: string } = {}): Promise<any> {
        return this.envoyer('scan', {
            filename,
            userid: contexte.userid || '',
            user_file_temp: contexte.userid || '',
            code_societe: contexte.code_societe || '',
            token: contexte.token || ''
        }, ScannerBridgeService.TIMEOUT_SCAN);
    }

    /**
     * Demande au poste d'arreter l'attente en cours.
     *
     * Le poste depose un temoin que la boucle du host relit : celle-ci rend la
     * main dans la seconde, ferme NAPS2 et fait echouer le scan() en attente
     * avec « Numerisation annulee ». L'ecran n'a donc rien a defaire lui-meme.
     *
     * Ne leve jamais : rend false si le poste n'a pas pu etre joint, a charge
     * de l'appelant de proposer autre chose (fermer NAPS2 a la main).
     */
    async annulerScan(): Promise<ResultatAnnulation> {
        // 1. Par l'extension : le seul canal autorise a joindre le poste depuis
        //    une page en http (Chrome interdit le reseau prive aux contextes non
        //    securises).
        let echecExtension: string;
        try {
            await this.envoyer('scan', {filename: ScannerBridgeService.COMMANDE_ANNULER}, 10000);
            return {ok: true};
        } catch (e: any) {
            echecExtension = e?.message || String(e);
            console.warn('[ArchivePro] Annulation par l extension impossible :', echecExtension);
        }

        // 2. En direct, mais SEULEMENT la ou Chrome l'autorise.
        //
        //    Sur `http://ged.archivepro.ci`, `isSecureContext` vaut false : la
        //    requete sera refusee d'office (« not a secure context [...] address
        //    space loopback »). La tenter quand meme n'apporte rien et pose une
        //    erreur CORS rouge PAR-DESSUS la vraie cause, qu'elle finit par
        //    masquer - c'est exactement ce qui a egare le diagnostic.
        if (!window.isSecureContext) {
            return {ok: false, message: echecExtension};
        }

        const stop = new AbortController();
        const echeance = setTimeout(() => stop.abort(), 4000);
        try {
            const reponse = await fetch(ScannerBridgeService.URL_ANNULATION, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: '{}',
                signal: stop.signal,
            });
            if (!reponse.ok) return {ok: false, message: echecExtension};
            const data = await reponse.json();
            return data?.success ? {ok: true} : {ok: false, message: data?.error || echecExtension};
        } catch (_) {
            return {ok: false, message: echecExtension};
        } finally {
            clearTimeout(echeance);
        }
    }

    /**
     * Liste des fichiers presents dans le dossier de scan du poste.
     *
     * La reponse a deux formes selon la version du serveur local : un tableau
     * brut (anciennes versions de /scans) ou un objet `{count, files}`. Lire
     * uniquement `data.files` renvoyait un tableau vide face a un tableau brut,
     * et l'ecran concluait « aucun document recu » alors que le fichier
     * existait. On accepte donc les deux.
     */
    async list(): Promise<ScanFile[]> {
        const data = await this.envoyer<any>('list');
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.files)) return data.files;
        if (Array.isArray(data?.data?.files)) return data.data.files;
        return [];
    }

    /** Contenu d'un fichier scanne, en data-URL base64 (`data:image/png;base64,...`). */
    async image(file: string): Promise<string> {
        const data = await this.envoyer<any>('image', {file});
        const base64 = data?.image || data?.data?.image;
        if (!base64) throw new Error(`Image « ${file} » illisible.`);
        return base64;
    }

    /**
     * Fait afficher une notification Windows sur le poste : « vos documents sont
     * partis vers ArchivePro ». Utile parce que l'utilisateur regarde NAPS2 et
     * non le navigateur au moment ou l'envoi se termine.
     *
     * Passe par l'action « process », deja presente dans background.js : ajouter
     * une action au paquet du Web Store imposerait un nouvel examen Google
     * d'environ un mois. Cote poste, /process n'a plus qu'un role de
     * notification (le televersement est fait par Angular).
     */
    notifierEnvoi(fichiers: string[], contexte: { userid?: string; code_societe?: string; token?: string } = {}): Promise<any> {
        return this.envoyer('process', {
            documents: fichiers,
            userid: contexte.userid || '',
            user_file_temp: contexte.userid || '',
            code_societe: contexte.code_societe || '',
            token: contexte.token || ''
        }, 10000);
    }

    /** Supprime un fichier du dossier de scan du poste. */
    delete(file: string): Promise<any> {
        return this.envoyer('delete', {file});
    }

    // ────────────────────────────────────────────────────────────
    // Utilitaire
    // ────────────────────────────────────────────────────────────

    /**
     * Convertit une data-URL en File, pret a etre pousse dans un FormData.
     * C'est ce qui permet de reutiliser tel quel le pipeline d'upload existant
     * (api/:saveuploadfile-temps) sans passer par Dropzone.
     */
    static dataUrlVersFile(dataUrl: string, nomFichier: string): File {
        const [entete, contenu] = dataUrl.split(',');
        const type = /:(.*?);/.exec(entete)?.[1] || 'image/png';
        const binaire = atob(contenu);
        const octets = new Uint8Array(binaire.length);
        for (let i = 0; i < binaire.length; i++) octets[i] = binaire.charCodeAt(i);
        return new File([octets], nomFichier, {type});
    }
}
