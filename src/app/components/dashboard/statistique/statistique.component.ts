import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgApexchartsModule} from 'ng-apexcharts';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {ToastrService} from 'ngx-toastr';
import moment from 'moment';

import {CardComponent} from '../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../shared/components/ui/feather-icon/feather-icon.component';
import {HttpService} from '../../../core/http.service';
import {Authorization} from '../../../protect/authorization.service';
import {environment} from '../../../../environments/environment';

/** Une ligne de statistique normalisée (typologie, service, direction, …). */
export interface StatItem {
    id: string;
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
    typeChart: 'donut' | 'bar';
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

/** Blocs attendus, dans l'ordre d'affichage. Le motif est testé sur le chemin JSON. */
const BLOCS: { cle: string; motif: RegExp; titre: string; icone: string; couleur: string; detail: string | null }[] = [
    {cle: 'typologie', motif: /typolog|type.?doc|categorie/i, titre: 'Répartition par typologie', icone: 'layers', couleur: '#4F46E5', detail: null},
    {cle: 'service', motif: /service/i, titre: 'Documents par service', icone: 'users', couleur: '#0EA5E9', detail: 'service'},
    {cle: 'direction', motif: /direction/i, titre: 'Documents par direction', icone: 'git-branch', couleur: '#16A34A', detail: 'direction'},
    {cle: 'departement', motif: /departement|département/i, titre: 'Documents par département', icone: 'grid', couleur: '#F59E0B', detail: 'departement'},
    {cle: 'consultation', motif: /consult/i, titre: 'Consultations', icone: 'eye', couleur: '#DB2777', detail: null},
    {cle: 'agent', motif: /agent|utilisateur|personnel|user/i, titre: 'Documents par agent', icone: 'user-check', couleur: '#7C3AED', detail: null},
];

/** Bloc chronologique : rendu en courbe plutôt qu'en barres. */
const MOTIF_EVOLUTION = /mois|mensuel|month|evolution|periode|serie|timeline|jour/i;

const PALETTE = [
    '#4F46E5', '#0EA5E9', '#16A34A', '#F59E0B', '#DB2777', '#7C3AED',
    '#0891B2', '#65A30D', '#EA580C', '#BE123C', '#2563EB', '#059669',
];

const MOIS_COURTS = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

@Component({
    selector: 'app-statistique',
    imports: [CommonModule, FormsModule, NgApexchartsModule, NzSelectModule,
        NzDatePickerModule, NzTooltipDirective, CardComponent, FeatherIconComponent],
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
    groupes: StatGroupe[] = [];
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
                this.groupes = [];
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

    get libellePeriode(): string {
        if (this.dateStart && this.dateEnd) {
            return `du ${moment(this.dateStart).format('DD/MM/YYYY')} au ${moment(this.dateEnd).format('DD/MM/YYYY')}`;
        }
        return `année ${this.annee}`;
    }

    get aucuneDonnee(): boolean {
        return !this.isloading && !this.enErreur && !this.groupes.length && !this.evolution.length && !this.kpis.length;
    }

    // ═══════════════════════════════════════════════════════════
    //  Normalisation de la réponse
    // ═══════════════════════════════════════════════════════════
    private exploiter(body: any): void {
        const racine = this.racineUtile(body);
        const collections = this.collecter(racine);

        this.groupes = [];
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

            const typeChart: 'donut' | 'bar' = (bloc.cle === 'typologie' || bloc.cle === 'consultation') ? 'donut' : 'bar';
            const groupe: StatGroupe = {
                ...bloc,
                items,
                total,
                top: items.slice(0, 5),
                reste: Math.max(0, items.length - 5),
                typeChart,
                chart: null,
            };
            groupe.chart = typeChart === 'donut' ? this.anneau(groupe) : this.barres(groupe);
            this.groupes.push(groupe);
        }

        // Série chronologique
        const serie = this.chercherCollection(collections, MOTIF_EVOLUTION, cheminsUtilises);
        this.evolution = serie ? this.normaliserItems(serie.valeur) : [];
        this.evolutionChart = this.evolution.length ? this.courbe(this.evolution) : null;

        // Tuiles chiffrées
        this.kpis = this.construireKpis(racine);
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
                .map(cle => ({id: '', label: this.joliLibelle(cle), value: Number(source[cle]) || 0, pct: 0, raw: null}))
                .filter(i => i.label !== '');
        }
        return source.map((ligne: any) => {
            if (ligne === null || typeof ligne !== 'object') {
                return {id: '', label: String(ligne ?? ''), value: 0, pct: 0, raw: ligne};
            }
            return {
                id: String(ligne.uid ?? ligne.id ?? ligne.pk ?? ''),
                label: this.extraireLibelle(ligne),
                value: this.extraireValeur(ligne),
                pct: 0,
                raw: ligne,
            };
        }).filter(i => i.label !== '');
    }

    private extraireLibelle(ligne: any): string {
        for (const cle of CLES_LIBELLE) {
            const v = ligne[cle];
            if (typeof v === 'string' && v.trim()) return v.trim();
            if (typeof v === 'number') return this.libelleMois(cle, v);
        }
        // Repli : première propriété textuelle qui n'est pas un identifiant
        for (const cle of Object.keys(ligne)) {
            if (/^(id|uid|pk)$|_id$/i.test(cle)) continue;
            const v = ligne[cle];
            if (typeof v === 'string' && v.trim()) return v.trim();
        }
        return '';
    }

    private libelleMois(cle: string, valeur: number): string {
        if (/mois|month/i.test(cle) && valeur >= 1 && valeur <= 12) return MOIS_COURTS[valeur - 1];
        return String(valeur);
    }

    private extraireValeur(ligne: any): number {
        for (const cle of CLES_VALEUR) {
            const v = ligne[cle];
            if (typeof v === 'number') return v;
            if (typeof v === 'string' && v !== '' && !isNaN(Number(v))) return Number(v);
        }
        for (const cle of Object.keys(ligne)) {
            if (/^(id|uid|pk|annee|year|mois|month)$/i.test(cle)) continue;
            if (typeof ligne[cle] === 'number') return ligne[cle];
        }
        return 0;
    }

    /** Tuiles : d'abord les compteurs scalaires de la réponse, sinon les totaux par bloc. */
    private construireKpis(racine: any): Kpi[] {
        const icones = ['file-text', 'layers', 'users', 'eye', 'git-branch', 'grid'];
        const couleurs = ['#4F46E5', '#0EA5E9', '#16A34A', '#DB2777', '#F59E0B', '#7C3AED'];
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

    private barres(groupe: StatGroupe): any {
        const items = groupe.items.slice(0, 10);
        return {
            series: [{name: 'Documents', data: items.map(i => i.value)}],
            chart: {
                type: 'bar',
                height: Math.max(260, items.length * 38),
                toolbar: {show: false},
                fontFamily: 'inherit',
            },
            plotOptions: {bar: {horizontal: true, borderRadius: 6, barHeight: '58%'}},
            dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {fontSize: '11px', fontWeight: 600, colors: ['#ffffff']},
            },
            xaxis: {
                categories: items.map(i => i.label),
                labels: {style: {fontSize: '11px', colors: '#64748B'}},
            },
            yaxis: {labels: {style: {fontSize: '11px', colors: '#64748B'}, maxWidth: 190}},
            grid: {borderColor: '#EEF2F7', strokeDashArray: 4},
            colors: [groupe.couleur],
            tooltip: {y: {formatter: (v: number) => `${v} document(s)`}},
            noData: {text: 'Aucune donnée'},
        };
    }

    private courbe(items: StatItem[]): any {
        return {
            series: [{name: 'Documents', data: items.map(i => i.value)}],
            chart: {type: 'area', height: 300, toolbar: {show: false}, fontFamily: 'inherit'},
            stroke: {curve: 'smooth', width: 3},
            dataLabels: {enabled: false},
            fill: {
                type: 'gradient',
                gradient: {shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 95]},
            },
            xaxis: {
                categories: items.map(i => i.label),
                labels: {style: {fontSize: '11px', colors: '#64748B'}},
            },
            yaxis: {labels: {style: {fontSize: '11px', colors: '#64748B'}}},
            grid: {borderColor: '#EEF2F7', strokeDashArray: 4},
            colors: ['#4F46E5'],
            markers: {size: 4, strokeWidth: 2, hover: {size: 6}},
            tooltip: {y: {formatter: (v: number) => `${v} document(s)`}},
        };
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
    //  Export xlsx / doc / pdf
    // ═══════════════════════════════════════════════════════════
    exporter(format: 'xlsx' | 'doc' | 'pdf'): void {
        if (this.exportEnCours) return;
        this.exportEnCours = format;
        const url = this.construireUrl({export: format});

        this.httService.http.get(url, {
            headers: {Authorization: 'Bearer ' + (this.users?.access_token || '')},
            responseType: 'blob',
            observe: 'response',
        }).subscribe({
            next: (res: any) => {
                this.exportEnCours = null;
                const blob = res.body as Blob;
                if (!blob || !blob.size) {
                    this.toast.error("L'export est vide.", 'Tableau de bord');
                    return;
                }
                const suffixe = this.dateStart && this.dateEnd
                    ? `${this.dateStart}_${this.dateEnd}`
                    : `${this.annee}`;
                const lien = document.createElement('a');
                lien.href = URL.createObjectURL(blob);
                lien.download = `tableau-de-bord-documents_${suffixe}.${format}`;
                lien.click();
                URL.revokeObjectURL(lien.href);
            },
            error: () => {
                this.exportEnCours = null;
                this.toast.error("L'export a échoué.", 'Tableau de bord');
            },
        });
    }

    trackByCle = (_: number, element: { cle: string }) => element.cle;
    trackByLabel = (_: number, element: { label: string }) => element.label;
}
