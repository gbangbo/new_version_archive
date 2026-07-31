import {ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {environment} from '../../../../../../environments/environment';
import {CardComponent} from "../../card/card.component";
import {HistoLogService} from "../../../../services/histo-log.service";
import * as pdfjsLib from 'pdfjs-dist';

interface MailFileItem {
    uid: string;
    name: string;
    extension: string;
    url_file: string;
    password_file?: string;
    nombre_page?: string;
    checked: boolean;
}

@Component({
    selector: 'app-send-mail-modal',
    imports: [CommonModule, FormsModule, NzIconModule, NzDatePickerModule, CardComponent],
    templateUrl: './send-mail-modal.component.html',
    styleUrl: './send-mail-modal.component.scss',
})
export class SendMailModalComponent {

    visible: boolean = false;
    doc: any = null;

    isloadingFiles: boolean = false;
    files: MailFileItem[] = [];

    /* ── Formulaire ── */
    destinataires: string = '';
    message: string = '';
    filePassword: string = '';

    /* ── État d'envoi ── */
    isSending: boolean = false;
    sendSuccess: boolean = false;
    sendError: string = '';

    private users: any = null;

    /* ── Demande d'autorisation (403) ── */
    accessForbidden: boolean = false;
    showAuthModal: boolean = false;
    authSaving: boolean = false;
    authRequested: boolean = false;
    authError: string = '';
    authData: { motif_auth: string; deadlineRange: Date[] } = {motif_auth: '', deadlineRange: []};
    authActions: { key: string; label: string; icon: string; checked: boolean }[] = [
        {key: 'consultation', label: 'Consultation', icon: 'fa-regular fa-eye', checked: true},
        {key: 'telechargement', label: 'Téléchargement', icon: 'fa-solid fa-download', checked: false},
        {key: 'impression', label: 'Impression', icon: 'fa-solid fa-print', checked: false},
    ];

    disabledPastDate = (current: Date): boolean => {
        if (!current) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return current < today;
    };

    /* ── Prévisualisation (panneau glissant à droite) ── */
    previewingUid: string | null = null;   // fichier en cours de préparation
    previewOpen: boolean = false;
    previewItem: MailFileItem | null = null;
    previewLoading: boolean = false;
    previewError: string = '';
    previewImages: string[] = [];           // pages PDF rendues (dataURL)
    previewImageUrl: string = '';           // URL directe pour les images
    previewIsImage: boolean = false;
    currentPreviewPage: number = 1;         // page affichée (1-based)
    previewZoom: number = 1;                 // niveau de zoom
    readonly minZoom: number = 0.5;
    readonly maxZoom: number = 3;
    readonly zoomStep: number = 0.25;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private cdr: ChangeDetectorRef,
        private histoLog: HistoLogService
    ) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
    }

    /* ────────────────────────────────────────
       Ouverture / fermeture
    ──────────────────────────────────────── */
    open(doc: any): void {
        this.doc = doc;
        this.visible = true;
        this.files = [];
        this.destinataires = '';
        this.message = '';
        this.filePassword = '';
        this.isSending = false;
        this.sendSuccess = false;
        this.sendError = '';
        this.accessForbidden = false;
        this.showAuthModal = false;
        this.authRequested = false;
        this.authError = '';
        this.authData = {motif_auth: '', deadlineRange: []};
        this.authActions.forEach(a => a.checked = a.key === 'consultation');
        this.users = this.autor.getInfosUsers();
        this.loadFiles();
    }

    close(): void {
        if (this.isSending) return;
        this.visible = false;
    }

    /* ────────────────────────────────────────
       Chargement des fichiers du document
    ──────────────────────────────────────── */
    private loadFiles(): void {
        const iduser = this.users?.uid || '';
        const iddocuments = this.doc?.uid || '';
        this.isloadingFiles = true;
        this.httService
            .getData(
                `${environment.api_url}api/:consultation-pieces-documents?iduser=${iduser}&iddocuments=${iddocuments}`,
                false,
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                this.isloadingFiles = false;
                this.accessForbidden = false;
                if (res.body.status || res.body.success) {
                    this.files = (res.body.data || []).map((d: any) => ({
                        uid: d.uid,
                        name: d.name_piece_docs || d.name_file_docs || d.name || '',
                        extension: d.extension || this.getFileExtension(d.url_file || ''),
                        url_file: d.url_file || '',
                        password_file: d.password_file || '',
                        nombre_page: d.nombre_page || '',
                        checked: false
                    }));
                }
            })
            .catch((err: any) => {
                this.isloadingFiles = false;
                // 403 : pas d'accès à ce document → demande d'autorisation
                if (err?.status === 403) {
                    this.accessForbidden = true;
                    this.files = [];
                }
            });
    }

    /* ────────────────────────────────────────
       Demande d'autorisation de consultation (403)
    ──────────────────────────────────────── */
    openAuthModal(): void {
        this.authError = '';
        this.showAuthModal = true;
    }

    closeAuthModal(): void {
        this.showAuthModal = false;
    }

    submitAuthRequest(): void {
        this.authError = '';
        const selectedActions = this.authActions.filter(a => a.checked).map(a => a.key);
        if (!selectedActions.length) {
            this.authError = 'Veuillez sélectionner au moins une action.';
            return;
        }
        if (!this.authData.motif_auth.trim()) {
            this.authError = 'Veuillez saisir le motif de la demande.';
            return;
        }

        const doc = this.doc || {};
        const payload: any = {
            action: 1,
            idauth: '',
            idsociete: this.users?.datasociete?.uid || doc?.datasociete?.uid || '',
            iduser_save: this.users?.uid || '',
            iduser_auth: doc?.datauser?.uid || doc?.iduser_save || '',
            idpiece_docs: '',
            idpieces_docs: [],
            iddocuments: doc?.uid || '',
            motif_auth: this.authData.motif_auth.trim(),
            action_auth: selectedActions.join(','),
            active_auth: true,
            idtype_authorisation: '',
        };

        const range = this.authData.deadlineRange || [];
        const fmt = (d: Date | null | undefined): string => d
            ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
            : '';
        const start = fmt(range[0]);
        const end = fmt(range[1]);
        if (start) payload.deadline_start_auth = start;
        if (end) payload.deadline_end_auth = end;

        this.authSaving = true;
        this.httService
            .postData(`${environment.api_url}api/:save-demande-authorisation`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.authSaving = false;
                if (res.body.status || res.body.success) {
                    this.showAuthModal = false;
                    this.authRequested = true;
                } else {
                    this.authError = res.body.message || 'Échec de l\'envoi de la demande.';
                }
            })
            .catch((err: any) => {
                this.authSaving = false;
                this.authError = err?.error?.err?.message || err?.error?.message || 'Une erreur est survenue.';
            });
    }

    /* ────────────────────────────────────────
       Sélection des fichiers
    ──────────────────────────────────────── */
    get selectedFiles(): MailFileItem[] {
        return this.files.filter(f => f.checked);
    }

    get allChecked(): boolean {
        return this.files.length > 0 && this.files.every(f => f.checked);
    }

    get someChecked(): boolean {
        return this.files.some(f => f.checked) && !this.allChecked;
    }

    toggleAll(): void {
        const target = !this.allChecked;
        this.files.forEach(f => f.checked = target);
    }

    toggleFile(file: MailFileItem): void {
        file.checked = !file.checked;
    }

    /* ────────────────────────────────────────
       Validation des e-mails
       (plusieurs adresses séparées par ; ou ,)
    ──────────────────────────────────────── */
    get emailList(): string[] {
        return this.destinataires
            .split(/[;,]/)
            .map(e => e.trim())
            .filter(e => e.length > 0);
    }

    get emailsValid(): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return this.emailList.length > 0 && this.emailList.every(e => re.test(e));
    }

    get canSend(): boolean {
        return this.selectedFiles.length > 0 && this.emailsValid && !this.isSending;
    }

    /* ────────────────────────────────────────
       Envoi
    ──────────────────────────────────────── */
    send(): void {
        if (!this.canSend) return;
        this.isSending = true;
        this.sendError = '';

        const payload = {
            action: 1,
            idsendmail: '',
            idsociete: this.users?.datasociete?.uid || '',
            iduser_save: this.users?.uid || '',
            iddocuments: this.doc?.uid || '',
            idpieces_docs: this.selectedFiles.map(f => f.uid),
            email_received: this.emailList.join(','),
            message_send: this.message,
            file_password: this.filePassword
        };
        this.httService
            .postData(
                `${environment.api_url}api/:save-send-mails`,
                payload,
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                this.isSending = false;
                if (res.body.status || res.body.success) {
                    this.sendSuccess = true;
                    // Log : envoi par mail
                    const nameCategories = this.doc?.datacategories?.name_categories || this.doc?.categorie || '';
                    const codeDocs = this.doc?.code_docs || this.doc?.numero || '';
                    const destinataires = this.emailList.join(', ');
                    const listePiece = this.selectedFiles.map(f => f.name).join(', ');
                    this.histoLog.log(
                        `A envoyé par mail  le dossier (${nameCategories}) numéro (${codeDocs}) à ${destinataires} pieces (${listePiece})`
                    );
                } else {
                    this.sendError = res.body.message || "L'envoi a échoué. Veuillez réessayer.";
                }
            })
            .catch(() => {
                this.isSending = false;
                this.sendError = "L'envoi a échoué. Veuillez réessayer.";
            });
    }

    /* ────────────────────────────────────────
       Helpers
    ──────────────────────────────────────── */
    getFileExtension(url: string): string {
        if (!url) return '';
        const clean = url.split('?')[0].split('#')[0];
        return (clean.split('.').pop() || '').toLowerCase();
    }

    isImage(extension: string): boolean {
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes((extension || '').toLowerCase());
    }

    /* En dev on retire le préfixe URL_API pour passer par le proxy */
    getProxyUrl(url: string): string {
        return environment.production ? url : url.replace(`${environment.URL_API}`, '');
    }

    /* Ouvre le panneau de prévisualisation (glisse depuis la droite).
       Pour les PDF protégés, déchiffrement côté client via password_file. */
    async previewFile(file: MailFileItem, event: Event): Promise<void> {
        event.preventDefault();
        event.stopPropagation();
        if (!file?.url_file || this.previewingUid) return;

        const url = this.getProxyUrl(file.url_file);
        const ext = (file.extension || this.getFileExtension(file.url_file)).toLowerCase();

        // Ouverture immédiate du panneau
        this.previewItem = file;
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

        // Formats non prévisualisables : ouverture directe
        this.previewError = 'Ce type de fichier ne peut pas être prévisualisé ici.';
    }

    private async renderPdfPreview(file: MailFileItem, url: string): Promise<void> {
        this.previewingUid = file.uid;
        this.previewLoading = true;
        this.previewImages = [];
        try {
            const password = file.password_file || undefined;
            const pdf: any = await pdfjsLib.getDocument({url, password}).promise;

            // Rendu page par page : chaque page s'affiche dès qu'elle est prête,
            // et une page en échec n'interrompt pas les suivantes.
            for (let i = 1; i <= pdf.numPages; i++) {
                try {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({scale: 1.5});
                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    await page.render({canvasContext: canvas.getContext('2d')!, viewport}).promise;
                    this.previewImages = [...this.previewImages, canvas.toDataURL('image/png')];
                    // Première page prête → on masque le loader
                    if (i === 1) this.previewLoading = false;
                    this.cdr.detectChanges();
                } catch {
                    // page illisible : on continue avec les autres
                }
            }

            if (!this.previewImages.length) {
                this.previewError = "Impossible d'ouvrir ce fichier pour la prévisualisation.";
            }
        } catch (e) {
            this.previewError = "Impossible d'ouvrir ce fichier pour la prévisualisation.";
        } finally {
            this.previewLoading = false;
            this.previewingUid = null;
            this.cdr.detectChanges();
        }
    }

    closePreview(): void {
        this.previewOpen = false;
        this.previewItem = null;
        this.previewImages = [];
        this.previewImageUrl = '';
        this.previewIsImage = false;
        this.previewError = '';
        this.currentPreviewPage = 1;
        this.previewZoom = 1;
    }

    /* ── Navigation des pages (PDF) ── */
    prevPage(): void {
        if (this.currentPreviewPage > 1) this.currentPreviewPage--;
    }

    nextPage(): void {
        if (this.currentPreviewPage < this.previewImages.length) this.currentPreviewPage++;
    }

    /* ── Zoom ── */
    zoomIn(): void {
        this.previewZoom = Math.min(this.maxZoom, +(this.previewZoom + this.zoomStep).toFixed(2));
    }

    zoomOut(): void {
        this.previewZoom = Math.max(this.minZoom, +(this.previewZoom - this.zoomStep).toFixed(2));
    }

    resetZoom(): void {
        this.previewZoom = 1;
    }

    /* Ouvre malgré tout dans un nouvel onglet (fichiers non prévisualisables) */
    openInNewTab(): void {
        if (!this.previewItem?.url_file) return;
        window.open(this.getProxyUrl(this.previewItem.url_file), '_blank');
    }
}
