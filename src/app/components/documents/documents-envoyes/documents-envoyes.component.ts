import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import moment from "moment";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";

interface RowData {
    lib_document: string;
    code_document: string;
    date_document: string;
    email_received: string;
    destinataires: string[];
    message_send: string;
    nb_fichiers: number;
    protege: boolean;
    file_password: string;
    showPassword: boolean;
    date_envoi: string;
}

interface SentFile {
    uid: string;
    name: string;
    extension: string;
    url: string;
    password: string;
}

@Component({
    selector: 'app-documents-envoyes',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        FormsModule,
        FeatherIconComponent,
    ],
    templateUrl: './documents-envoyes.component.html',
    styleUrl: './documents-envoyes.component.scss',
})
export class DocumentsEnvoyesComponent implements OnInit {

    private users: any = [];
    isloading: boolean = false;
    searchValue = '';

    filteredData: RowData[] = [];
    private dataMails: any = [];

    // ── Consultation des fichiers envoyés ──────────────────────
    filesOpen: boolean = false;
    filesTitle: string = '';
    filesPassword: string = '';
    filesList: SentFile[] = [];

    // Aperçu (panneau glissant + déchiffrement pdfjs)
    previewingUid: string | null = null;
    previewOpen: boolean = false;
    previewFileItem: SentFile | null = null;
    previewLoading: boolean = false;
    previewError: string = '';
    previewImages: string[] = [];
    previewImageUrl: string = '';
    previewIsImage: boolean = false;
    currentPreviewPage: number = 1;
    previewZoom: number = 1;
    readonly minZoom: number = 0.5;
    readonly maxZoom: number = 3;
    readonly zoomStep: number = 0.25;

    // ── Tri ──────────────────────────────────────────────────
    sortFns = {
        lib_document: (a: RowData, b: RowData) =>
            (a.lib_document ?? '').localeCompare(b.lib_document ?? ''),
        email_received: (a: RowData, b: RowData) =>
            (a.email_received ?? '').localeCompare(b.email_received ?? ''),
        date_envoi: (a: RowData, b: RowData) =>
            (a.date_envoi ?? '').localeCompare(b.date_envoi ?? ''),
    };

    // ── Filtres ──────────────────────────────────────────────
    filters: {
        lib_document: { text: string; value: string }[];
        email_received: { text: string; value: string }[];
    } = {
        lib_document: [],
        email_received: [],
    };

    filterFns = {
        lib_document: (list: string[], item: RowData) =>
            list.some(val => (item.lib_document ?? '').toLowerCase().includes(val.toLowerCase())),
        email_received: (list: string[], item: RowData) =>
            list.some(val => (item.email_received ?? '').toLowerCase().includes(val.toLowerCase())),
    };

    constructor(private autor: Authorization, private httService: HttpService, private cdr: ChangeDetectorRef) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showSendMails(this.users?.datasociete?.uid, this.users?.uid);
    }

    // ── Recherche globale ─────────────────────────────────────
    onSearch(value: string): void {
        const val = value.trim().toLowerCase();
        this.filteredData = val
            ? this.dataMails.filter((row: any) =>
                Object.values(row).some(v => String(v).toLowerCase().includes(val)))
            : [...this.dataMails];
    }

    togglePassword(row: RowData): void {
        row.showPassword = !row.showPassword;
    }

    // ── Consultation des fichiers envoyés ──────────────────────
    openFiles(row: any): void {
        this.filesTitle = row?.lib_document || 'Fichiers envoyés';
        this.filesPassword = row?.file_password || '';
        this.filesList = (row?.pieces_docs || []).map((p: any) => {
            const url = p?.url_file_piece || p?.url_file || '';
            const ext = (this.getFileExtension(p?.lib_piece_docs || url) || '').toLowerCase();
            return {
                uid: p?.uid,
                name: p?.name_piece_docs || p?.lib_piece_docs || 'Fichier',
                extension: ext,
                url,
                password: p?.password_file || '',
            };
        });
        this.filesOpen = true;
        this.closePreview();
    }

    closeFiles(): void {
        this.filesOpen = false;
        this.closePreview();
        this.filesList = [];
    }

    getProxyUrl(url: string): string {
        return environment.production ? url : url.replace(`${environment.URL_API}`, '');
    }

    getFileExtension(url: string): string {
        if (!url) return '';
        const clean = url.split('?')[0].split('#')[0];
        return (clean.split('.').pop() || '').toLowerCase();
    }

    isImage(ext: string): boolean {
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes((ext || '').toLowerCase());
    }

    fileIcon(ext: string): string {
        const e = (ext || '').toLowerCase();
        if (e === 'pdf') return 'file-pdf';
        if (this.isImage(e)) return 'file-image';
        if (['doc', 'docx'].includes(e)) return 'file-word';
        if (['xls', 'xlsx'].includes(e)) return 'file-excel';
        if (['ppt', 'pptx'].includes(e)) return 'file-ppt';
        return 'file';
    }

    async previewFile(file: SentFile): Promise<void> {
        if (!file?.url || this.previewingUid) return;
        const url = this.getProxyUrl(file.url);
        const ext = (file.extension || this.getFileExtension(file.url)).toLowerCase();

        this.previewFileItem = file;
        this.previewOpen = true;
        this.previewError = '';
        this.previewImages = [];
        this.previewImageUrl = '';
        this.previewIsImage = false;
        this.currentPreviewPage = 1;
        this.previewZoom = 1;

        if (this.isImage(ext)) {
            this.previewIsImage = true;
            this.previewImageUrl = url;
            return;
        }
        if (ext === 'pdf') {
            await this.renderPdfPreview(file, url);
            return;
        }
        this.previewError = 'Ce type de fichier ne peut pas être prévisualisé ici.';
    }

    private async renderPdfPreview(file: SentFile, url: string): Promise<void> {
        this.previewingUid = file.uid;
        this.previewLoading = true;
        this.previewImages = [];
        try {
            const password = file.password || this.filesPassword || undefined;
            const pdf: any = await pdfjsLib.getDocument({url, password}).promise;
            for (let i = 1; i <= pdf.numPages; i++) {
                try {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({scale: 1.5});
                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    await page.render({canvasContext: canvas.getContext('2d')!, viewport}).promise;
                    this.previewImages = [...this.previewImages, canvas.toDataURL('image/png')];
                    if (i === 1) this.previewLoading = false;
                    this.cdr.detectChanges();
                } catch { /* page illisible : on continue */ }
            }
            if (!this.previewImages.length) {
                this.previewError = "Impossible d'ouvrir ce fichier pour la prévisualisation.";
            }
        } catch {
            this.previewError = "Impossible d'ouvrir ce fichier pour la prévisualisation.";
        } finally {
            this.previewLoading = false;
            this.previewingUid = null;
            this.cdr.detectChanges();
        }
    }

    closePreview(): void {
        this.previewOpen = false;
        this.previewFileItem = null;
        this.previewImages = [];
        this.previewImageUrl = '';
        this.previewIsImage = false;
        this.previewError = '';
        this.currentPreviewPage = 1;
        this.previewZoom = 1;
    }

    prevPage(): void {
        if (this.currentPreviewPage > 1) this.currentPreviewPage--;
    }

    nextPage(): void {
        if (this.currentPreviewPage < this.previewImages.length) this.currentPreviewPage++;
    }

    zoomIn(): void {
        this.previewZoom = Math.min(this.maxZoom, +(this.previewZoom + this.zoomStep).toFixed(2));
    }

    zoomOut(): void {
        this.previewZoom = Math.max(this.minZoom, +(this.previewZoom - this.zoomStep).toFixed(2));
    }

    resetZoom(): void {
        this.previewZoom = 1;
    }

    showSendMails(idsociete: string = '', iduser_save: string = '') {
        this.isloading = true;
        this.dataMails = [];
        this.filteredData = [];
        this.httService.getData(
            `${environment.api_url}api/:save-send-mails?idsociete=${idsociete}&iduser_save=${iduser_save}`,
            false,
            this.users?.access_token || ''
        )
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("save-send-mails ===", res.body);
                if (res.body.status || res.body.success) {

                    this.dataMails = (res.body.data || []).map((e: any) => {
                        const doc = e?.documents || {};
                        const emails = (e?.email_received || '')
                            .split(/[;,]/).map((s: string) => s.trim()).filter((s: string) => s);
                        const pieces = e?.pieces_docs || [];

                        return {
                            ...e,
                            lib_document: doc?.lib_docs || '—',
                            code_document: doc?.code_docs || '',
                            date_document: doc?.date_docs ? moment(doc.date_docs).format('DD/MM/YYYY') : '',
                            email_received: emails.join(', '),
                            destinataires: emails,
                            message_send: e?.message_send || '',
                            nb_fichiers: Array.isArray(pieces) ? pieces.length : 0,
                            protege: !!(e?.pwd_statut || e?.file_password),
                            file_password: e?.file_password || '',
                            showPassword: false,
                            date_envoi: this.formatDate(e?.created_at),
                        };
                    });

                    this.filters = {
                        lib_document: this.buildFilter('lib_document'),
                        email_received: this.buildFilter('email_received'),
                    };

                    this.filteredData = [...this.dataMails];
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private buildFilter(key: keyof RowData): { text: string; value: string }[] {
        return [...new Set(this.dataMails
            ?.filter((e: any) => e?.[key])
            .map((e: any) => e[key]))]
            .map((v: any) => ({text: v, value: v}));
    }

    private formatDate(value: any): string {
        if (!value) return '';
        const m = moment(value);
        return m.isValid() ? m.format('DD/MM/YYYY HH:mm') : '';
    }

    exportToExcel(): void {
        const source = this.filteredData?.length ? this.filteredData : this.dataMails;
        if (!source?.length) return;

        const rows = source.map((row: any) => ({
            'Numéro': row.code_document || '',
            'Document': row.lib_document || '',
            'Destinataire(s)': row.email_received || '',
            'Nombre de fichiers': row.nb_fichiers || 0,
            'Protégé': row.protege ? 'Oui' : 'Non',
            'Message': row.message_send || '',
            'Date d\'envoi': row.date_envoi || '',
        }));

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Documents envoyés');

        const colWidths = Object.keys(rows[0] || {}).map(key => ({
            wch: Math.max(key.length, ...rows.map((r: any) => String(r[key] || '').length)) + 2
        }));
        ws['!cols'] = colWidths;

        const fileName = `documents_envoyes_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
        XLSX.writeFile(wb, fileName);
    }
}
