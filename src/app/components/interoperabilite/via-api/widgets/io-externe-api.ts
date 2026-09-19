import {environment} from '../../../../../environments/environment';

/**
 * ══ APPELS SORTANTS AVEC AUTHENTIFICATION DE PLATEFORME ══════════════════════
 *
 * Point de contact unique des écrans « Avec authentification ». Ils forment
 * une chaîne, et se lisent dans cet ordre :
 *
 *   1. PLATEFORMES  — qui nous sommes chez le partenaire : où demander un jeton,
 *                     avec quels accès, où le lire dans sa réponse, et sous quel
 *                     en-tête le renvoyer ensuite.
 *   2. REQUÊTES     — ce qu'on lui demande : une URL à emplacements nommés, une
 *                     méthode, des valeurs par défaut.
 *   3. CORRESPONDANCES — à quel champ de chez nous répond chaque champ relevé
 *                     dans ses réponses (voir plus bas).
 *   4. EXÉCUTION    — on désigne plateforme et requête, on fournit ce qui
 *                     change, et le back s'occupe d'obtenir le jeton puis de
 *                     jouer la requête.
 *
 * ATTENTION AUX NOMS D'UID : ils ne suivent pas la même convention d'un
 * endpoint à l'autre. Les authentifications s'identifient par `uid`, les
 * requêtes par `platform_request_uid`. Se tromper fait créer un doublon au lieu
 * de modifier.
 */

export const PLATEFORME_URL = `${environment.api_url}api/:io-external-platform-authentications`;
export const REQUETE_URL = `${environment.api_url}api/:io-external-platform-requests`;
export const EXECUTION_URL = `${environment.api_url}api/:io-external-token-request-proxy`;

/** Convention du projet, partagée par tous les endpoints d'écriture. */
export const ACTION_CREATION = 1;
export const ACTION_MODIFICATION = 2;
export const ACTION_SUPPRESSION = 3;

/**
 * Seules méthodes retenues, comme dans l'écran « Avec clé API ». Format
 * {value, label} : c'est ce qu'attend `select2`, employé partout dans le module.
 */
export const METHODES_HTTP = ['GET', 'POST'].map(m => ({value: m, label: m}));

/** Publication du document classé à l'issue d'une exécution. */
export const PUBLICATIONS = [
    {value: 0, label: 'Privé'},
    {value: 1, label: 'Public'},
    {value: 2, label: 'Confidentiel'},
];

export interface PlateformeRow {
    uid: string;
    name: string;
    authentication_url: string;
    authentication_method: string;
    token_path: string;
    token_header_name: string;
    token_prefix: string;
    is_active: boolean;
    date: string;
    raw: any;
}

export interface RequeteRow {
    uid: string;
    platform_auth_uid: string;
    name: string;
    target_url: string;
    method: string;
    default_params: any;
    default_path_params: any;
    default_headers: any;
    response_data_path: string;
    is_active: boolean;
    date: string;
    raw: any;
}

/**
 * Les réponses du back ne nomment pas toujours l'identifiant de la même façon
 * selon l'endpoint : on accepte les formes rencontrées plutôt que d'afficher
 * des lignes sans uid, impossibles à modifier.
 */
function premierUid(e: any, ...noms: string[]): string {
    for (const nom of noms) {
        if (e?.[nom]) return e[nom];
    }
    return '';
}

/**
 * Retrouve la plateforme à laquelle une requête est rattachée.
 *
 * Ce lien est la seule chose qui permette à l'écran d'exécution de proposer les
 * bonnes requêtes. Le back ne le nomme pas partout pareil, et l'envoie tantôt à
 * plat, tantôt imbriqué dans l'objet plateforme : on accepte les deux plutôt
 * que d'afficher « Plateforme inconnue » sur une requête pourtant bien liée.
 */
function uidPlateformeDe(e: any): string {
    const aPlat = premierUid(e,
        'platform_auth_uid', 'authentication_uid', 'platform_authentication_uid',
        'auth_uid', 'uidauthentication', 'uid_platform_auth');
    if (aPlat) return aPlat;

    const imbrique = e?.platform_auth ?? e?.platform_authentication
        ?? e?.authentication ?? e?.platform;
    if (typeof imbrique === 'string') return imbrique;
    return premierUid(imbrique, 'uid', 'platform_auth_uid');
}

export function mapPlateforme(e: any, formaterDate: (v: string) => string): PlateformeRow {
    return {
        uid: premierUid(e, 'uid', 'platform_auth_uid', 'uidauthentication'),
        name: e?.name || '',
        authentication_url: e?.authentication_url || '',
        authentication_method: (e?.authentication_method || 'POST').toUpperCase(),
        token_path: e?.token_path || 'data.token',
        token_header_name: e?.token_header_name || 'Authorization',
        token_prefix: e?.token_prefix ?? 'Bearer',
        is_active: e?.is_active ?? true,
        date: formaterDate(e?.created_at || e?.updated_at || ''),
        raw: e,
    };
}

export function mapRequete(e: any, formaterDate: (v: string) => string): RequeteRow {
    return {
        uid: premierUid(e, 'platform_request_uid', 'uid', 'uidrequest'),
        platform_auth_uid: uidPlateformeDe(e),
        name: e?.name || '',
        target_url: e?.target_url || '',
        method: (e?.method || 'GET').toUpperCase(),
        default_params: e?.default_params || {},
        default_path_params: e?.default_path_params || {},
        default_headers: e?.default_headers || {},
        response_data_path: e?.response_data_path || '',
        is_active: e?.is_active ?? true,
        date: formaterDate(e?.created_at || e?.updated_at || ''),
        raw: e,
    };
}

/**
 * Lit un objet JSON saisi à la main.
 *
 * Renvoie `null` — et non `{}` — quand la saisie est invalide : il faut pouvoir
 * distinguer « rien à envoyer » de « l'utilisateur s'est trompé », sinon on
 * enregistre silencieusement un objet vide à la place de ce qu'il a tapé.
 */
export function lireJson(texte: string): any | null {
    const t = (texte || '').trim();
    if (!t) return {};
    try {
        const valeur = JSON.parse(t);
        return (valeur && typeof valeur === 'object' && !Array.isArray(valeur)) ? valeur : null;
    } catch {
        return null;
    }
}

/** Objet → texte présentable dans une zone de saisie. */
export function ecrireJson(valeur: any): string {
    if (!valeur || (typeof valeur === 'object' && !Object.keys(valeur).length)) return '';
    try {
        return JSON.stringify(valeur, null, 2);
    } catch {
        return '';
    }
}

/**
 * Extrait le message le PLUS PARLANT d'une erreur HTTP.
 *
 * Le back emboîte le vrai motif à des profondeurs variables, et le niveau
 * supérieur ne porte souvent que le libellé HTTP générique :
 *
 *   { error: { message: "Bad Request",
 *              err: { error: "Échec de l'authentification auprès de la
 *                             plateforme: 400 Client Error…" } } }
 *
 * Afficher « Bad Request » à l'utilisateur ne lui apprend rien. On cherche donc
 * du plus précis au plus général, et le libellé HTTP ne sert que de dernier
 * recours.
 */
export function messageErreur(erreur: any, defaut = 'Une erreur est survenue.'): string {
    const corps = erreur?.error ?? erreur;

    const candidats = [
        corps?.err?.error,
        corps?.err?.message,
        corps?.error?.error,
        corps?.error?.message,
        typeof corps?.error === 'string' ? corps.error : null,
        corps?.message,
        erreur?.message,
    ];

    for (const candidat of candidats) {
        if (typeof candidat === 'string' && candidat.trim()) return candidat.trim();
    }
    return defaut;
}

/**
 * Emplacements nommés d'une URL : « /api/users/{user_id} » → ['user_id'].
 * Sert à proposer d'emblée les bons paramètres de chemin à l'exécution, plutôt
 * que de laisser deviner ce que l'URL attend.
 */
export function emplacementsDe(url: string): string[] {
    const trouves = (url || '').match(/\{([a-zA-Z0-9_]+)\}/g) || [];
    return [...new Set(trouves.map(t => t.slice(1, -1)))];
}

// ══ CORRESPONDANCES DE CHAMPS ═══════════════════════════════════════════════
//
//  Quatrième étape de la chaîne. Une fois qu'une requête a été jouée, le back
//  garde trace des champs rencontrés dans la réponse du partenaire : c'est le
//  `payload` de chaque requête ci-dessous. Cet écran sert à dire, pour chacun,
//  à quel champ de ARCHIVE WEB PRO il correspond.
//
//    payload_externe  = le nom du champ CHEZ LE PARTENAIRE (lecture seule).
//    payload_interne  = le nom du champ CHEZ NOUS (ce qu'on renseigne ici).
//
//  Le GET accepte deux filtres facultatifs : `platform_request` (uid de la
//  requête) et `remote_id` (identifiant de l'objet externe). Sans eux, il
//  renvoie toutes les requêtes avec leur payload complet.

export const RECORDS_URL = `${environment.api_url}api/:io-external-platform-response-records`;

/**
 * Endpoint d'enregistrement des associations.
 *
 * PROVISOIRE — l'endpoint dédié n'a pas encore été communiqué ; on écrit pour
 * l'instant sur celui de lecture, qui suit la convention `action` du projet.
 * Le jour où le bon est connu, c'est la SEULE ligne à changer : la forme du
 * corps envoyé est isolée dans `corpsAssociation` ci-dessous.
 */
export const ASSOCIATION_URL = RECORDS_URL;

/** Un champ rencontré dans la réponse du partenaire. */
export interface ChampExterne {
    /** Identifiant de la ligne côté back — c'est lui qu'on renvoie à l'écriture. */
    id: number | string;
    /** Identifiant de l'objet externe auquel ce champ appartient. */
    remote_id: string;
    payload_externe: string;
    payload_interne: string;
    /** Valeur au chargement : sert à savoir ce qui a réellement été modifié. */
    initial: string;
}

/** Une requête et les champs relevés dans ses réponses. */
export interface RecordRequeteRow {
    uid: string;
    name: string;
    target_url: string;
    method: string;
    response_data_path: string;
    is_active: boolean;
    plateforme_uid: string;
    plateforme_nom: string;
    champs: ChampExterne[];
    raw: any;
}

export function mapRecordRequete(e: any): RecordRequeteRow {
    // Ici la requête s'identifie par `id`, alors que l'endpoint des requêtes
    // l'appelle `platform_request_uid` : trois noms pour la même chose selon
    // l'endroit, d'où cette normalisation.
    return {
        uid: premierUid(e, 'id', 'platform_request_uid', 'uid'),
        name: e?.name || '',
        target_url: e?.target_url || '',
        method: (e?.method || 'GET').toUpperCase(),
        response_data_path: e?.response_data_path || '',
        is_active: e?.is_active ?? true,
        // La plateforme arrive imbriquée et complète : inutile d'aller la
        // rechercher sur son propre endpoint pour nommer le partenaire.
        plateforme_uid: premierUid(e?.authentication, 'uid', 'platform_auth_uid'),
        plateforme_nom: e?.authentication?.name || '',
        champs: (e?.payload || []).map((c: any) => mapChampExterne(c)),
        raw: e,
    };
}

export function mapChampExterne(c: any): ChampExterne {
    const interne = typeof c?.payload_interne === 'string' ? c.payload_interne : '';
    return {
        id: c?.id ?? '',
        remote_id: c?.remote_id != null ? String(c.remote_id) : '',
        payload_externe: c?.payload_externe || '',
        payload_interne: interne,
        initial: interne,
    };
}

/**
 * Corps envoyé pour enregistrer les associations d'une requête.
 *
 * Regroupé ici parce que c'est la partie la plus susceptible de bouger quand
 * l'endpoint définitif sera fourni : l'écran, lui, n'a pas à changer.
 * On n'envoie QUE les lignes modifiées — réécrire tout le payload à chaque
 * enregistrement ferait porter au back des mises à jour inutiles.
 */
export function corpsAssociation(requeteUid: string, modifies: ChampExterne[]): any {
    return {
        action: ACTION_MODIFICATION,
        platform_request: requeteUid,
        payload: modifies.map(c => ({
            id: c.id,
            remote_id: c.remote_id,
            payload_externe: c.payload_externe,
            payload_interne: c.payload_interne.trim(),
        })),
    };
}

/**
 * Champs internes proposés à la saisie.
 *
 * Ce sont ceux du corps envoyé à `api/:savedocuments` (voir
 * `creer-un-document`) : c'est là que finissent les données rapatriées. La
 * liste est une AIDE, pas une contrainte — le champ reste libre, un partenaire
 * pouvant alimenter une propriété qui n'y figure pas.
 */
export const CHAMPS_INTERNES: string[] = [
    'iddocuments', 'code_docs', 'lib_docs', 'desc_docs', 'date_docs', 'date_sig',
    'idtype_docs', 'idcategories', 'idboites', 'idrayons', 'idsites',
    'idproprietaire', 'dataservices', 'proprietes_docs', 'fulltexts_docs',
    'etat_docs', 'statut_docs', 'active_docs', 'publishe',
    'region', 'departement', 'idsociete', 'iduser',
];
