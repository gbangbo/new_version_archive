import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {environment} from '../../../../environments/environment';
import moment from "moment";

const SEARCH_STORAGE_KEY = 'trouver_document_last_search';

@Component({
    selector: 'app-trouver-un-doucment',
    imports: [CommonModule, RouterModule, FormsModule, NzSelectModule, NzDatePickerModule, NzTagModule, NzIconModule],
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
        idservice: string;
        date_debut: Date | null;
        date_fin: Date | null;
        idpriorite: string;
    } = {
        reference: '',
        idtype_document: '',
        idservice: '',
        date_debut: null,
        date_fin: null,
        idpriorite: '',
    };

    // ── État ──────────────────────────────────────────────
    isSearching: boolean = false;
    hasSearched: boolean = false;
    results: any[] = [];
    totalResults: number = 0;

    // ── Données des filtres ───────────────────────────────
    dataTypeDocument: any[] = [];
    dataService: any[] = [];
    dataPriorite: any[] = [];

    constructor(private autor: Authorization, private httService: HttpService) {
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
            .getData(`${environment.api_url}auth/:saveservice?idsociete=${id}&idservice=&iddepartement=`, false, token)
            .toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) this.dataService = res.body.data || [];
            }).catch(() => {
        });

        this.httService
            .getData(`${environment.api_url}api/:savepriorite?idsociete=${id}&idpriorites=`, false, token)
            .toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) this.dataPriorite = res.body.data || [];
            }).catch(() => {
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
                    ...saved.advSearch,
                    date_debut: saved.advSearch.date_debut ? new Date(saved.advSearch.date_debut) : null,
                    date_fin: saved.advSearch.date_fin ? new Date(saved.advSearch.date_fin) : null,
                };
            }
            if (this.activeMode) {
                this.runSearch();
            }
        } catch {
            sessionStorage.removeItem(SEARCH_STORAGE_KEY);
        }
    }

    private runSearch(): void {
        const id = this.users?.datasociete?.uid || '';
        const token = this.users?.access_token || '';
        this.isSearching = true;
        this.hasSearched = false;
        this.results = [];

        let params: string;
        if (this.activeMode === 'fulltext') {
            params = `idsociete=${id}&data_docs=${encodeURIComponent(this.fulltextQuery)}`;
        } else {
            params = [
                `idsociete=${id}`,
                `reference=${encodeURIComponent(this.advSearch.reference)}`,
                `idtype_document=${this.advSearch.idtype_document}`,
                `idservice=${this.advSearch.idservice}`,
                `date_debut=${this.advSearch.date_debut ? this.fmtDate(this.advSearch.date_debut) : ''}`,
                `date_fin=${this.advSearch.date_fin ? this.fmtDate(this.advSearch.date_fin) : ''}`,
                `idpriorite=${this.advSearch.idpriorite}`,
            ].join('&');
        }

        this.httService
            .getData(`${environment.api_url}api/:recherchedocuments?${params}`, false, token)
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

    resetAdvanced(): void {
        this.advSearch = {
            reference: '',
            idtype_document: '',
            idservice: '',
            date_debut: null,
            date_fin: null,
            idpriorite: '',
        };
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
}
