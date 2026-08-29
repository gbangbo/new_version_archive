import {environment} from '../../../../environments/environment';

/**
 * ══ POINT DE CONTACT UNIQUE AVEC L'API D'IMPUTATION ══════════════════════════
 *
 * Endpoint : GET/POST  api/:imputations-save
 *
 *   GET  — paramètres : uid, document, expediteur, destinataire, statut, active.
 *          « Reçues » = destinataire=<moi>, « Envoyées » = expediteur=<moi>.
 *   POST — action (1=création, 2=modification, 3=suppression), uid, document,
 *          destinataire, parent, instruction, date_limite, est_confidentiel,
 *          active, statut, commentaire.
 *
 * Réponse GET (contrat confirmé sur données réelles) :
 *   { status, total, data: [ { id, uid, document:{id,uid,label},
 *     priorite, consigne, expediteur:{id,uid,email}, destinataire:{…},
 *     parent, instruction, statut, date_limite, accuse_reception,
 *     date_accuse_reception, date_lecture, date_traitement, date_cloture,
 *     est_confidentiel, active, created_at, updated_at, pieces_jointes[],
 *     cc[], delegations[], historiques[], messages[], conversation_id } ] }
 *
 * À noter : expediteur/destinataire ne portent QUE l'e-mail, pas le nom. Les
 * écrans résolvent le nom via auth/:liste-des-comptes (voir `construireAnnuaire`).
 */

export const IMPUTATION_URL = `${environment.api_url}api/:imputations-save`;

/** POST { imputation: <uid> } — horodate date_lecture côté serveur. */
export const IMPUTATION_LIRE_URL = `${environment.api_url}api/:imputations/lire`;

/**
 * POST — ajoute un message à la conversation d'une imputation.
 * Champs : imputation* (uid), contenu* (texte), parent_id (id du message
 * parent), visibilite, fichiers[] (vrais fichiers → envoi multipart).
 * Les messages ainsi créés reviennent dans `messages[]` du GET.
 */
export const IMPUTATION_MESSAGE_URL = `${environment.api_url}api/:imputations/message`;

/** POST { imputation, destinataire, destinataires[], instruction, date_limite,
 *  commentaire, notify } — réattribue l'imputation à un autre destinataire. */
export const IMPUTATION_TRANSFERT_URL = `${environment.api_url}api/:imputations/transfert`;

/** POST { imputation, commentaire?, notify? } — marque l'imputation traitée. */
/** POST { imputation, commentaire? } — l'émetteur valide le traitement. */
export const IMPUTATION_VALIDATION_URL = `${environment.api_url}api/:imputations/validation`;

/** POST { imputation, commentaire? } — clôt définitivement le dossier. */
export const IMPUTATION_CLOTURE_URL = `${environment.api_url}api/:imputations/cloture`;

export const IMPUTATION_TRAITEMENT_URL = `${environment.api_url}api/:imputations/traitement`;

/**
 * Fichier, qu'il vienne d'une pièce du document (jointe à la création) ou
 * d'un envoi dans la conversation. Les deux formes cohabitent dans la même
 * collection côté API et n'ont pas les mêmes champs porteurs :
 *
 *   pièce du document → nom = empreinte, le nom lisible, l'URL, le mot de
 *                       passe et le nombre de pages sont dans `piece_docs`
 *   fichier de message → nom = nom réel, URL dans `fichier`, taille renseignée
 */
export interface ImputationFichier {
    id: string;
    /** Nom lisible par un humain (jamais l'empreinte). */
    nom: string;
    /** Extension en minuscules, déduite du nom ou de l'URL. */
    extension: string;
    /** URL de consultation, vide si l'API n'en fournit pas. */
    url: string;
    taille: number;
    tailleLisible: string;
    /** Mot de passe d'ouverture, pour les PDF protégés du document. */
    motDePasse: string;
    nombrePages: number;
    /** true = pièce du document archivé, false = fichier déposé dans le fil. */
    estPieceDocument: boolean;
    raw: any;
}

/** Message de la conversation, normalisé pour l'affichage du fil. */
export interface ImputationMessage {
    id: string;
    contenu: string;
    auteur: ImputationPersonne;
    date: string;
    ts: number;
    fichiers: ImputationFichier[];
    /** Renseigné par l'API relativement à l'utilisateur qui interroge. */
    estEmis: boolean;
    visibilite: string;
    raw: any;
}

/** api/:imputations-save — valeurs du champ `action`. */
export const ACTION_CREATION = 1;
export const ACTION_MODIFICATION = 2;
export const ACTION_SUPPRESSION = 3;

/** Libellés lisibles des statuts renvoyés par l'API (EN_ATTENTE, …). */
const STATUT_LIBELLES: Record<string, string> = {
    EN_ATTENTE: 'En attente',
    EN_COURS: 'En cours',
    LU: 'Lu',
    TRAITE: 'Traité',
    TRAITEE: 'Traitée',
    VALIDE: 'Validé',
    VALIDEE: 'Validée',
    CLOTURE: 'Clôturé',
    CLOTUREE: 'Clôturée',
    REJETE: 'Rejeté',
    REJETEE: 'Rejetée',
    ANNULE: 'Annulé',
    ANNULEE: 'Annulée',
};

/**
 * Validée ? Le contrat ne garantit pas de `date_validation` : on accepte donc
 * aussi bien la date, si elle arrive un jour, que le statut renvoyé.
 */
export function estValidee(imputation: Imputation): boolean {
    if (imputation?.dateValidation) return true;
    const statut = (imputation?.statut || '').toUpperCase();
    return statut.startsWith('VALIDE');
}

/**
 * Clôturée ? Une imputation close est FIGÉE : plus de transfert, de traitement,
 * de validation, de nouvelle clôture, ni de message dans le fil. On regarde la
 * date ET le statut, le back pouvant ne renseigner que l'un des deux.
 */
export function estCloturee(imputation: Imputation | null | undefined): boolean {
    if (!imputation) return false;
    if (imputation.dateCloture) return true;
    return (imputation.statut || '').toUpperCase().startsWith('CLOTUR');
}

export function libelleStatut(statut: string): string {
    if (!statut) return '';
    return STATUT_LIBELLES[statut]
        // Repli : EN_ATTENTE_VALIDATION → « En attente validation »
        || statut.charAt(0) + statut.slice(1).toLowerCase().replace(/_/g, ' ');
}

/** Personne telle que renvoyée par l'API (uid + e-mail, sans nom). */
export interface ImputationPersonne {
    uid: string;
    email: string;
    /** Nom résolu via l'annuaire des comptes ; à défaut, l'e-mail. */
    nom: string;
    /** Renseignés pour les entrées `cc` uniquement : chaque personne en copie
     *  a son propre suivi de lecture et d'accusé de réception. */
    lu?: boolean;
    dateLecture?: string;
    accuseReception?: boolean;
    dateAccuse?: string;
}

/**
 * La référence du document arrive concaténée dans un seul libellé :
 *   « 00000020/DI/DEPARTEMENT INFORMATIQUE/2026/gj WAREN ET TRANSPORT »
 *     └───────────── référence ─────────────┘ └──── intitulé ────┘
 * On les sépare pour pouvoir hiérarchiser l'affichage : l'intitulé se lit,
 * la référence sert d'identifiant secondaire.
 */
export function decouperLabelDocument(label: string): { reference: string; titre: string } {
    const m = (label || '').match(/^(\d+\/.+?\/\d{4}\/\S+)\s+(.*)$/);
    return m
        ? {reference: m[1], titre: m[2]}
        : {reference: '', titre: label || ''};
}

export interface Imputation {
    uid: string;

    documentUid: string;
    /** Référence complète du document : « 00000020/DI/…/2026/gj INTITULÉ ». */
    documentLabel: string;
    /** Le même libellé, découpé (voir decouperLabelDocument). */
    documentReference: string;
    documentTitre: string;

    /** Libellés prêts à afficher (les objets liés sont null si non renseignés). */
    prioriteLibelle: string;
    consigneLibelle: string;
    /** Message saisi à la création : l'API le range dans l'historique. */
    messageInitial: string;

    expediteur: ImputationPersonne;
    destinataire: ImputationPersonne;

    parentUid: string;
    conversationId: string;

    instruction: string;
    statut: string;
    statutLibelle: string;

    estConfidentiel: boolean;
    active: boolean;
    accuseReception: boolean;

    /** Affichage (déjà formaté). */
    date: string;
    dateLimite: string;
    /** Cycle de vie : null tant que l'étape n'a pas eu lieu. */
    dateLecture: string;
    dateTraitement: string;
    /**
     * Le contrat de l'API ne documente pas de `date_validation`. On l'accepte si
     * elle arrive, sinon la validation ne se lit que dans `statut` — d'où
     * `estValidee`, qui regarde les deux.
     */
    dateValidation: string;
    dateCloture: string;

    /** Pièces du document jointes à la création (hors fichiers du fil). */
    piecesJointes: ImputationFichier[];
    /** Personnes en copie : ce sont les `destinataires[1..]` envoyés à la création. */
    cc: ImputationPersonne[];
    /** Fil de discussion (api/:imputations/message). */
    messages: ImputationMessage[];
    historiques: any[];

    /** Objets liés, null tant qu'ils ne sont pas renseignés à la création. */
    priorite: any;
    consigne: any;

    /** Vrai si l'imputation a déjà été ouverte par son destinataire. */
    estLue: boolean;

    ts: number;
    raw: any;
}

/**
 * Lecture d'une imputation **du point de vue d'une personne donnée**.
 *
 * Le champ `date_lecture` de premier niveau ne concerne que le destinataire
 * principal. Chaque personne en copie a son propre suivi dans `cc[]` : s'y
 * fier est indispensable, sinon une imputation apparaîtrait comme lue à
 * quelqu'un en copie dès que le destinataire principal l'a ouverte.
 *
 * L'expéditeur, lui, connaît forcément le contenu qu'il a écrit : rien à
 * signaler de son côté.
 */
export function lecturePour(imputation: Imputation, uid: string):
    { estLue: boolean; dateLecture: string } {

    if (!uid) return {estLue: true, dateLecture: ''};

    if (imputation.destinataire.uid === uid) {
        return {estLue: imputation.estLue, dateLecture: imputation.dateLecture};
    }

    const enCopie = imputation.cc.find(p => p.uid === uid);
    if (enCopie) {
        return {estLue: !!enCopie.lu, dateLecture: enCopie.dateLecture || ''};
    }

    return {estLue: true, dateLecture: ''};
}

/** Construit l'URL de liste à partir des paramètres documentés. */
export function listeImputationsUrl(params: Record<string, string | boolean | undefined>): string {
    const qs = Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
        .join('&');
    return qs ? `${IMPUTATION_URL}?${qs}` : IMPUTATION_URL;
}

/**
 * Annuaire uid → nom, bâti depuis auth/:liste-des-comptes : l'API d'imputation
 * ne renvoie que l'e-mail des personnes, or l'écran doit afficher un nom.
 */
export function construireAnnuaire(comptes: any[]): Map<string, string> {
    const annuaire = new Map<string, string>();
    (comptes || []).forEach((c: any) => {
        const p = c?.datapersonnel || c || {};
        const nom = `${p?.nom || ''} ${p?.prenom || ''}`.trim();
        const uid = c?.uid || c?.id;
        if (uid && nom) annuaire.set(String(uid), nom);
    });
    return annuaire;
}

function versPersonne(p: any, annuaire?: Map<string, string>): ImputationPersonne {
    const uid = p?.uid ? String(p.uid) : '';
    const email = p?.email || '';
    return {
        uid,
        email,
        nom: (uid && annuaire?.get(uid)) || email || '—',
    };
}

function versBooleen(v: any): boolean {
    return v === true || v === 1 || v === '1' || v === 'true';
}

/**
 * Couleurs d'avatar, à la manière d'une messagerie : un fond clair et une
 * silhouette plus soutenue de la même teinte. La couleur est tirée de l'uid
 * (à défaut du nom), donc stable pour une même personne d'un écran à l'autre.
 */
const PALETTE_AVATARS = [
    {fond: '#e3e5e8', trait: '#8b8f96'},
    {fond: '#c9e7cb', trait: '#4a9d51'},
    {fond: '#c3dcfa', trait: '#2d7ad4'},
    {fond: '#d8cdf0', trait: '#7355c0'},
    {fond: '#fbe0bd', trait: '#dd8b1a'},
    {fond: '#f9c8da', trait: '#d64a83'},
    {fond: '#bfe0dd', trait: '#2f8e86'},
    {fond: '#f8caca', trait: '#d24c4c'},
];

/**
 * Niveau d'urgence déduit du libellé de priorité.
 *
 * Les messageries professionnelles ne montrent pas le nom de la priorité mais
 * un marqueur : Outlook affiche un « ! » rouge pour une importance haute et une
 * flèche bleue vers le bas pour une importance basse (en-têtes X-Priority /
 * Importance des RFC 2156 et 4021). C'est cette convention qu'on reprend.
 *
 * Les priorités étant administrables dans l'application (api/:savepriorite),
 * on reconnaît le niveau par mot-clé. Si le back exposait un niveau numérique,
 * ce serait plus robuste — c'est la seule chose à changer ici le cas échéant.
 */
export type NiveauPriorite = 'haute' | 'normale' | 'basse';

export function niveauPriorite(libelle: string): NiveauPriorite {
    const v = (libelle || '').toLowerCase();
    if (!v) return 'normale';
    if (/haut|urgent|élev|elev|critiqu|import/.test(v)) return 'haute';
    if (/bas|faibl|mineur|différ|differ/.test(v)) return 'basse';
    return 'normale';
}

export function couleurAvatar(cle: string): { fond: string; trait: string } {
    const texte = cle || '';
    let somme = 0;
    for (let i = 0; i < texte.length; i++) {
        somme = (somme * 31 + texte.charCodeAt(i)) >>> 0;
    }
    return PALETTE_AVATARS[somme % PALETTE_AVATARS.length];
}

/**
 * Apparence d'un fichier selon son type, partagée par tous les écrans du
 * module : la carte de pièce jointe est dessinée à l'identique dans le volet
 * de lecture et dans le formulaire d'imputation.
 */
export function couleurTypeFichier(extension: string): string {
    switch ((extension || '').toLowerCase()) {
        case 'pdf':
            return '#e2453c';
        case 'doc': case 'docx': case 'odt': case 'rtf':
            return '#2b5797';
        case 'xls': case 'xlsx': case 'ods': case 'csv':
            return '#1e7145';
        case 'ppt': case 'pptx': case 'odp':
            return '#d24726';
        case 'png': case 'jpg': case 'jpeg': case 'gif': case 'webp':
        case 'bmp': case 'svg': case 'tif': case 'tiff':
            return '#7b52c7';
        case 'zip': case 'rar': case '7z': case 'tar': case 'gz':
            return '#b08b1e';
        case 'mp4': case 'avi': case 'mov': case 'mkv': case 'webm':
            return '#c1358a';
        case 'mp3': case 'wav': case 'ogg': case 'm4a':
            return '#0f8b8d';
        default:
            return '#5a6274';
    }
}

/** Les extensions longues sont ramenées à leur forme courte usuelle : à la
 *  taille de la pastille, quatre caractères deviennent illisibles. */
const LIBELLES_COURTS: Record<string, string> = {
    docx: 'DOC', xlsx: 'XLS', pptx: 'PPT', jpeg: 'JPG',
    tiff: 'TIF', html: 'HTM', webp: 'IMG', mkv: 'VID', webm: 'VID',
};

export function libelleTypeFichier(extension: string): string {
    const ext = (extension || '').toLowerCase();
    if (!ext) return 'FIC';
    return LIBELLES_COURTS[ext] || ext.toUpperCase().slice(0, 4);
}

function extensionDe(nom: string, url: string): string {
    const source = (nom || '').includes('.') ? nom : (url || '').split('?')[0];
    return source.includes('.') ? (source.split('.').pop() || '').toLowerCase() : '';
}

function tailleLisible(octets: number): string {
    if (!octets || octets <= 0) return '';
    if (octets < 1024) return `${octets} o`;
    if (octets < 1024 * 1024) return `${Math.round(octets / 1024)} Ko`;
    return `${(octets / (1024 * 1024)).toFixed(1)} Mo`;
}

/**
 * Fichier de l'API → modèle d'affichage. `piece_docs.name_piece_docs` est
 * préféré à `nom`, qui ne contient qu'une empreinte SHA illisible pour les
 * pièces du document.
 */
export function versFichier(f: any): ImputationFichier {
    const pd = f?.piece_docs || null;
    const taille = Number(f?.taille) || 0;
    const nom = pd?.name_piece_docs || f?.nom || pd?.lib_piece_docs || 'Pièce jointe';
    const url = f?.fichier || pd?.url_file_piece || '';

    return {
        id: f?.id !== undefined && f?.id !== null ? String(f.id) : '',
        nom,
        // Les pièces du document portent un nom lisible SANS extension : elle
        // n'est alors disponible que dans l'URL, avant ses paramètres de
        // signature. On teste donc le nom, puis l'URL.
        extension: extensionDe(nom, url),
        url,
        taille,
        tailleLisible: tailleLisible(taille),
        motDePasse: pd?.password_file || '',
        nombrePages: Number(pd?.nombre_page) || 0,
        estPieceDocument: !!pd,
        raw: f,
    };
}

/**
 * Un message de la conversation. La collection `messages` était vide sur les
 * jeux de données observés : on accepte donc les variantes de nommage les plus
 * probables (contenu/message, utilisateur/auteur) — à resserrer dès qu'un
 * message réel aura été observé.
 */
function versMessage(m: any, annuaire?: Map<string, string>): ImputationMessage {
    const dateVal = m?.created_at || '';
    return {
        id: m?.id !== undefined && m?.id !== null ? String(m.id) : (m?.uid || ''),
        contenu: m?.contenu || '',
        auteur: versPersonne(m?.auteur || m?.utilisateur, annuaire),
        date: formaterDateHeure(dateVal),
        ts: versTimestamp(dateVal),
        fichiers: (m?.pieces_jointes || m?.fichiers || []).map(versFichier),
        // L'API situe le message par rapport à l'utilisateur qui interroge :
        // plus fiable qu'une comparaison d'uid côté client.
        estEmis: versBooleen(m?.est_emis) || m?.direction === 'EMIS',
        visibilite: m?.visibilite || '',
        raw: m,
    };
}

function versTimestamp(v: any): number {
    if (!v) return 0;
    const t = new Date(String(v).replace(' ', 'T')).getTime();
    return isNaN(t) ? 0 : t;
}

function deuxChiffres(n: number): string {
    return n < 10 ? `0${n}` : String(n);
}

export function formaterDate(v: any): string {
    const t = versTimestamp(v);
    if (!t) return '';
    const d = new Date(t);
    return `${deuxChiffres(d.getDate())}/${deuxChiffres(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function formaterDateHeure(v: any): string {
    const t = versTimestamp(v);
    if (!t) return '';
    const d = new Date(t);
    return `${formaterDate(v)} ${deuxChiffres(d.getHours())}:${deuxChiffres(d.getMinutes())}`;
}

/** Réponse de l'API → modèle manipulé par les écrans. */
export function mapImputation(e: any, annuaire?: Map<string, string>): Imputation {
    const statut = e?.statut || '';
    const label = e?.document?.label || '';
    const {reference, titre} = decouperLabelDocument(label);
    const historiques = e?.historiques || [];
    const creation = historiques.find((h: any) => h?.action === 'IMPUTATION') || historiques[0];

    const messages = (e?.messages || [])
        // `supprimer` marque un message retiré de la conversation.
        .filter((m: any) => !versBooleen(m?.supprimer))
        .map((m: any) => versMessage(m, annuaire))
        .sort((a: ImputationMessage, b: ImputationMessage) => a.ts - b.ts);

    // `pieces_jointes` cumule les pièces jointes à la création ET les fichiers
    // déposés dans les messages. On retire ces derniers : ils s'affichent au
    // niveau du message qui les porte, pas dans le bloc de l'imputation.
    const fichiersDesMessages = new Set<string>(
        messages.flatMap((m: ImputationMessage) => m.fichiers.map(f => f.id))
    );
    const piecesJointes: ImputationFichier[] = (e?.pieces_jointes || [])
        .map(versFichier)
        .filter((f: ImputationFichier) => !fichiersDesMessages.has(f.id));

    return {
        uid: e?.uid || '',

        documentUid: e?.document?.uid || '',
        documentLabel: label,
        documentReference: reference,
        documentTitre: titre,

        prioriteLibelle: e?.priorite?.lib_priorite || e?.priorite?.libelle || '',
        consigneLibelle: e?.consigne?.libconsigne || e?.consigne?.desc_consigne || '',
        messageInitial: creation?.commentaire || '',

        expediteur: versPersonne(e?.expediteur, annuaire),
        destinataire: versPersonne(e?.destinataire, annuaire),

        parentUid: e?.parent?.uid || (typeof e?.parent === 'string' ? e.parent : ''),
        conversationId: e?.conversation_id ? String(e.conversation_id) : '',

        instruction: e?.instruction || '',
        statut,
        statutLibelle: libelleStatut(statut),

        estConfidentiel: versBooleen(e?.est_confidentiel),
        active: versBooleen(e?.active),
        accuseReception: versBooleen(e?.accuse_reception),

        date: formaterDateHeure(e?.created_at),
        dateLimite: formaterDate(e?.date_limite),
        dateLecture: formaterDateHeure(e?.date_lecture),
        dateTraitement: formaterDateHeure(e?.date_traitement),
        dateValidation: formaterDateHeure(e?.date_validation),
        dateCloture: formaterDateHeure(e?.date_cloture),

        piecesJointes,
        // Les entrées cc peuvent être la personne elle-même ou un objet qui
        // l'enveloppe (utilisateur/destinataire) selon les endpoints.
        cc: (e?.cc || []).map((c: any) => ({
            ...versPersonne(c?.utilisateur || c?.destinataire || c, annuaire),
            lu: versBooleen(c?.lu),
            dateLecture: formaterDateHeure(c?.date_lecture),
            accuseReception: versBooleen(c?.accuse_reception),
            dateAccuse: formaterDateHeure(c?.date_accuse_reception),
        })),
        messages,
        historiques: e?.historiques || [],

        priorite: e?.priorite || null,
        consigne: e?.consigne || null,

        estLue: !!e?.date_lecture,

        ts: versTimestamp(e?.created_at),
        raw: e,
    };
}
