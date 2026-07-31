import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {environment} from '../../../../environments/environment';
import moment from "moment";
import {cryptSession, decode64} from "../../../config/config";
import {DocActionMenuComponent} from "../../../shared/components/ui/doc-action-menu/doc-action-menu.component";

const SEARCH_STORAGE_KEY = 'trouver_document_last_search';

@Component({
    selector: 'app-trouver-un-doucment',
    imports: [CommonModule, RouterModule,
        FormsModule, NzSelectModule,
        NzDatePickerModule, NzTagModule,
        NzIconModule, DocActionMenuComponent],
    templateUrl: './trouver-un-doucment.component.html',
    styleUrl: './trouver-un-doucment.component.scss',
})
export class TrouverUnDoucmentComponent implements OnInit, OnDestroy {

    users: any = {};

    sidebarOpen: boolean = false;

    // Mode actif : 'fulltext' | 'advanced' | null
    activeMode: 'fulltext' | 'advanced' | null = null;

    // ── Recherche plein texte ─────────────────────────────
    fulltextQuery: string = '';

    // ── Recherche vocale ──────────────────────────────────
    voiceSupported: boolean = false;
    isListening: boolean = false;
    private recognition: any = null;

    // ── Recherche spécifique ──────────────────────────────
    advSearch: {
        reference: string;
        idtype_document: string;
        niveau: number | null;
        idservice: string;
        date_doc: Date | null;
        date_debut: Date | null;
        date_fin: Date | null;
        idsite: string;
        idrayon: string;
        idboite: string;
        idpriorite: string;
    } = {
        reference: '',
        idtype_document: '',
        niveau: null,
        idservice: '',
        date_doc: null,
        date_debut: null,
        date_fin: null,
        idsite: '',
        idrayon: '',
        idboite: '',
        idpriorite: '',
    };

    // ── État ──────────────────────────────────────────────
    isSearching: boolean = false;
    hasSearched: boolean = false;
    results: any[] = [];
    totalResults: number = 0;

    // ── Données des filtres ───────────────────────────────
    dataTypeDocument: any[] = [];
    dataPriorite: any[] = [];
    dataSites: any[] = [];
    dataRayons: any[] = [];
    dataBoites: any[] = [];
    loadingRayons: boolean = false;
    loadingBoites: boolean = false;

    // ── Organigramme hiérarchique (critère 2 : service par niveau) ──
    dataNiveaux = [
        {value: 0, label: 'Direction'},
        {value: 1, label: 'Sous-direction'},
        {value: 2, label: 'Service'},
    ];
    dataOrganigramme: any[] = [];
    loadingOrganigramme: boolean = false;
    dataCritere = [
        {
            index: 1,
            libelle: 'Selon numéro du document',
        },
        {
            index: 2,
            libelle: 'Selon le type du document et service',
        },
        {
            index: 3,
            libelle: 'Selon la date du document',
        },
        {
            index: 5,
            libelle: 'Selon type sur une période',
        },
        {
            index: 7,
            libelle: 'Selon les dates d\'enregistrement',
        },
        {
            index: 8,
            libelle: 'Selon les rayons, boîtes d\'archives',
        }
    ];
    idCritere: number = 1;

    constructor(private autor: Authorization, private httService: HttpService, private router: Router) {
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.loadDropdowns();
        this.voiceSupported = !!(
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        );
        this.restoreAndRerunSearch();
    }

    ngOnDestroy(): void {
        this.recognition?.abort();
    }

    loadDropdowns(): void {
        const id = this.users?.datasociete?.uid || '';
        const token = this.users?.access_token || '';

        this.httService
            .getData(`${environment.api_url}api/:savetypedocuments?idsociete=${id}`, false, token)
            .toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) this.dataTypeDocument = res.body.data || [];
            }).catch(() => {
        });

        this.httService
            .getData(`${environment.api_url}api/:savepriorite?idsociete=${id}&idpriorites=`, false, token)
            .toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) this.dataPriorite = res.body.data || [];
            }).catch(() => {
        });

        this.httService
            .getData(`${environment.api_url}api/:savesites?idsociete=${id}&idsite=`, false, token)
            .toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) {
                    this.dataSites = (res.body.data || []).map((e: any) => ({label: e.libelle_sites, value: e.uid}));
                }
            }).catch(() => {
        });
    }

    // ── Cascade site → rayon → boîte (critère 8) ──────────
    onSiteChange(idsite: string): void {
        this.advSearch.idrayon = '';
        this.advSearch.idboite = '';
        this.dataRayons = [];
        this.dataBoites = [];
        if (!idsite) return;

        const id = this.users?.datasociete?.uid || '';
        const token = this.users?.access_token || '';
        this.loadingRayons = true;
        this.httService
            .getData(`${environment.api_url}api/:saverayons?idsociete=${id}&idrayon=&idsite=${idsite}`, false, token)
            .toPromise()
            .then((res: any) => {
                this.loadingRayons = false;
                if (res?.body?.status || res?.body?.success) {
                    this.dataRayons = (res.body.data || []).map((e: any) => ({label: e.libelle_rayon, value: e.uid}));
                }
            }).catch(() => {
            this.loadingRayons = false;
        });
    }

    onRayonChange(idrayon: string): void {
        this.advSearch.idboite = '';
        this.dataBoites = [];
        if (!idrayon) return;

        const id = this.users?.datasociete?.uid || '';
        const token = this.users?.access_token || '';
        this.loadingBoites = true;
        this.httService
            .getData(`${environment.api_url}api/:saveboites?idsociete=${id}&idrayon=${idrayon}&idsite=`, false, token)
            .toPromise()
            .then((res: any) => {
                this.loadingBoites = false;
                if (res?.body?.status || res?.body?.success) {
                    this.dataBoites = (res.body.data || []).map((e: any) => ({label: e.code_boites, value: e.uid}));
                }
            }).catch(() => {
            this.loadingBoites = false;
        });
    }

    // ── Niveau → entités de l'organigramme (critère 2) ────
    onNiveauChange(niveau: number | null): void {
        this.advSearch.idservice = '';
        this.dataOrganigramme = [];
        if (niveau === null || niveau === undefined) return;
        this.loadOrganigramme(niveau);
    }

    private loadOrganigramme(niveau: number): void {
        const id = this.users?.datasociete?.uid || '';
        const token = this.users?.access_token || '';
        this.loadingOrganigramme = true;
        this.httService
            .getData(`${environment.api_url}auth/:organigramme-responsable-service?idsociete=${id}&idservices=&niveau=${niveau}`, false, token)
            .toPromise()
            .then((res: any) => {
                this.loadingOrganigramme = false;
                if (res?.body?.status || res?.body?.success) {
                    this.dataOrganigramme = (res.body.data || []).map((e: any) => ({
                        label: e?.sigle ? `${e.sigle} — ${e.libelle}` : e?.libelle,
                        value: e?.uid,
                    })).filter((o: any) => o.value && o.label);
                }
            }).catch(() => {
            this.loadingOrganigramme = false;
        });
    }

    // ── Lancement recherche plein texte ───────────────────
    onFulltextSearch(): void {
        if (!this.fulltextQuery.trim()) return;
        this.activeMode = 'fulltext';
        this.runSearch();
    }

    // ── Lancement recherche spécifique ────────────────────
    onAdvancedSearch(): void {
        this.activeMode = 'advanced';
        this.runSearch();
    }

    private saveSearch(): void {
        sessionStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify({
            activeMode: this.activeMode,
            fulltextQuery: this.fulltextQuery,
            idCritere: this.idCritere,
            advSearch: this.advSearch,
        }));
    }

    private restoreAndRerunSearch(): void {
        const raw = sessionStorage.getItem(SEARCH_STORAGE_KEY);
        if (!raw) return;
        try {
            const saved = JSON.parse(raw);
            this.activeMode = saved.activeMode ?? null;
            this.fulltextQuery = saved.fulltextQuery ?? '';
            if (saved.advSearch) {
                this.advSearch = {
                    ...this.advSearch,
                    ...saved.advSearch,
                    date_doc: saved.advSearch.date_doc ? new Date(saved.advSearch.date_doc) : null,
                    date_debut: saved.advSearch.date_debut ? new Date(saved.advSearch.date_debut) : null,
                    date_fin: saved.advSearch.date_fin ? new Date(saved.advSearch.date_fin) : null,
                };
                // Recharge la liste des entités si un niveau était sélectionné
                if (this.advSearch.niveau !== null && this.advSearch.niveau !== undefined) {
                    this.loadOrganigramme(this.advSearch.niveau);
                }
            }
            if (typeof saved.idCritere === 'number') this.idCritere = saved.idCritere;
            if (this.activeMode) {
                this.runSearch();
            }
        } catch {
            sessionStorage.removeItem(SEARCH_STORAGE_KEY);
        }
    }

    // ── Rechargement après suppression d'un document ──────────
    onDocDeleted(): void {
        if (this.activeMode) this.runSearch();
    }

    private runSearch(): void {
        const id = this.users?.datasociete?.uid || '';
        const token = this.users?.access_token || '';
        this.isSearching = true;
        this.hasSearched = false;
        this.results = [];

        let url: string;
        if (this.activeMode === 'fulltext') {
            url = `${environment.api_url}api/:recherchedocuments?idsociete=${id}&data_docs=${encodeURIComponent(this.fulltextQuery)}`;
        } else {
            url = `${environment.api_url}api/:savedocuments?${this.buildAdvancedParams(id)}`;
        }

        this.httService
            .getData(url, false, token)
            .toPromise()
            .then((res: any) => {
                this.isSearching = false;
                this.hasSearched = true;
                console.log("document trouve ====", res.body.data)
                if (res?.body?.status || res?.body?.success) {
                    this.results = res.body.data.map((e: any) => ({
                        ...e,
                        libelle_type_docs: `${e?.datatype_document ? e?.datatype_document[0]?.libelle_type_docs : ''}`,
                        code_boites: `${e?.databoites?.code_boites}`,
                        libelle_service: e?.dataservice?.libelle || '',
                        date_docs: moment(e?.date_docs).format('DD/MM/YYYY')
                    }));
                } else {
                    this.results = [];
                }
                this.totalResults = this.results.length;
                if (this.totalResults > 0) {
                    this.saveSearch();
                }
            })
            .catch(() => {
                this.isSearching = false;
                this.hasSearched = true;
                this.results = [];
                this.totalResults = 0;
            });
    }

    /* Construit les paramètres de api/:savedocuments selon le critère choisi.
       Seuls les paramètres pertinents au critère sont renseignés ; les autres
       restent vides (ignorés côté API). */
    private buildAdvancedParams(idsociete: string): string {
        const p: Record<string, string> = {
            idsociete: idsociete,
            iduser_save: '',
            iddocuments: '',
            idsites: '',
            idrayons: '',
            idboites: '',
            idtype_documents: '',
            idservices: '',
            code_docs: '',
            lib_docs: '',
            date_docs: '',
            date_sig: '',
            date_debut_docs: '',
            date_fin_docs: '',
            date_debut_sig: '',
            date_fin_sig: '',
        };

        const d = this.advSearch;
        switch (this.idCritere) {
            case 1: // Selon numéro du document
                p['code_docs'] = (d.reference || '').trim();
                break;
            case 2: // Selon le type du document et service
                p['idtype_documents'] = d.idtype_document || '';
                p['idservices'] = d.idservice || '';
                break;
            case 3: // Selon la date du document
                p['date_docs'] = d.date_doc ? this.fmtDate(d.date_doc) : '';
                break;
            case 5: // Selon type sur une période (date du document)
                p['idtype_documents'] = d.idtype_document || '';
                p['date_debut_docs'] = d.date_debut ? this.fmtDate(d.date_debut) : '';
                p['date_fin_docs'] = d.date_fin ? this.fmtDate(d.date_fin) : '';
                break;
            case 7: // Selon les dates d'enregistrement
                p['date_debut_sig'] = d.date_debut ? this.fmtDate(d.date_debut) : '';
                p['date_fin_sig'] = d.date_fin ? this.fmtDate(d.date_fin) : '';
                break;
            case 8: // Selon les rayons, boîtes d'archives
                p['idsites'] = d.idsite || '';
                p['idrayons'] = d.idrayon || '';
                p['idboites'] = d.idboite || '';
                break;
        }

        return Object.entries(p)
            .map(([k, v]) => `${k}=${encodeURIComponent(v ?? '')}`)
            .join('&');
    }

    resetAdvanced(): void {
        this.advSearch = {
            reference: '',
            idtype_document: '',
            niveau: null,
            idservice: '',
            date_doc: null,
            date_debut: null,
            date_fin: null,
            idsite: '',
            idrayon: '',
            idboite: '',
            idpriorite: '',
        };
        this.dataRayons = [];
        this.dataBoites = [];
        this.dataOrganigramme = [];
        this.results = [];
        this.hasSearched = false;
        this.totalResults = 0;
        sessionStorage.removeItem(SEARCH_STORAGE_KEY);
    }

    clearFulltext(): void {
        this.fulltextQuery = '';
        this.recognition?.abort();
        this.isListening = false;
        this.results = [];
        this.hasSearched = false;
        this.totalResults = 0;
        sessionStorage.removeItem(SEARCH_STORAGE_KEY);
    }

    startVoiceSearch(): void {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        // Arrêter si déjà en écoute
        if (this.isListening) {
            this.recognition?.abort();
            this.isListening = false;
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'fr-FR';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onstart = () => {
            this.isListening = true;
        };

        this.recognition.onresult = (event: any) => {
            const transcript: string = event.results[0][0].transcript;
            this.fulltextQuery = transcript;
            this.isListening = false;
            this.onFulltextSearch();
        };

        this.recognition.onerror = () => {
            this.isListening = false;
        };

        this.recognition.onend = () => {
            this.isListening = false;
        };

        this.recognition.start();
    }

    private fmtDate(d: Date): string {
        return d.toISOString().slice(0, 10);
    }

    // ── Helpers icônes ────────────────────────────────────
    getFileIcon(ext: string): string {
        const e = (ext || '').toLowerCase();
        if (e === 'pdf') return 'file-pdf';
        if (['jpg', 'jpeg', 'png', 'PNG', 'JPG'].includes(e)) return 'file-image';
        if (['doc', 'docx'].includes(e)) return 'file-word';
        if (['xls', 'xlsx'].includes(e)) return 'file-excel';
        return 'file';
    }

    getFileIconColor(ext: string): string {
        const e = (ext || '').toLowerCase();
        if (e === 'pdf') return '#ff4d4f';
        if (['jpg', 'jpeg', 'png'].includes(e)) return '#52c41a';
        if (['doc', 'docx'].includes(e)) return '#1890ff';
        if (['xls', 'xlsx'].includes(e)) return '#52c41a';
        return '#8c8c8c';
    }

    getTypeBadgeColor(index: number): string {
        const colors = ['blue', 'purple', 'cyan', 'geekblue', 'volcano', 'orange'];
        return colors[index % colors.length];
    }

    navToview(doc: any) {
        const mapSessionTemp = cryptSession(JSON.stringify(doc), decode64(environment.CONFIG.APP_PASS));
        localStorage.setItem(`_eye_`, mapSessionTemp);
        this.router.navigate(['/recherche/previsualisation'])
    }

}
