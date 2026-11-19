import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgApexchartsModule} from 'ng-apexcharts';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {ToastrService} from 'ngx-toastr';
import moment from 'moment';
import jsPDF from 'jspdf';
import ApexCharts from 'apexcharts';
import autoTable from 'jspdf-autotable';

import {CardComponent} from '../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../shared/components/ui/feather-icon/feather-icon.component';
import {SvgIconComponent} from '../../../shared/components/ui/svg-icon/svg-icon.component';
import {HttpService} from '../../../core/http.service';
import {Authorization} from '../../../protect/authorization.service';
import {environment} from '../../../../environments/environment';

/** Une ligne de statistique normalisée (typologie, service, direction, …). */
export interface StatItem {
    id: string;
    /** Code métier de la ligne (« piece_docs__documents__code_docs », …). */
    code: string;
    label: string;
    value: number;
    pct: number;
    raw: any;
}

/** Un bloc de statistiques affiché dans une carte. */
export interface StatGroupe {
    cle: string;
    titre: string;
    icone: string;
    couleur: string;
    items: StatItem[];
    total: number;
    /** Valeur de ?detail= si le bloc est « explorable » (direction/departement/service). */
    detail: string | null;
    /** Les cinq premières lignes, pour le palmarès sous le graphique. */
    top: StatItem[];
    reste: number;
    /** Configuration ApexCharts calculée une seule fois. */
    chart: any;
    typeChart: 'donut' | 'bar' | 'colonnes' | 'tableau';
    /** Le bloc occupe toute la largeur de la grille plutôt qu'une demi-colonne. */
    pleineLargeur: boolean;
    /** Affiche le palmarès détaillé sous le graphique. */
    palmares: boolean;
}

/** Une tuile chiffrée de l'en-tête. */
export interface Kpi {
    cle: string;
    libelle: string;
    valeur: number;
    icone: string;
    couleur: string;
}

/* ─────────────────────────────────────────────────────────────
   Détection des champs : l'API renvoie des agrégats dont les noms
   de clés varient d'un bloc à l'autre (libelle, nom, total,
   nombre…). On repère le libellé et la valeur par convention
   plutôt qu'en codant en dur un nom par bloc.
   ───────────────────────────────────────────────────────────── */
const CLES_LIBELLE = [
    'libelle', 'libelle_type_docs', 'lib_docs', 'libelle_service', 'libelle_direction',
    'libelle_departement', 'lib', 'nom', 'name', 'label', 'intitule', 'designation',
    'titre', 'typologie', 'type_document', 'type_docs', 'service', 'direction',
    'departement', 'mois', 'periode', 'annee', 'agent', 'utilisateur', 'personnel',
];

const CLES_VALEUR = [
    'total', 'total_documents', 'totaldocuments', 'nombre_documents', 'nb_documents',
    'nombre', 'nb', 'count', 'effectif', 'quantite', 'valeur', 'value',
    'total_consultations', 'nb_consultations', 'documents', 'consultations',
];

const CLES_CODE = [
    'code_docs', 'code_document', 'code_type_docs', 'code', 'reference', 'ref', 'numero',
];

/** Blocs attendus, dans l'ordre d'affichage. Le motif est testé sur le chemin JSON. */
const BLOCS: { cle: string; motif: RegExp; titre: string; icone: string; couleur: string; detail: string | null }[] = [
    {cle: 'typologie', motif: /typolog|type.?doc|categorie/i, titre: 'Répartition par typologie', icone: 'layers', couleur: '#4F46E5', detail: null},
    {cle: 'service', motif: /service/i, titre: 'Documents par service', icone: 'users', couleur: '#0EA5E9', detail: 'service'},
    {cle: 'direction', motif: /direction/i, titre: 'Documents par direction', icone: 'git-branch', couleur: '#16A34A', detail: 'direction'},
    {cle: 'departement', motif: /departement|département/i, titre: 'Documents par département', icone: 'grid', couleur: '#F59E0B', detail: 'departement'},
    {cle: 'consultation', motif: /consult/i, titre: 'Les documents les plus consultés', icone: 'eye', couleur: '#DB2777', detail: null},
    {cle: 'agent', motif: /agent|utilisateur|personnel|user/i, titre: 'Documents par agent', icone: 'user-check', couleur: '#7C3AED', detail: null},
];

/**
 * Blocs organisationnels regroupés dans une seule carte pleine largeur,
 * commutée par un sélecteur segmenté. L'ordre fixe l'ordre des onglets.
 */
const BLOCS_ORGANISATION = ['service', 'direction', 'departement'];

/** Onglet : libellé court du sélecteur segmenté. */
const ONGLETS_ORGANISATION: { cle: string; libelle: string }[] = [
    {cle: 'service', libelle: 'Services'},
    {cle: 'direction', libelle: 'Directions'},
    {cle: 'departement', libelle: 'Départements'},
];

/** Blocs occupant toute la largeur de la grille plutôt qu'une demi-colonne. */
const BLOCS_PLEINE_LARGEUR = [...BLOCS_ORGANISATION, 'consultation'];

/** Blocs dont le graphique se suffit à lui-même : pas de palmarès en dessous. */
const SANS_PALMARES = ['typologie', 'service', 'direction', 'departement', 'consultation'];

/** Bloc chronologique : rendu en courbe plutôt qu'en barres. */
const MOTIF_EVOLUTION = /mois|mensuel|month|evolution|periode|serie|timeline|jour/i;

/** Teinte de tracé commune aux graphiques (celle de la courbe d'évolution). */
const COULEUR_TRACE = '#4F46E5';

const PALETTE = [
    '#4F46E5', '#0EA5E9', '#16A34A', '#F59E0B', '#DB2777', '#7C3AED',
    '#0891B2', '#65A30D', '#EA580C', '#BE123C', '#2563EB', '#059669',
];

/**
 * Tuiles chiffrées de l'en-tête, lues dans le bloc « summary » de la réponse.
 * L'ordre du tableau est l'ordre d'affichage.
 */
const TUILES_SUMMARY: { cle: string; libelle: string; icone: string; couleur: string }[] = [
    // Chaque teinte évoque l'objet représenté : chemise en papier manille,
    // trombone en acier, encre sur la page, étiquette de classement, carton kraft.
    {cle: 'documents', libelle: 'Dossiers', icone: 'stroke-document', couleur: '#D99A1E'},
    {cle: 'pieces', libelle: 'Total pièces jointes', icone: 'stroke-file', couleur: '#64748B'},
    {cle: 'pages', libelle: 'Total pages', icone: 'stroke-journal', couleur: '#2563EB'},
    {cle: 'types_documents', libelle: 'Types de documents', icone: 'stroke-table', couleur: '#7C3AED'},
    {cle: 'boites', libelle: "Boîtes d'archivage", icone: 'stroke-archive', couleur: '#A16207'},
];

/**
 * Compteurs secondaires du « summary », montrés au dépliage. L'ordre est
 * celui du tableau ; toute autre clé numérique du summary est ajoutée à la
 * suite avec un libellé déduit, pour ne rien perdre si l'API en ajoute.
 */
const DETAILS_SUMMARY: { cle: string; libelle: string }[] = [
    // Cumuls toutes périodes confondues, en regard des compteurs filtrés des tuiles.
    {cle: 'alldocuments', libelle: 'Tous les dossiers'},
    {cle: 'allpieces', libelle: 'Toutes les pièces jointes'},
    {cle: 'documents_active', libelle: 'Dossiers actifs'},
    {cle: 'documents_inactifs', libelle: 'Dossiers inactifs'},
    {cle: 'documents_publies', libelle: 'Dossiers publics'},
    {cle: 'documents_prives', libelle: 'Dossiers privés'},
    {cle: 'documents_sans_piece', libelle: 'Dossiers sans pièce'},
];

/** Compteurs du summary volontairement écartés de l'affichage. */
const DETAILS_EXCLUS = ['categories', 'proprietes_definies', 'proprietes_renseignees'];

const MOIS_COURTS = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

@Component({
    selector: 'app-statistique',
    imports: [CommonModule, FormsModule, NgApexchartsModule, NzSelectModule,
        NzDatePickerModule, NzTooltipDirective, CardComponent, FeatherIconComponent, SvgIconComponent],
    templateUrl: './statistique.component.html',
    styleUrl: './statistique.component.scss',
})
export class StatistiqueComponent implements OnInit {

    isloading = true;
    enErreur = false;
    exportEnCours: string | null = null;

    // ── Filtres ──────────────────────────────────────────────
    annee: number = new Date().getFullYear();
    anneeOptions: number[] = [];
    dateRange: Date[] = [];
    dateStart = '';
    dateEnd = '';

    // ── Données ──────────────────────────────────────────────
    kpis: Kpi[] = [];
    /** Compteurs supplémentaires, repliés par défaut. */
    kpisDetails: { cle: string; libelle: string; valeur: number }[] = [];
    detailsDeplies = false;
    groupes: StatGroupe[] = [];
    /** Blocs à carte propre placés avant la carte organisation (typologie). */
    groupesAvant: StatGroupe[] = [];
    /** Blocs à carte propre placés après (consultations, agents). */
    groupesApres: StatGroupe[] = [];
    /** Blocs service / direction / département, groupés dans une carte commune. */
    groupesOrganisation: StatGroupe[] = [];
    /** Clé du bloc organisationnel affiché. */
    orgActive = '';
    /**
     * Onglets du sélecteur, calculés une fois par chargement. Un getter
     * renverrait un tableau neuf à chaque cycle de détection : *ngFor
     * recréerait les boutons entre le mousedown et le mouseup, et le clic
     * ne partirait jamais.
     */
    ongletsOrganisation: { cle: string; libelle: string }[] = [];
    evolution: StatItem[] = [];
    evolutionChart: any = null;

    // ── Exploration (?detail=&id=) ───────────────────────────
    detailOuvert = false;
    detailChargement = false;
    detailTitre = '';
    detailColonnes: { cle: string; libelle: string }[] = [];
    detailLignes: any[] = [];

    private users: any = {};

    constructor(
        private httService: HttpService,
        private autor: Authorization,
        private toast: ToastrService,
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers() || {};
        const courante = new Date().getFullYear();
        this.anneeOptions = Array.from({length: 6}, (_, i) => courante - i);
        this.charger();
    }

    // ═══════════════════════════════════════════════════════════
    //  Chargement
    // ═══════════════════════════════════════════════════════════
    charger(): void {
        this.isloading = true;
        this.enErreur = false;
        this.fermerDetail();

        this.httService.getData(this.construireUrl(), false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                // Trace volontaire : la structure exacte renvoyée par le tableau de
                // bord sert de référence au mappage ci-dessous.
                console.log('[dashboard/documents] payload =', res?.body);
                this.exploiter(res?.body);
            })
            .catch((err: any) => {
                this.isloading = false;
                this.enErreur = true;
                this.kpis = [];
                this.kpisDetails = [];
                this.groupes = [];
                this.groupesAvant = [];
                this.groupesApres = [];
                this.groupesOrganisation = [];
                this.ongletsOrganisation = [];
                this.evolution = [];
                this.evolutionChart = null;
                console.error('[dashboard/documents] erreur =', err);
            });
    }

    private construireUrl(parametres: { [k: string]: string } = {}): string {
        const params: string[] = [];
        if (this.dateStart && this.dateEnd) {
            params.push(`date_start=${this.dateStart}`, `date_end=${this.dateEnd}`);
        } else if (this.annee) {
            params.push(`year=${this.annee}`);
        }
        Object.keys(parametres).forEach(k => {
            if (parametres[k]) params.push(`${k}=${encodeURIComponent(parametres[k])}`);
        });
        return `${environment.api_url}api/dashboard/documents${params.length ? '?' + params.join('&') : ''}`;
    }

    // ═══════════════════════════════════════════════════════════
    //  Filtres
    // ═══════════════════════════════════════════════════════════
    onAnneeChange(annee: number): void {
        this.annee = annee;
        this.dateRange = [];
        this.dateStart = '';
        this.dateEnd = '';
        this.charger();
    }

    onRangeChange(range: Date[] | null): void {
        if (range && range.length === 2 && range[0] && range[1]) {
            this.dateRange = range;
            this.dateStart = moment(range[0]).format('YYYY-MM-DD');
            this.dateEnd = moment(range[1]).format('YYYY-MM-DD');
        } else {
            this.dateRange = [];
            this.dateStart = '';
            this.dateEnd = '';
        }
        this.charger();
    }

    reinitialiser(): void {
        this.annee = new Date().getFullYear();
        this.dateRange = [];
        this.dateStart = '';
        this.dateEnd = '';
        this.charger();
    }

    get groupeOrganisation(): StatGroupe | null {
        return this.groupesOrganisation.find(g => g.cle === this.orgActive) || null;
    }

    choisirOrganisation(cle: string): void {
        this.orgActive = cle;
    }

    get libellePeriode(): string {
        if (this.dateStart && this.dateEnd) {
            return `du ${moment(this.dateStart).format('DD/MM/YYYY')} au ${moment(this.dateEnd).format('DD/MM/YYYY')}`;
        }
        return `année ${this.annee}`;
    }

    /**
     * Vrai quand la période filtrée ne produit aucune visualisation : ni courbe
     * d'évolution, ni bloc de répartition. Les tuiles ne comptent pas, car des
     * compteurs hors période (types de documents, boîtes) restent renseignés
     * même pour une année vide — sans ce test, le bas de page restait blanc.
     */
    get aucunGraphique(): boolean {
        return !this.isloading && !this.enErreur && !this.groupes.length && !this.evolutionChart;
    }

    // ═══════════════════════════════════════════════════════════
    //  Normalisation de la réponse
    // ═══════════════════════════════════════════════════════════
    private exploiter(body: any): void {
        const racine = this.racineUtile(body);
        const collections = this.collecter(racine);

        this.groupes = [];
        this.groupesAvant = [];
        this.groupesApres = [];
        this.groupesOrganisation = [];
        const cheminsUtilises = new Set<string>();

        for (const bloc of BLOCS) {
            const trouve = this.chercherCollection(collections, bloc.motif, cheminsUtilises);
            if (!trouve) continue;
            cheminsUtilises.add(trouve.chemin);
            const items = this.normaliserItems(trouve.valeur);
            if (!items.length) continue;
            const total = items.reduce((s, i) => s + i.value, 0);
            items.forEach(i => i.pct = total ? Math.round((i.value / total) * 1000) / 10 : 0);
            items.sort((a, b) => b.value - a.value);

            const typeChart = this.typeDeRendu(bloc.cle);
            const groupe: StatGroupe = {
                ...bloc,
                items,
                total,
                top: items.slice(0, 5),
                reste: Math.max(0, items.length - 5),
                typeChart,
                pleineLargeur: BLOCS_PLEINE_LARGEUR.includes(bloc.cle),
                palmares: !SANS_PALMARES.includes(bloc.cle),
                chart: null,
            };
            groupe.chart = typeChart === 'tableau' ? null
                : typeChart === 'donut' ? this.anneau(groupe)
                    : typeChart === 'colonnes' ? this.colonnes(groupe)
                        : this.barres(groupe);
            // Identifiant ApexCharts : il permet de récupérer le rendu du
            // graphique en image au moment de l'export PDF.
            if (groupe.chart?.chart) groupe.chart.chart.id = this.idChart(groupe.cle);
            this.groupes.push(groupe);
        }

        // Répartition : service / direction / département partagent une carte,
        // qui prend dans la grille la place du premier d'entre eux. Les autres
        // blocs gardent leur rang d'origine, de part et d'autre.
        this.groupesOrganisation = BLOCS_ORGANISATION
            .map(cle => this.groupes.find(g => g.cle === cle))
            .filter((g): g is StatGroupe => !!g);
        // Onglets limités aux blocs réellement renvoyés par l'API.
        this.ongletsOrganisation = ONGLETS_ORGANISATION
            .filter(o => this.groupesOrganisation.some(g => g.cle === o.cle));
        if (!this.groupesOrganisation.some(g => g.cle === this.orgActive)) {
            this.orgActive = this.groupesOrganisation[0]?.cle || '';
        }

        const rang = this.groupes.findIndex(g => BLOCS_ORGANISATION.includes(g.cle));
        const simples = this.groupes.filter(g => !BLOCS_ORGANISATION.includes(g.cle));
        if (rang < 0) {
            this.groupesAvant = simples;
            this.groupesApres = [];
        } else {
            this.groupesAvant = simples.filter(g => this.groupes.indexOf(g) < rang);
            this.groupesApres = simples.filter(g => this.groupes.indexOf(g) > rang);
        }

        // Série chronologique
        const serie = this.chercherCollection(collections, MOTIF_EVOLUTION, cheminsUtilises);
        this.evolution = this.completerMois(serie ? this.normaliserItems(serie.valeur) : []);
        this.evolutionChart = this.evolution.length ? this.courbe(this.evolution) : null;
        if (this.evolutionChart?.chart) this.evolutionChart.chart.id = this.idChart('evolution');

        // Tuiles chiffrées, puis les compteurs secondaires du même bloc.
        this.kpis = this.construireKpis(racine);
        this.kpisDetails = this.construireDetails(racine);
    }

    /**
     * Compteurs secondaires : ceux listés dans DETAILS_SUMMARY, puis toute
     * autre valeur numérique du summary qui n'est déjà pas une tuile.
     */
    private construireDetails(racine: any): { cle: string; libelle: string; valeur: number }[] {
        const summary = this.trouverSummary(racine);
        if (!summary) return [];

        const dejaVues = new Set([...TUILES_SUMMARY.map(t => t.cle), ...DETAILS_EXCLUS]);
        const details: { cle: string; libelle: string; valeur: number }[] = [];

        for (const d of DETAILS_SUMMARY) {
            if (typeof summary[d.cle] !== 'number') continue;
            dejaVues.add(d.cle);
            details.push({cle: d.cle, libelle: d.libelle, valeur: summary[d.cle]});
        }

        for (const cle of Object.keys(summary)) {
            if (dejaVues.has(cle) || typeof summary[cle] !== 'number') continue;
            details.push({cle, libelle: this.joliLibelle(cle), valeur: summary[cle]});
        }

        return details;
    }

    basculerDetails(): void {
        this.detailsDeplies = !this.detailsDeplies;
    }

    /** Retrouve le bloc de compteurs globaux, quel que soit son nom. */
    private trouverSummary(racine: any): any {
        if (!racine || typeof racine !== 'object') return null;
        if (racine.summary && typeof racine.summary === 'object' && !Array.isArray(racine.summary)) {
            return racine.summary;
        }
        for (const cle of Object.keys(racine)) {
            const valeur = racine[cle];
            if (!valeur || typeof valeur !== 'object' || Array.isArray(valeur)) continue;
            if (/summary|resume|résumé|totaux|global|compteurs/i.test(cle)) return valeur;
        }
        return null;
    }

    /** Déballe {status, data:{…}} ou {success, result:{…}} pour atteindre les agrégats. */
    private racineUtile(body: any): any {
        if (!body || typeof body !== 'object') return {};
        for (const cle of ['data', 'result', 'results', 'donnees', 'statistiques']) {
            const sous = body[cle];
            if (sous && typeof sous === 'object' && !Array.isArray(sous)) return sous;
        }
        return body;
    }

    /** Recense les tableaux d'objets et les dictionnaires {libellé: nombre}. */
    private collecter(source: any): { chemin: string; valeur: any }[] {
        const trouve: { chemin: string; valeur: any }[] = [];
        const visiter = (noeud: any, chemin: string, profondeur: number) => {
            if (!noeud || typeof noeud !== 'object' || profondeur > 4) return;
            for (const cle of Object.keys(noeud)) {
                const valeur = noeud[cle];
                const sousChemin = chemin ? `${chemin}.${cle}` : cle;
                if (Array.isArray(valeur)) {
                    if (valeur.length) trouve.push({chemin: sousChemin, valeur});
                } else if (valeur && typeof valeur === 'object') {
                    const valeurs = Object.values(valeur);
                    if (valeurs.length && valeurs.every(v => typeof v === 'number')) {
                        trouve.push({chemin: sousChemin, valeur});
                    } else {
                        visiter(valeur, sousChemin, profondeur + 1);
                    }
                }
            }
        };
        visiter(source, '', 0);
        return trouve;
    }

    private chercherCollection(
        collections: { chemin: string; valeur: any }[],
        motif: RegExp,
        dejaPris: Set<string>,
    ): { chemin: string; valeur: any } | null {
        return collections.find(c => !dejaPris.has(c.chemin) && motif.test(c.chemin)) || null;
    }

    /** Transforme un tableau d'objets ou un dictionnaire en lignes {label, value}. */
    private normaliserItems(source: any): StatItem[] {
        if (!Array.isArray(source)) {
            return Object.keys(source || {})
                .map(cle => ({id: '', code: '', label: this.joliLibelle(cle), value: Number(source[cle]) || 0, pct: 0, raw: null}))
                .filter(i => i.label !== '');
        }
        return source.map((ligne: any) => {
            if (ligne === null || typeof ligne !== 'object') {
                return {id: '', code: '', label: String(ligne ?? ''), value: 0, pct: 0, raw: ligne};
            }
            return {
                id: this.extraireId(ligne),
                code: this.extraireCode(ligne),
                label: this.extraireLibelle(ligne),
                value: this.extraireValeur(ligne),
                pct: 0,
                raw: ligne,
            };
        }).filter(i => i.label !== '');
    }

    /**
     * Les libellés arrivent parfois encodés en entités HTML (« &amp; »,
     * « &#39; ») : on les rend lisibles ici, une fois pour toutes, pour
     * l'écran comme pour les exports.
     */
    private decoderEntites(texte: string): string {
        if (!texte || texte.indexOf('&') < 0) return texte;
        const zone = document.createElement('textarea');
        zone.innerHTML = texte;
        return zone.value;
    }

    private extraireLibelle(ligne: any): string {
        const index = this.indexerCles(ligne);

        for (const attendue of CLES_LIBELLE) {
            const cle = index.get(attendue);
            if (!cle) continue;
            const v = ligne[cle];
            if (typeof v === 'string' && v.trim() && !this.estUuid(v)) return this.decoderEntites(v.trim());
            if (typeof v === 'number') return this.libelleMois(cle, v);
        }

        // Repli : première propriété textuelle qui n'est ni un identifiant ni un UUID
        for (const cle of Object.keys(ligne)) {
            if (this.estIdentifiant(cle)) continue;
            const v = ligne[cle];
            if (typeof v === 'string' && v.trim() && !this.estUuid(v)) return this.decoderEntites(v.trim());
        }
        return '';
    }

    /**
     * L'API préfixe les colonnes jointes par la relation
     * (« type_document__libelle_type_docs ») : on indexe chaque ligne sur le
     * dernier segment de la clé pour retrouver les noms attendus.
     */
    private indexerCles(ligne: any): Map<string, string> {
        const index = new Map<string, string>();
        for (const cle of Object.keys(ligne)) {
            const nue = this.cleNue(cle);
            if (!index.has(nue)) index.set(nue, cle);
            if (!index.has(cle.toLowerCase())) index.set(cle.toLowerCase(), cle);
        }
        return index;
    }

    /** « type_document__libelle_type_docs » → « libelle_type_docs » */
    private cleNue(cle: string): string {
        const morceaux = String(cle).split('__');
        return morceaux[morceaux.length - 1].toLowerCase();
    }

    private estIdentifiant(cle: string): boolean {
        return /(^|_)(id|uid|pk|guid)$/i.test(this.cleNue(cle)) || /_id$/i.test(cle);
    }

    private estUuid(valeur: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(valeur).trim());
    }

    /** Mode de rendu d'un bloc : tableau, colonnes, anneau ou barres. */
    private typeDeRendu(cle: string): StatGroupe['typeChart'] {
        if (cle === 'typologie') return 'colonnes';
        if (cle === 'consultation') return 'tableau';
        return 'bar';
    }

    /** Code métier de la ligne, préfixe de relation compris. */
    private extraireCode(ligne: any): string {
        const index = this.indexerCles(ligne);
        for (const attendue of CLES_CODE) {
            const cle = index.get(attendue);
            if (!cle) continue;
            const v = ligne[cle];
            if (v !== null && v !== undefined && String(v).trim() !== '') return String(v).trim();
        }
        return '';
    }

    /** Identifiant de la ligne, préfixe de relation compris (« service__uid »). */
    private extraireId(ligne: any): string {
        const index = this.indexerCles(ligne);
        for (const attendue of ['uid', 'id', 'pk']) {
            const cle = index.get(attendue);
            if (!cle) continue;
            const v = ligne[cle];
            if (v !== null && v !== undefined && v !== '') return String(v);
        }
        return '';
    }

    private libelleMois(cle: string, valeur: number): string {
        if (/mois|month/i.test(cle) && valeur >= 1 && valeur <= 12) return MOIS_COURTS[valeur - 1];
        return String(valeur);
    }

    private extraireValeur(ligne: any): number {
        const index = this.indexerCles(ligne);

        for (const attendue of CLES_VALEUR) {
            const cle = index.get(attendue);
            if (!cle) continue;
            const v = ligne[cle];
            if (typeof v === 'number') return v;
            if (typeof v === 'string' && v !== '' && !isNaN(Number(v))) return Number(v);
        }

        for (const cle of Object.keys(ligne)) {
            if (this.estIdentifiant(cle)) continue;
            if (/^(annee|year|mois|month)$/i.test(this.cleNue(cle))) continue;
            if (typeof ligne[cle] === 'number') return ligne[cle];
        }
        return 0;
    }

    /** Tuiles : d'abord les compteurs scalaires de la réponse, sinon les totaux par bloc. */
    private construireKpis(racine: any): Kpi[] {
        const icones = ['stroke-document', 'stroke-file', 'stroke-user', 'stroke-search', 'stroke-sitemap', 'stroke-widget'];
        const couleurs = ['#4F46E5', '#0EA5E9', '#16A34A', '#DB2777', '#F59E0B', '#7C3AED'];

        // Cas nominal : le bloc « summary » porte les compteurs globaux.
        const summary = this.trouverSummary(racine);
        if (summary) {
            const depuisSummary = TUILES_SUMMARY
                .filter(t => typeof summary[t.cle] === 'number')
                .map(t => ({cle: t.cle, libelle: t.libelle, valeur: summary[t.cle], icone: t.icone, couleur: t.couleur}));
            if (depuisSummary.length) return depuisSummary;
        }

        // Replis, si l'API change de forme : compteurs à la racine, puis totaux des blocs.
        const tuiles: Kpi[] = [];

        Object.keys(racine || {}).forEach(cle => {
            const valeur = racine[cle];
            if (typeof valeur !== 'number') return;
            if (/^(annee|year|mois|month|id|uid|status|code)$/i.test(cle)) return;
            tuiles.push({cle, libelle: this.joliLibelle(cle), valeur, icone: '', couleur: ''});
        });

        if (!tuiles.length) {
            this.groupes.forEach(g => tuiles.push({
                cle: g.cle,
                libelle: g.cle === 'consultation' ? 'Consultations' : `Documents · ${g.titre.replace(/^.*par /i, '')}`,
                valeur: g.total,
                icone: '',
                couleur: '',
            }));
        }

        return tuiles.slice(0, 6).map((t, i) => ({
            ...t,
            icone: icones[i % icones.length],
            couleur: couleurs[i % couleurs.length],
        }));
    }

    private joliLibelle(cle: string): string {
        const texte = String(cle).replace(/[_\-.]+/g, ' ').replace(/\s+/g, ' ').trim();
        return texte.charAt(0).toUpperCase() + texte.slice(1);
    }

    // ═══════════════════════════════════════════════════════════
    //  Graphiques
    // ═══════════════════════════════════════════════════════════
    private anneau(groupe: StatGroupe): any {
        const items = groupe.items.slice(0, 10);
        return {
            series: items.map(i => i.value),
            labels: items.map(i => i.label),
            chart: {type: 'donut', height: 320, fontFamily: 'inherit'},
            colors: PALETTE,
            stroke: {width: 2, colors: ['#ffffff']},
            dataLabels: {
                enabled: true,
                formatter: (val: number) => `${Math.round(val)}%`,
                style: {fontSize: '11px', fontWeight: 600},
            },
            legend: {
                position: 'bottom',
                fontSize: '12px',
                markers: {width: 9, height: 9, radius: 9},
                itemMargin: {horizontal: 8, vertical: 3},
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '68%',
                        labels: {
                            show: true,
                            value: {fontSize: '20px', fontWeight: 700, color: '#0F172A'},
                            total: {
                                show: true,
                                label: 'Total',
                                fontSize: '12px',
                                color: '#64748B',
                                formatter: (w: any) => w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0),
                            },
                        },
                    },
                },
            },
            tooltip: {y: {formatter: (v: number) => `${v} document(s)`}},
            noData: {text: 'Aucune donnée'},
        };
    }

    /**
     * Colonnes verticales de la typologie : barres à sommet arrondi en dégradé
     * d'une seule couleur, valeur posée au-dessus dans une pastille arrondie,
     * grille légère et libellés en oblique.
     */
    private colonnes(groupe: StatGroupe): any {
        const items = groupe.items.slice(0, 10);
        return {
            series: [{name: 'Documents', data: items.map(i => i.value)}],
            chart: {
                type: 'bar',
                height: 330,
                toolbar: {show: false},
                fontFamily: 'inherit',
                dropShadow: {enabled: true, top: 4, left: 0, blur: 10, color: groupe.couleur, opacity: 0.18},
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '45%',
                    borderRadius: 6,
                    borderRadiusApplication: 'end',
                    distributed: false,
                    dataLabels: {position: 'top'},
                },
            },
            // La pastille prend la couleur de style.colors, le texte celle de
            // background.foreColor (c'est l'inverse de l'intuition, cf. ApexCharts).
            dataLabels: {
                enabled: true,
                offsetY: -22,
                formatter: (v: number) => `${v}`,
                style: {
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'inherit',
                    colors: [groupe.couleur],
                },
                background: {
                    enabled: true,
                    foreColor: '#FFFFFF',
                    borderRadius: 6,
                    padding: 5,
                    borderWidth: 0,
                    opacity: 1,
                    dropShadow: {enabled: true, top: 2, left: 0, blur: 4, color: '#0F172A', opacity: 0.12},
                },
            },
            stroke: {width: 0},
            legend: {show: false},
            // Couleur unique, dégradée du haut vers le bas.
            colors: [groupe.couleur],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.25,
                    gradientToColors: [this.eclaircir(groupe.couleur, 0.55)],
                    opacityFrom: 1,
                    opacityTo: 0.85,
                    stops: [0, 100],
                },
            },
            grid: {
                borderColor: '#EEF2F7',
                strokeDashArray: 4,
                xaxis: {lines: {show: false}},
                yaxis: {lines: {show: true}},
                // De l'air en haut pour que la pastille ne soit pas rognée.
                padding: {top: 16, right: 8, bottom: 0, left: 4},
            },
            xaxis: {
                categories: items.map(i => i.label),
                labels: {
                    rotate: -45,
                    rotateAlways: true,
                    trim: false,
                    hideOverlappingLabels: false,
                    maxHeight: 160,
                    style: {fontSize: '11px', colors: '#64748B'},
                },
                axisBorder: {show: false},
                axisTicks: {show: false},
                tooltip: {enabled: false},
            },
            yaxis: {
                min: 0,
                labels: {
                    formatter: (v: number) => `${Math.round(v)}`,
                    style: {fontSize: '11px', colors: '#94A3B8'},
                },
                axisBorder: {show: false},
                axisTicks: {show: false},
            },
            tooltip: {
                y: {formatter: (v: number) => `${v} document(s)`},
            },
            noData: {text: 'Aucune donnée'},
        };
    }

    /** Éclaircit une couleur hexadécimale vers le blanc (ratio 0 → 1). */
    private eclaircir(hex: string, ratio: number): string {
        const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
        if (!m) return hex;
        const n = parseInt(m[1], 16);
        const melange = (c: number) => Math.round(c + (255 - c) * ratio);
        const r = melange((n >> 16) & 255);
        const v = melange((n >> 8) & 255);
        const b = melange(n & 255);
        return `#${((1 << 24) | (r << 16) | (v << 8) | b).toString(16).slice(1)}`;
    }

    /**
     * Classement en barres horizontales : un ruban arrondi posé sur une
     * piste grise qui matérialise le maximum, dégradé de l'indigo clair
     * vers l'indigo de la courbe. La valeur est écrite en dehors du ruban,
     * sur le fond blanc : elle reste lisible quelle que soit la longueur de
     * la barre, et la réserve à droite est calculée pour que le ruban le
     * plus long ne vienne jamais passer dessous. Pas d'axe chiffré ni de
     * grille : la valeur est écrite, les graduations n'apprennent rien.
     */
    private barres(groupe: StatGroupe): any {
        const items = groupe.items.slice(0, 12);
        const maxValeur = Math.max(...items.map(i => i.value), 0);
        // Largeur à réserver : ~9 px par chiffre, plus la marge du libellé.
        const reserveDroite = 22 + String(maxValeur).length * 8;
        /*
         * Libellés affichés en entier : les noms longs (« DIRECTION
         * ADMINISTRATIVE ET FINANCIERE ») passent à la ligne au lieu d'être
         * coupés par des points de suspension. ApexCharts rend un tableau de
         * chaînes comme autant de lignes de texte.
         */
        const LIBELLE_MAX = 24;
        const couper = (v: any): string[] => {
            const texte = String(v ?? '').trim();
            if (!texte) return [''];

            // Un mot plus long que la ligne est découpé en morceaux
            const mots: string[] = [];
            for (const mot of texte.split(/\s+/)) {
                if (mot.length <= LIBELLE_MAX) {
                    mots.push(mot);
                    continue;
                }
                for (let i = 0; i < mot.length; i += LIBELLE_MAX) {
                    mots.push(mot.slice(i, i + LIBELLE_MAX));
                }
            }

            const lignes: string[] = [];
            let courante = '';
            for (const mot of mots) {
                if (!courante) courante = mot;
                else if ((courante + ' ' + mot).length <= LIBELLE_MAX) courante += ' ' + mot;
                else {
                    lignes.push(courante);
                    courante = mot;
                }
            }
            if (courante) lignes.push(courante);
            return lignes;
        };

        // Hauteur de ligne adaptée au libellé le plus haut
        const maxLignesLibelle = Math.max(1, ...items.map(i => couper(i.label).length));
        const hauteurLigne = 36 + (maxLignesLibelle - 1) * 13;

        return {
            series: [{name: 'Documents', data: items.map(i => i.value)}],
            chart: {
                type: 'bar',
                height: Math.max(130, items.length * hauteurLigne + 18),
                toolbar: {show: false},
                fontFamily: 'inherit',
                dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    blur: 5,
                    color: COULEUR_TRACE,
                    opacity: 0.18,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    // En pourcentage : l'épaisseur suit l'espacement des
                    // lignes, le rendu reste équilibré quel qu'en soit le nombre
                    barHeight: '12px',
                    borderRadius: 6,
                    // Arrondi aux deux bouts : le ruban se lit comme une pastille
                    borderRadiusApplication: 'around',
                    dataLabels: {position: 'top'},
                    // Piste de fond : donne l'échelle sans tracer de grille
                    colors: {
                        backgroundBarColors: ['#F1F5F9'],
                        backgroundBarRadius: 6,
                    },
                },
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                offsetX: 10,
                offsetY: 1,
                formatter: (v: number) => `${v}`,
                style: {fontSize: '10.5px', fontWeight: 700, fontFamily: 'inherit', colors: ['#0F172A']},
                background: {enabled: false},
            },
            stroke: {width: 0},
            legend: {show: false},
            colors: [COULEUR_TRACE],
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'horizontal',
                    // Clair à gauche, soutenu à droite : la barre « monte »
                    colorFrom: '#A5B4FC',
                    colorTo: COULEUR_TRACE,
                    gradientToColors: [COULEUR_TRACE],
                    shadeIntensity: 0,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            states: {
                hover: {filter: {type: 'darken', value: 0.92}},
                active: {filter: {type: 'none'}},
            },
            grid: {
                show: false,
                // De la place à droite pour la valeur, hors du ruban.
                padding: {top: 0, right: reserveDroite, bottom: 0, left: 4},
            },
            xaxis: {
                categories: items.map(i => i.label),
                labels: {show: false},
                axisBorder: {show: false},
                axisTicks: {show: false},
                // Un peu d'air au-delà du maximum : sans cette réserve, le
                // ruban le plus long touche le bord et sa valeur se retrouve
                // rabattue par-dessus la partie foncée, donc illisible.
                max: maxValeur ? maxValeur * 1.12 : undefined,
            },
            yaxis: {
                labels: {
                    style: {fontSize: '10px', fontWeight: 600, colors: '#475569'},
                    maxWidth: 210,
                    formatter: (v: any) => couper(v),
                },
            },
            tooltip: {
                // L'infobulle porte le libellé entier, même tronqué sur l'axe
                x: {formatter: (_v: any, opts: any) => items[opts?.dataPointIndex]?.label ?? ''},
                y: {formatter: (v: number) => `${v} document(s)`},
            },
            noData: {text: 'Aucune donnée'},
        };
    }

    /**
     * Courbe d'évolution reprenant la présentation « Market Graph » du gabarit :
     * colonnes fantômes en arrière-plan + ligne lissée portant les valeurs
     * dans des pastilles arrondies. Abscisse : le nom du mois.
     */
    private courbe(items: StatItem[]): any {
        const valeurs = items.map(i => i.value);
        return {
            series: [
                {name: 'Volume', type: 'column', data: valeurs},
                {name: 'Documents', type: 'line', data: valeurs},
            ],
            chart: {
                type: 'line',
                height: 300,
                stacked: false,
                toolbar: {show: false},
                fontFamily: 'inherit',
                dropShadow: {
                    enabled: true,
                    enabledOnSeries: [1],
                    top: 0, left: 0, blur: 15,
                    color: '#4F46E5',
                    opacity: 0.3,
                },
            },
            stroke: {width: [0, 3], curve: 'smooth'},
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1],
                formatter: (v: number) => `${v}`,
                style: {fontSize: '10px', fontWeight: 600, fontFamily: 'inherit'},
                background: {
                    enabled: true,
                    foreColor: '#FFFFFF',
                    borderRadius: 6,
                    padding: 5,
                    borderWidth: 0,
                    opacity: 1,
                    dropShadow: {enabled: false},
                },
            },
            colors: ['rgba(170, 175, 203, 0.25)', '#4F46E5'],
            plotOptions: {bar: {columnWidth: '20%', borderRadius: 3}},
            fill: {type: ['solid', 'solid'], opacity: [1, 1]},
            markers: {size: 0},
            grid: {borderColor: '#EEF2F7', strokeDashArray: 4},
            xaxis: {
                categories: items.map(i => this.libelleAbscisse(i.label)),
                tooltip: {enabled: false},
                axisBorder: {show: false},
                axisTicks: {show: false},
                labels: {
                    // Douze mois sur une demi-largeur : libellés compacts, pas de chevauchement.
                    rotate: 0,
                    hideOverlappingLabels: true,
                    style: {fontSize: '10px', colors: '#64748B'},
                },
            },
            yaxis: {
                labels: {
                    style: {fontSize: '11px', colors: '#64748B'},
                    formatter: (v: number) => `${Math.round(v)}`,
                },
            },
            legend: {show: false},
            tooltip: {
                shared: true,
                intersect: false,
                // Les deux séries portent la même donnée (les colonnes ne sont qu'un
                // rappel visuel) : on n'affiche qu'une seule ligne dans l'infobulle.
                custom: ({series, dataPointIndex, w}: any) => {
                    const mois = w.globals.labels[dataPointIndex] ?? '';
                    const valeur = series[1]?.[dataPointIndex] ?? 0;
                    return `<div class="st-tip">`
                        + `<span class="st-tip-x">${mois}</span>`
                        + `<span class="st-tip-y">${valeur} document(s)</span>`
                        + `</div>`;
                },
            },
            // Douze abscisses dans la largeur d'un téléphone : « Janv. » et ses
            // voisins se chevauchaient. On rétrécit puis on incline, et sous
            // 576 px on ne garde que l'initiale du mois, seule façon de les
            // tenir toutes à l'horizontale sans qu'elles se touchent.
            responsive: [
                {
                    breakpoint: 992,
                    options: {
                        xaxis: {
                            labels: {
                                rotate: -45,
                                rotateAlways: true,
                                style: {fontSize: '9px', colors: '#64748B'},
                            },
                        },
                        dataLabels: {
                            style: {fontSize: '9px', fontWeight: 600, fontFamily: 'inherit'},
                            background: {enabled: true, foreColor: '#FFFFFF', borderRadius: 5, padding: 4, borderWidth: 0, opacity: 1, dropShadow: {enabled: false}},
                        },
                    },
                },
                {
                    breakpoint: 576,
                    options: {
                        chart: {height: 260},
                        xaxis: {
                            labels: {
                                rotate: 0,
                                rotateAlways: false,
                                hideOverlappingLabels: false,
                                formatter: (valeur: string) => this.initialeMois(valeur),
                                style: {fontSize: '10px', colors: '#64748B'},
                            },
                        },
                        plotOptions: {bar: {columnWidth: '38%', borderRadius: 2}},
                        dataLabels: {
                            style: {fontSize: '8px', fontWeight: 600, fontFamily: 'inherit'},
                            background: {enabled: true, foreColor: '#FFFFFF', borderRadius: 4, padding: 3, borderWidth: 0, opacity: 1, dropShadow: {enabled: false}},
                        },
                    },
                },
            ],
        };
    }

    /**
     * Abscisse réduite pour les très petits écrans : l'initiale quand le
     * libellé est bien un mois connu (« Janv. » → « J »), sinon les trois
     * premiers caractères, pour ne pas rendre illisible un axe non mensuel.
     */
    private initialeMois(valeur: string): string {
        const texte = String(valeur ?? '').trim();
        if (!texte) return '';
        return MOIS_COURTS.includes(texte) ? texte.charAt(0) : texte.slice(0, 3);
    }

    /**
     * Extrait l'année et le mois d'un libellé de période
     * (« 2026-01 », « 01/2026 », « 2026-01-15 », « 1 » ou « Janv. »), sinon null.
     */
    private periodeDe(label: string): { annee: number | null; mois: number } | null {
        const brut = String(label ?? '').trim();
        if (!brut) return null;

        let m = brut.match(/^(\d{4})[-\/.](\d{1,2})(?:[-\/.]\d{1,2})?$/);
        if (m) {
            const mois = Number(m[2]);
            if (mois >= 1 && mois <= 12) return {annee: Number(m[1]), mois};
        }

        m = brut.match(/^(\d{1,2})[-\/.](\d{4})$/);
        if (m) {
            const mois = Number(m[1]);
            if (mois >= 1 && mois <= 12) return {annee: Number(m[2]), mois};
        }

        if (/^\d{1,2}$/.test(brut)) {
            const n = Number(brut);
            if (n >= 1 && n <= 12) return {annee: null, mois: n};
        }

        const i = MOIS_COURTS.findIndex(x => x.toLowerCase() === brut.toLowerCase());
        if (i >= 0) return {annee: null, mois: i + 1};

        return null;
    }

    /** « 2026-01 », « 01/2026 », « 2026-01-15 » ou « 1 » → « Janv. » */
    private libelleAbscisse(label: string): string {
        const periode = this.periodeDe(label);
        return periode ? MOIS_COURTS[periode.mois - 1] : String(label ?? '').trim();
    }

    /**
     * Complète la série pour que tous les mois de la période figurent sur l'axe,
     * y compris ceux sans aucun document (valeur 0). Bornes : l'intervalle de dates
     * sélectionné, sinon les douze mois de l'année retenue.
     */
    private completerMois(items: StatItem[]): StatItem[] {
        if (!items.length) return items;

        // Libellés non chronologiques : on laisse la série telle quelle.
        const connus = new Map<string, StatItem>();
        for (const item of items) {
            const periode = this.periodeDe(item.label);
            if (!periode) return items;
            connus.set(`${periode.annee ?? ''}-${periode.mois}`, item);
        }

        let debut: moment.Moment;
        let fin: moment.Moment;
        if (this.dateStart && this.dateEnd) {
            debut = moment(this.dateStart, 'YYYY-MM-DD').startOf('month');
            fin = moment(this.dateEnd, 'YYYY-MM-DD').startOf('month');
        } else {
            debut = moment({year: this.annee, month: 0, day: 1});
            fin = moment({year: this.annee, month: 11, day: 1});
        }
        if (!debut.isValid() || !fin.isValid() || fin.isBefore(debut)) return items;
        if (fin.diff(debut, 'months') > 120) return items;  // garde-fou

        const complet: StatItem[] = [];
        const curseur = debut.clone();
        while (!curseur.isAfter(fin, 'month')) {
            const mois = curseur.month() + 1;
            const annee = curseur.year();
            const existant = connus.get(`${annee}-${mois}`) ?? connus.get(`-${mois}`);
            complet.push(existant ?? {
                id: '',
                code: '',
                label: `${annee}-${String(mois).padStart(2, '0')}`,
                value: 0,
                pct: 0,
                raw: null,
            });
            curseur.add(1, 'month');
        }
        return complet;
    }

    // ═══════════════════════════════════════════════════════════
    //  Exploration : ?detail=direction|departement|service&id=
    // ═══════════════════════════════════════════════════════════
    ouvrirDetail(groupe: StatGroupe, item: StatItem): void {
        if (!groupe.detail) return;
        this.detailOuvert = true;
        this.detailChargement = true;
        this.detailTitre = `${groupe.titre.replace(/^Documents par /i, '')} · ${item.label}`;
        this.detailColonnes = [];
        this.detailLignes = [];

        const url = this.construireUrl({detail: groupe.detail, id: item.id});
        this.httService.getData(url, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.detailChargement = false;
                console.log('[dashboard/documents?detail] payload =', res?.body);
                const racine = this.racineUtile(res?.body);
                const lignes = this.premierTableau(racine);
                this.detailLignes = lignes;
                this.detailColonnes = this.colonnesDe(lignes);
            })
            .catch(() => {
                this.detailChargement = false;
                this.toast.error('Impossible de charger le détail.', 'Tableau de bord');
            });
    }

    fermerDetail(): void {
        this.detailOuvert = false;
        this.detailLignes = [];
        this.detailColonnes = [];
        this.detailTitre = '';
    }

    private premierTableau(racine: any): any[] {
        if (Array.isArray(racine)) return racine;
        const collections = this.collecter(racine).filter(c => Array.isArray(c.valeur));
        // Le plus grand tableau est celui de la liste détaillée.
        return collections.sort((a, b) => b.valeur.length - a.valeur.length)[0]?.valeur || [];
    }

    private colonnesDe(lignes: any[]): { cle: string; libelle: string }[] {
        const premiere = lignes.find(l => l && typeof l === 'object');
        if (!premiere) return [];
        return Object.keys(premiere)
            .filter(cle => {
                const v = premiere[cle];
                return v === null || ['string', 'number', 'boolean'].includes(typeof v);
            })
            .filter(cle => !/^(uid|pk)$|_id$/i.test(cle))
            .slice(0, 8)
            .map(cle => ({cle, libelle: this.joliLibelle(cle)}));
    }

    valeurCellule(ligne: any, cle: string): string {
        const v = ligne?.[cle];
        if (v === null || v === undefined || v === '') return '—';
        if (typeof v === 'boolean') return v ? 'Oui' : 'Non';
        if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)) return moment(v).format('DD/MM/YYYY');
        return String(v);
    }

    // ═══════════════════════════════════════════════════════════
    //  Export doc / pdf
    //
    //  Les fichiers sont fabriqués ici, à partir des chiffres déjà
    //  affichés : l'export rendu par le serveur (?export=) arrivait
    //  vide, le PDF comme le Word n'affichaient rien à l'ouverture.
    // ═══════════════════════════════════════════════════════════
    async exporter(format: 'doc' | 'pdf'): Promise<void> {
        if (this.exportEnCours) return;
        if (!this.sectionsExport().length) {
            this.toast.error('Aucune donnée à exporter.', 'Tableau de bord');
            return;
        }

        this.exportEnCours = format;
        try {
            if (format === 'pdf') await this.exporterPdf();
            else this.exporterWord();
        } catch {
            this.toast.error("L'export a échoué.", 'Tableau de bord');
        } finally {
            this.exportEnCours = null;
        }
    }

    /** Nom de fichier commun aux deux formats. */
    private nomFichierExport(extension: string): string {
        const suffixe = this.dateStart && this.dateEnd
            ? `${this.dateStart}_${this.dateEnd}`
            : `${this.annee}`;
        return `tableau-de-bord-documents_${suffixe}.${extension}`;
    }

    /** Contenu exporté : les chiffres de l'écran, mis à plat en tableaux. */
    private sectionsExport(): { titre: string; entetes: string[]; lignes: string[][] }[] {
        const sections: { titre: string; entetes: string[]; lignes: string[][] }[] = [];
        const nombre = (v: number) => new Intl.NumberFormat('fr-FR').format(v || 0);

        const indicateurs = [
            ...this.kpis.map(k => [k.libelle, nombre(k.valeur)]),
            ...this.kpisDetails.map(d => [d.libelle, nombre(d.valeur)]),
        ];
        if (indicateurs.length) {
            sections.push({titre: 'Indicateurs', entetes: ['Indicateur', 'Valeur'], lignes: indicateurs});
        }

        if (this.evolution.length) {
            sections.push({
                titre: 'Évolution des documents',
                entetes: ['Période', 'Documents'],
                lignes: this.evolution.map(e => [e.label, nombre(e.value)]),
            });
        }

        for (const groupe of this.groupes) {
            if (!groupe.items?.length) continue;
            sections.push({
                titre: groupe.titre,
                entetes: ['Libellé', 'Nombre', 'Part'],
                lignes: groupe.items.map(i => [
                    i.label,
                    nombre(i.value),
                    `${(i.pct ?? 0).toFixed(1).replace('.', ',')} %`,
                ]),
            });
        }

        return sections;
    }

    private chargerImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    /** PDF paginé : en-tête de marque, période, puis un tableau par section. */
    private async exporterPdf(): Promise<void> {
        const doc = new jsPDF({orientation: 'portrait', unit: 'mm', format: 'a4'});
        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const left = 14;
        const NAVY: [number, number, number] = [0, 54, 110];

        let logo: HTMLImageElement | null = null;
        try {
            logo = await this.chargerImage('assets/images/logo/logo_apw_full.png');
        } catch {
            logo = null;
        }

        let y = 12;
        if (logo?.naturalWidth) {
            const h = 16;
            const w = h * (logo.naturalWidth / logo.naturalHeight);
            doc.addImage(logo, 'PNG', left, y, w, h);
            y += h;
        } else {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(15);
            doc.setTextColor(...NAVY);
            doc.text('ARCHIVE PRO', left, y + 6);
            y += 10;
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`Édité le ${moment().format('DD/MM/YYYY [à] HH:mm')}`, pageW - left, 16, {align: 'right'});

        y += 8;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(...NAVY);
        doc.text('TABLEAU DE BORD DES DOCUMENTS', pageW / 2, y, {align: 'center'});

        y += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`Période : ${this.libellePeriode}`, pageW / 2, y, {align: 'center'});
        y += 8;

        y += 4;
        const largeurTexte = pageW - left * 2;

        // Tuiles chiffrées de l'en-tête (dossiers, pièces, pages…)
        y = this.dessinerTuilesKpi(doc, left, largeurTexte, y);

        // Rendu des graphiques en image, dans l'ordre des sections
        const images = await this.imagesDesGraphiques();

        for (const section of this.recitExport()) {
            // Un titre seul en bas de page : on passe à la suivante
            if (y > pageH - 34) {
                doc.addPage();
                y = 20;
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11.5);
            doc.setTextColor(...NAVY);
            doc.text(section.titre, left, y);
            y += 6;

            // Le graphique tel qu'il est affiché à l'écran
            const image = section.cle ? images.get(section.cle) : null;
            if (image) {
                const hauteur = Math.min(
                    largeurTexte * (image.hauteur / image.largeur),
                    pageH - 60
                );
                if (y + hauteur > pageH - 16) {
                    doc.addPage();
                    y = 20;
                }
                doc.addImage(image.uri, 'PNG', left, y, largeurTexte, hauteur);
                y += hauteur + 7;
            }

            // Blocs présentés en tableau à l'écran (documents les plus
            // consultés) : le PDF reprend le tableau, pas seulement le récit.
            const groupe = section.cle ? this.groupes.find(g => g.cle === section.cle) : null;
            if (groupe && groupe.typeChart === 'tableau' && groupe.items.length) {
                autoTable(doc, {
                    startY: y,
                    head: [['Code', 'Libellé du document', 'Total vues']],
                    body: groupe.items.map(i => [
                        i.code || '—',
                        i.label || '',
                        this.nombreFr(i.value),
                    ]),
                    styles: {fontSize: 8.5, cellPadding: 2, overflow: 'linebreak'},
                    headStyles: {fillColor: NAVY, textColor: 255, fontStyle: 'bold'},
                    alternateRowStyles: {fillColor: [246, 249, 252]},
                    columnStyles: {0: {cellWidth: 38}, 2: {cellWidth: 22, halign: 'right'}},
                    margin: {left, right: left},
                });
                y = ((doc as any).lastAutoTable?.finalY ?? y) + 8;
            }

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(30, 41, 59);

            for (const paragraphe of section.paragraphes) {
                const lignes: string[] = doc.splitTextToSize(paragraphe, largeurTexte);
                for (const ligne of lignes) {
                    if (y > pageH - 18) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.text(ligne, left, y);
                    y += 5.2;
                }
                y += 2.5;
            }

            y += 4;
        }

        doc.save(this.nomFichierExport('pdf'));
    }

    /**
     * Tuiles chiffrées de l'en-tête, redessinées dans le PDF : les mêmes
     * nombres que l'écran (dossiers, pièces jointes, pages, types de
     * documents, boîtes), suivis des compteurs secondaires.
     */
    private dessinerTuilesKpi(doc: jsPDF, left: number, largeur: number, yDepart: number): number {
        if (!this.kpis.length) return yDepart;

        const NAVY: [number, number, number] = [0, 54, 110];
        const parLigne = 3;
        const ecart = 4;
        const largeurTuile = (largeur - ecart * (parLigne - 1)) / parLigne;
        const hauteurTuile = 19;
        let y = yDepart;

        this.kpis.forEach((kpi, index) => {
            const colonne = index % parLigne;
            if (colonne === 0 && index > 0) y += hauteurTuile + ecart;
            const x = left + colonne * (largeurTuile + ecart);

            doc.setFillColor(248, 250, 252);
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.2);
            doc.roundedRect(x, y, largeurTuile, hauteurTuile, 2, 2, 'FD');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(...NAVY);
            doc.text(this.nombreFr(kpi.valeur), x + 4, y + 8.5);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(100, 116, 139);
            const libelle: string[] = doc.splitTextToSize(kpi.libelle.toUpperCase(), largeurTuile - 8);
            doc.text(libelle.slice(0, 2), x + 4, y + 13.5);
        });

        y += hauteurTuile + 6;

        // Compteurs secondaires sur une ligne compacte
        if (this.kpisDetails.length) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.5);
            doc.setTextColor(100, 116, 139);
            const detail = this.kpisDetails
                .map(d => `${d.libelle} : ${this.nombreFr(d.valeur)}`)
                .join('   •   ');
            const lignes: string[] = doc.splitTextToSize(detail, largeur);
            doc.text(lignes, left, y);
            y += lignes.length * 4.4 + 3;
        }

        return y + 2;
    }

    /* ── Graphiques repris en image dans le PDF ─────────────────── */

    /** Identifiant ApexCharts d'un bloc, posé à la construction du graphique. */
    private idChart(cle: string): string {
        return `st-chart-${cle}`;
    }

    /** Demande à ApexCharts le rendu PNG d'un graphique déjà affiché. */
    private async imageChart(cle: string): Promise<{ uri: string; largeur: number; hauteur: number } | null> {
        try {
            const res: any = await (ApexCharts as any).exec(this.idChart(cle), 'dataURI', {scale: 2});
            const uri: string = res?.imgURI || '';
            if (!uri) return null;
            const img = await this.chargerImage(uri);
            return {uri, largeur: img.naturalWidth || 1, hauteur: img.naturalHeight || 1};
        } catch {
            return null;
        }
    }

    /**
     * Images de tous les graphiques, indexées par clé de bloc.
     *
     * Les blocs service / direction / département partagent une carte à
     * onglets : seul l'onglet actif est monté. On les parcourt donc le temps
     * de l'export, puis l'onglet d'origine est rétabli.
     */
    private async imagesDesGraphiques(): Promise<Map<string, { uri: string; largeur: number; hauteur: number }>> {
        const images = new Map<string, { uri: string; largeur: number; hauteur: number }>();

        const evolution = await this.imageChart('evolution');
        if (evolution) images.set('evolution', evolution);

        for (const groupe of this.groupes) {
            if (!groupe.chart) continue;

            if (BLOCS_ORGANISATION.includes(groupe.cle)) continue;
            const image = await this.imageChart(groupe.cle);
            if (image) images.set(groupe.cle, image);
        }

        // Onglets d'organisation : on affiche chacun à son tour
        const ongletInitial = this.orgActive;
        for (const groupe of this.groupesOrganisation) {
            if (!groupe.chart) continue;
            this.orgActive = groupe.cle;
            this.cdr.detectChanges();
            // Laisser à ApexCharts le temps de monter et d'animer le rendu
            await new Promise(resolve => setTimeout(resolve, 450));
            const image = await this.imageChart(groupe.cle);
            if (image) images.set(groupe.cle, image);
        }
        if (ongletInitial) {
            this.orgActive = ongletInitial;
            this.cdr.detectChanges();
        }

        return images;
    }

    /* ── Mise en mots du tableau de bord (contenu du PDF) ───────── */

    private nombreFr(v: number): string {
        return new Intl.NumberFormat('fr-FR').format(v || 0);
    }

    private pourcentFr(v: number): string {
        return `${(v ?? 0).toFixed(1).replace('.', ',')} %`;
    }

    /** « 3 documents », « 1 document ». */
    private quantite(v: number, singulier: string, pluriel = `${singulier}s`): string {
        return `${this.nombreFr(v)} ${v > 1 ? pluriel : singulier}`;
    }

    /** Énumération naturelle : « a, b et c ». */
    private enumerer(parties: string[]): string {
        if (parties.length <= 1) return parties[0] || '';
        return `${parties.slice(0, -1).join(', ')} et ${parties[parties.length - 1]}`;
    }

    /**
     * Le tableau de bord raconté en phrases : c'est ce que reprend le PDF,
     * à la place des tableaux de chiffres (le Word, lui, garde les tableaux).
     */
    private recitExport(): { titre: string; cle: string | null; paragraphes: string[] }[] {
        const sections: { titre: string; cle: string | null; paragraphes: string[] }[] = [];

        // ── Indicateurs ──
        if (this.kpis.length) {
            const paragraphes: string[] = [];
            paragraphes.push(
                `Sur la période (${this.libellePeriode}), le fonds documentaire représente `
                + this.enumerer(this.kpis.map(k => `${this.nombreFr(k.valeur)} ${k.libelle.toLowerCase()}`))
                + '.'
            );

            if (this.kpisDetails.length) {
                paragraphes.push(
                    'Dans le détail, on compte '
                    + this.enumerer(this.kpisDetails.map(d => `${this.nombreFr(d.valeur)} ${d.libelle.toLowerCase()}`))
                    + '.'
                );
            }
            sections.push({titre: 'Vue d\'ensemble', cle: null, paragraphes});
        }

        // ── Évolution ──
        if (this.evolution.length) {
            const total = this.evolution.reduce((somme, e) => somme + (e.value || 0), 0);
            const actifs = this.evolution.filter(e => e.value > 0);
            const pic = [...this.evolution].sort((a, b) => b.value - a.value)[0];
            const vides = this.evolution.filter(e => !e.value).map(e => e.label);

            const paragraphes: string[] = [];
            paragraphes.push(
                `L'activité de la période totalise ${this.quantite(total, 'document')}, `
                + `répartis sur ${this.quantite(actifs.length, 'période', 'périodes')} d'enregistrement.`
            );
            if (pic && pic.value > 0) {
                paragraphes.push(
                    `Le volume le plus élevé est atteint en ${pic.label}, avec ${this.quantite(pic.value, 'document')}`
                    + (total ? `, soit ${this.pourcentFr((pic.value / total) * 100)} du total de la période.` : '.')
                );
            }
            if (vides.length) {
                paragraphes.push(
                    vides.length === 1
                        ? `Aucun document n'a été enregistré en ${vides[0]}.`
                        : `Aucun document n'a été enregistré sur ${this.quantite(vides.length, 'période', 'périodes')} : `
                          + `${vides.join(', ')}.`
                );
            }
            sections.push({titre: 'Évolution des documents', cle: 'evolution', paragraphes});
        }

        // ── Un paragraphe par bloc (typologie, services, directions…) ──
        for (const groupe of this.groupes) {
            if (!groupe.items?.length) continue;

            const items = [...groupe.items].sort((a, b) => b.value - a.value);
            const tete = items.slice(0, 5);
            const reste = items.slice(5);
            const paragraphes: string[] = [];

            paragraphes.push(
                `${this.quantite(groupe.total, 'document')} se répartissent sur `
                + `${this.quantite(items.length, 'entrée', 'entrées')}.`
            );

            const premier = tete[0];
            const suite = tete.slice(1);
            let phrase = `${premier.label} arrive en tête avec ${this.quantite(premier.value, 'document')}`
                + `, soit ${this.pourcentFr(premier.pct)} du total`;
            if (suite.length) {
                phrase += ', devant '
                    + this.enumerer(suite.map(i =>
                        `${i.label} (${this.quantite(i.value, 'document')}, ${this.pourcentFr(i.pct)})`));
            }
            paragraphes.push(phrase + '.');

            if (reste.length) {
                const cumul = reste.reduce((somme, i) => somme + (i.value || 0), 0);
                paragraphes.push(
                    `${this.quantite(reste.length, 'autre entrée', 'autres entrées')} `
                    + `${reste.length > 1 ? 'totalisent' : 'totalise'} ${this.quantite(cumul, 'document')}.`
                );
            }

            sections.push({titre: groupe.titre, cle: groupe.cle, paragraphes});
        }

        return sections;
    }

    /** Word : document HTML balisé Office, ouvert nativement par Word. */
    private exporterWord(): void {
        const echapper = (v: string) => String(v ?? '')
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        const sections = this.sectionsExport().map(section => `
            <h2 style="font-size:13pt;color:#00366E;margin:18pt 0 6pt">${echapper(section.titre)}</h2>
            <table border="1" cellspacing="0" cellpadding="5"
                   style="border-collapse:collapse;width:100%;font-size:10pt">
                <thead>
                    <tr style="background:#00366E;color:#FFFFFF">
                        ${section.entetes.map(e => `<th align="left">${echapper(e)}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${section.lignes.map(ligne => `<tr>${
                        ligne.map((c, i) => `<td${i ? ' align="right"' : ''}>${echapper(c)}</td>`).join('')
                    }</tr>`).join('')}
                </tbody>
            </table>`).join('');

        const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="utf-8">
    <title>Tableau de bord des documents</title>
    <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]-->
</head>
<body style="font-family:Calibri,Arial,sans-serif;color:#0F172A">
    <h1 style="font-size:16pt;color:#00366E;margin:0 0 4pt">TABLEAU DE BORD DES DOCUMENTS</h1>
    <p style="font-size:10pt;color:#64748B;margin:0">
        Période : ${echapper(this.libellePeriode)}<br>
        Édité le ${moment().format('DD/MM/YYYY [à] HH:mm')}
    </p>
    ${sections}
</body>
</html>`;

        const blob = new Blob(['﻿', html], {type: 'application/msword'});
        const lien = document.createElement('a');
        lien.href = URL.createObjectURL(blob);
        lien.download = this.nomFichierExport('doc');
        lien.click();
        setTimeout(() => URL.revokeObjectURL(lien.href), 1000);
    }

    trackByCle = (_: number, element: { cle: string }) => element.cle;
    trackByLabel = (_: number, element: { label: string }) => element.label;
}
