import {environment} from '../../../environments/environment';

/**
 * ══ DOCUMENTS VUS SOUS L'ANGLE DE L'IMPUTATION ═══════════════════════════════
 *
 * Endpoint : GET  api/:recherche-documents-non-imputes
 *   Paramètres : page, page_size, idsociete, is_imputed (+ search).
 *
 *   is_imputed=false → « Documents à imputer »  (a-imputer)
 *   is_imputed=true  → « Mes imputations »      (mes-imputations)
 *
 * Deux écrans, une seule source : le contrat vit ici pour qu'un changement
 * d'enveloppe ou de nom de champ ne se corrige qu'à un endroit.
 *
 * L'endpoint frère api/:imputations-save répond { status, total, data: [...] },
 * c'est donc la forme attendue en premier — les autres branches des lecteurs
 * ci-dessous sont là par prudence, faute d'avoir observé une réponse réelle.
 */

/** Une ligne du tableau : les colonnes affichées, plus l'uid pour l'imputation. */
export interface DocumentRow {
    uid: string;
    code_docs: string;
    lib_docs: string;
    libelle_type_docs: string;
    date_docs: string;
    libelle_service: string;
    auteur: string;
}

export interface ParamsListeDocuments {
    page: number;
    pageSize: number;
    idsociete: string;
    /** false = reste à imputer, true = déjà imputé. */
    isImputed: boolean;
    search?: string;
}

export function urlListeDocuments(p: ParamsListeDocuments): string {
    const params = new URLSearchParams({
        page: String(p.page),
        page_size: String(p.pageSize),
        idsociete: p.idsociete || '',
        is_imputed: String(p.isImputed),
    });
    const recherche = (p.search || '').trim();
    if (recherche) {
        params.set('search', recherche);
    }
    return `${environment.api_url}api/:recherche-documents-non-imputes?${params.toString()}`;
}

/** Les lignes de la réponse, quelle que soit la profondeur de l'enveloppe. */
export function lignesDeReponse(body: any): any[] {
    const data = body?.data;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(body?.results)) return body.results;
    return [];
}

/** Nombre total d'enregistrements, toutes pages confondues. */
export function totalDeReponse(body: any, parDefaut: number): number {
    const candidats = [
        body?.total, body?.total_count, body?.count,
        body?.data?.total, body?.data?.total_count, body?.data?.count,
        body?.pagination?.total, body?.pagination?.total_count,
    ];
    const trouve = candidats.find(v => typeof v === 'number' && !isNaN(v));
    return typeof trouve === 'number' ? trouve : parDefaut;
}

/** La réponse est-elle exploitable ? Le parseur alterne entre status et success. */
export function reponseOk(body: any): boolean {
    return !!(body?.status || body?.success);
}

/**
 * Un document de l'API vers une ligne de tableau. Les chemins alternatifs
 * (`datatype_document` tantôt tableau tantôt objet, service porté par le
 * document ou par son auteur) reflètent les variations déjà rencontrées sur
 * api/:savedocuments.
 */
export function mapperDocument(e: any, formaterDate: (d: any) => string): DocumentRow {
    const personnel = e?.datauser?.datapersonnel;
    return {
        uid: e?.uid || String(e?.id || ''),
        code_docs: e?.code_docs || '',
        lib_docs: e?.lib_docs || e?.lib_document || '',
        libelle_type_docs: e?.datatype_document?.[0]?.libelle_type_docs
            || e?.datatype_document?.libelle_type_docs || '',
        date_docs: e?.date_docs ? formaterDate(e.date_docs) : '',
        libelle_service: e?.datauser?.dataservice?.libelle || e?.dataservice?.libelle || '',
        auteur: personnel ? `${personnel.nom || ''} ${personnel.prenom || ''}`.trim() : '',
    };
}
