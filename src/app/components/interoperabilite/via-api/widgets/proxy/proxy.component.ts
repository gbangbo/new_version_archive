import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Select2Module} from 'ng-select2-component';
import {JsonEditorComponent} from '../../../shared/json-editor/json-editor.component';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {environment} from '../../../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-proxy',
    imports: [CommonModule, FormsModule, Select2Module, JsonEditorComponent],
    templateUrl: './proxy.component.html',
    styleUrl: './proxy.component.scss',
})
export class ProxyComponent implements OnInit {

    private users: any = [];

    // Clés API disponibles (pour uid_apikey)
    apiKeyOptions: { value: any; label: string }[] = [];

    methods = ['GET', 'POST'].map(m => ({value: m, label: m}));

    form = {
        uid_apikey: '' as any,
        header_name: 'X-API-KEY',
        url: '',
        method: 'GET',
        payload: '',
        target_headers: '',
    };

    // Validité JSON
    payloadValid = true;
    headersValid = true;

    // Exécution / réponse
    executing = false;
    execError = '';
    responseMessage = '';
    responseText = '';
    hasResponse = false;

    // Détail de la réponse
    statusCode: number | null = null;

    // Vue tabulaire (quand la charge utile est une liste d'objets plats)
    tableCols: string[] = [];
    tableRows: any[] = [];          // lignes brutes
    viewRows: any[] = [];           // lignes après filtre + tri
    viewMode: 'table' | 'json' = 'json';

    // Recherche libre sur toutes les colonnes
    tableSearch = '';

    // Pagination
    pagedRows: any[] = [];
    pageIndex = 1;
    pageSize = 10;
    pageSizes = [10, 25, 50, 100];
    totalPages = 1;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadApiKeys();
    }

    private loadApiKeys(): void {
        this.httService.getData(
            `${environment.api_url}api/:io-api-keys?uidapikey=&show_key=`,
            false, this.users?.access_token || ''
        ).toPromise().then((res: any) => {
            if (res.body.status || res.body.success) {
                this.apiKeyOptions = (res.body.data || []).map((k: any) => {
                    const uid = k?.uid || k?.uidapikey || '';
                    const header = k?.header_name || 'X-API-KEY';
                    return {value: uid, label: `${k?.name || 'Clé API'} <span class="pxopt-h">${header}</span>`};
                }).filter((o: any) => o.value);
            }
        }).catch(() => {
        });
    }

    private parseJson(raw: string): any {
        const t = (raw || '').trim();
        if (!t) return {};
        try {
            return JSON.parse(t);
        } catch {
            return null;
        }
    }

    execute(): void {
        this.execError = '';
        if (!this.form.url.trim()) {
            this.execError = 'Veuillez saisir l\'URL cible.';
            return;
        }
        const payload = this.parseJson(this.form.payload);
        if (payload === null) {
            this.execError = 'Le champ « Payload » doit être un JSON valide.';
            return;
        }
        const headers = this.parseJson(this.form.target_headers);
        if (headers === null) {
            this.execError = 'Le champ « En-têtes cibles » doit être un JSON valide.';
            return;
        }

        const uidApikey = this.form.uid_apikey || '';

        const body: any = {
            uid_apikey: uidApikey,
            header_name: (this.form.header_name || 'X-API-KEY').trim(),
            url: this.form.url.trim(),
            method: this.form.method || 'GET',
            payload,
            target_headers: headers,
        };

        // L'authentification de cet endpoint se fait par l'en-tête X-API-KEY
        // (l'uid de la clé) : le parseur relaie désormais cet en-tête au backend.
        const apiHeaders: { [key: string]: string } = {};
        if (uidApikey) apiHeaders['X-API-KEY'] = uidApikey;

        this.executing = true;
        this.resetResponse();
        this.httService.postData(`${environment.api_url}api/:io-external-request-proxy`, body, this.users?.access_token || '', apiHeaders)
            .toPromise()
            .then((res: any) => {
                this.executing = false;
                const b = res?.body || {};
                this.responseMessage = b?.message || '';
                if (b.status || b.success) {
                    this.readResponse(b);
                    this.toast.success(b.message || 'Requête envoyée.', 'Succès');
                } else {
                    this.execError = b.message || 'Échec de la requête.';
                }
            })
            .catch((err: any) => {
                this.executing = false;
                this.execError = err?.error?.err?.message || err?.error?.message || 'Une erreur est survenue.';
            });
    }

    private resetResponse(): void {
        this.hasResponse = false;
        this.responseText = '';
        this.responseMessage = '';
        this.statusCode = null;
        this.tableCols = [];
        this.tableRows = [];
        this.viewRows = [];
        this.pagedRows = [];
        this.tableSearch = '';
        this.pageIndex = 1;
        this.totalPages = 1;
        this.viewMode = 'json';
    }

    /**
     * Extrait la charge utile réelle. L'API encapsule la réponse cible :
     * { success, message, response: { status_code, data, headers } }
     */
    private readResponse(b: any): void {
        const resp = b?.response || {};
        this.statusCode = resp?.status_code ?? null;

        const payload = resp?.data !== undefined ? resp.data : b?.data;
        this.responseText = this.pretty(payload);
        this.hasResponse = true;

        this.buildTable(payload);
    }

    /** Si la charge utile est une liste d'objets plats, on la présente en tableau. */
    private buildTable(payload: any): void {
        let rows: any[] | null = null;
        if (Array.isArray(payload)) rows = payload;
        else if (Array.isArray(payload?.data)) rows = payload.data;
        else if (Array.isArray(payload?.results)) rows = payload.results;
        else if (payload && typeof payload === 'object') rows = [payload];

        if (!rows?.length) return;

        const isFlatObject = (r: any) => r && typeof r === 'object' && !Array.isArray(r);
        if (!rows.every(isFlatObject)) return;

        const cols: string[] = [];
        rows.forEach(r => Object.keys(r).forEach(k => {
            const v = r[k];
            if ((v === null || typeof v !== 'object') && !cols.includes(k)) cols.push(k);
        }));

        if (cols.length) {
            this.tableCols = cols;
            this.tableRows = rows;
            this.viewMode = 'table';
            this.applyTableView();
        }
    }

    // ── Recherche libre + pagination ──────────────────────────────────
    applyTableView(): void {
        const q = (this.tableSearch || '').trim().toLowerCase();

        // La recherche porte sur toutes les colonnes à la fois
        const rows = q
            ? this.tableRows.filter(r =>
                this.tableCols.some(c => this.cellValue(r, c).toLowerCase().includes(q)))
            : [...this.tableRows];

        this.viewRows = rows;
        this.totalPages = Math.max(1, Math.ceil(this.viewRows.length / this.pageSize));
        if (this.pageIndex > this.totalPages) this.pageIndex = 1;
        this.applyPage();
    }

    private applyPage(): void {
        const start = (this.pageIndex - 1) * this.pageSize;
        this.pagedRows = this.viewRows.slice(start, start + this.pageSize);
    }

    goToPage(page: number): void {
        if (page < 1 || page > this.totalPages) return;
        this.pageIndex = page;
        this.applyPage();
    }

    onPageSizeChange(size: any): void {
        this.pageSize = Number(size) || 10;
        this.pageIndex = 1;
        this.applyTableView();
    }

    get rangeStart(): number {
        return this.viewRows.length ? (this.pageIndex - 1) * this.pageSize + 1 : 0;
    }

    get rangeEnd(): number {
        return Math.min(this.pageIndex * this.pageSize, this.viewRows.length);
    }

    /** Exporte les lignes visibles (résultat de la recherche) en CSV. */
    exportCsv(): void {
        if (!this.viewRows.length) return;
        const esc = (v: any) => `"${String(v).replace(/"/g, '""')}"`;
        const lines = [this.tableCols.map(c => esc(this.colLabel(c))).join(';')];
        this.viewRows.forEach(r => lines.push(this.tableCols.map(c => esc(this.cellValue(r, c))).join(';')));

        // BOM UTF-8 pour qu'Excel affiche correctement les accents
        const blob = new Blob(['﻿' + lines.join('\r\n')], {type: 'text/csv;charset=utf-8;'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        // \D plutot qu'une classe de caracteres entre crochets : Tailwind scanne
        // les .ts et prend "crochet + deux-points" pour une propriete arbitraire,
        // ce qui genere du CSS invalide dans styles.css
        const stamp = new Date().toISOString().slice(0, 19).replace(/\D/g, '');
        a.href = url;
        a.download = `reponse_api_${stamp}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /** « nomprenom » → « Nomprenom », « date_debut » → « Date debut ». */
    colLabel(col: string): string {
        const s = (col || '').replace(/[_-]+/g, ' ').trim();
        return s ? s.charAt(0).toUpperCase() + s.slice(1) : col;
    }

    cellValue(row: any, col: string): string {
        const v = row?.[col];
        if (v === null || v === undefined || v === '') return '—';
        if (typeof v === 'boolean') return v ? 'Oui' : 'Non';
        return String(v);
    }

    get statusOk(): boolean {
        return this.statusCode !== null && this.statusCode >= 200 && this.statusCode < 300;
    }

    private pretty(data: any): string {
        if (data === null || data === undefined) return '';
        if (typeof data === 'string') {
            try {
                return JSON.stringify(JSON.parse(data), null, 2);
            } catch {
                return data;
            }
        }
        try {
            return JSON.stringify(data, null, 2);
        } catch {
            return String(data);
        }
    }

    copyResponse(): void {
        if (!this.responseText) return;
        navigator.clipboard?.writeText(this.responseText).then(
            () => this.toast.success('Réponse copiée.', 'Succès'),
            () => this.toast.error('Copie impossible.', 'Erreur'),
        );
    }
}
