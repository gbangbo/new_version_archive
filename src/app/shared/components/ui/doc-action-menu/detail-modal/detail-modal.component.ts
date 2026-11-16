import {ChangeDetectorRef, Component, HostListener, Input} from '@angular/core';
import Swal from 'sweetalert2';
import {CommonModule} from '@angular/common';
import moment from 'moment';
import {CardComponent} from "../../card/card.component";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {FeatherIconComponent} from "../../feather-icon/feather-icon.component";
import {Authorization} from "../../../../../protect/authorization.service";
import {HttpService} from "../../../../../core/http.service";
import {HistoLogService} from "../../../../services/histo-log.service";
import {environment} from "../../../../../../environments/environment";
import * as pdfjsLib from 'pdfjs-dist';

interface DetailRow {
    label: string;
    value?: string;
    bool?: boolean;   // si défini → rendu sous forme de badge Oui / Non
}

interface DetailProp {
    label: string;
    type: string;
    value: string;
}

interface DetailFileItem {
    uid: string;
    name: string;
    extension: string;
    url_file: string;
    password_file?: string;
    nombre_page?: string;
}

@Component({
    selector: 'app-detail-modal',
    imports: [CommonModule, CardComponent, NzTagModule, NzIconModule, NzToolTipModule, FeatherIconComponent],
    templateUrl: './detail-modal.component.html',
    styleUrl: './detail-modal.component.scss',
})
export class DetailModalComponent {

    visible: boolean = false;
    doc: any = null;

    /* La liste des pièces jointes s'affiche partout ; seules les actions
       (visionnage + suppression) sont réservées aux pages qui l'autorisent
       — aujourd'hui documents/mes-documents */
    @Input() showPieceActions: boolean = false;

    /* ── Pièces jointes du document ── */
    files: DetailFileItem[] = [];
    isLoadingFiles: boolean = false;
    accessForbidden: boolean = false;   // 403 : pas de droit de consultation
    deletingUid: string | null = null;  // pièce en cours de suppression

    /* ── Prévisualisation (panneau glissant depuis la droite) ── */
    previewingUid: string | null = null;   // fichier en cours de préparation
    previewOpen: boolean = false;
    previewItem: DetailFileItem | null = null;
    previewLoading: boolean = false;
    previewError: string = '';
    previewImages: string[] = [];          // pages PDF rendues (dataURL)
    previewImageUrl: string = '';          // URL directe pour les images
    previewIsImage: boolean = false;
    currentPreviewPage: number = 1;        // page affichée (1-based)
    previewZoom: number = 1;
    readonly minZoom: number = 0.5;
    readonly maxZoom: number = 3;
    readonly zoomStep: number = 0.25;

    private users: any = null;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private cdr: ChangeDetectorRef,
        private histoLog: HistoLogService,
    ) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
    }

    /* ────────────────────────────────────────
       Ouverture / fermeture
    ──────────────────────────────────────── */
    @HostListener('document:keydown.escape')
    handleEscKey(): void {
        if (!this.visible) return;
        // Échap referme d'abord l'aperçu, puis le détail
        if (this.previewOpen) {
            this.closePreview();
            return;
        }
        this.close();
    }

    open(doc: any): void {
        this.doc = doc || null;
        this.visible = true;
        this.users = this.autor.getInfosUsers();
        this.files = [];
        this.accessForbidden = false;
        this.deletingUid = null;
        this.closePreview();
        this.loadFiles();
    }

    close(): void {
        this.visible = false;
        this.closePreview();
    }

    /* ────────────────────────────────────────
       Chargement des pièces jointes
       (même API que recherche/prévisualisation)
    ──────────────────────────────────────── */
    private loadFiles(): void {
        const iduser = this.users?.uid || '';
        const iddocuments = this.doc?.uid || '';
        if (!iddocuments) return;

        this.isLoadingFiles = true;
        this.httService
            .getData(
                `${environment.api_url}api/:consultation-pieces-documents?iduser=${iduser}&iddocuments=${iddocuments}`,
                false,
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                this.isLoadingFiles = false;
                this.accessForbidden = false;
                if (res.body.status || res.body.success) {
                    this.files = (res.body.data || []).map((d: any) => ({
                        uid: d.uid,
                        name: d.name_piece_docs || d.name_file_docs || d.name || '',
                        extension: d.extension || this.getFileExtension(d.url_file || ''),
                        url_file: d.url_file || '',
                        password_file: d.password_file || '',
                        nombre_page: d.nombre_page || '',
                    }));
                }
                this.cdr.detectChanges();
            })
            .catch((err: any) => {
                this.isLoadingFiles = false;
                this.files = [];
                // 403 : l'utilisateur n'a pas le droit de consulter les pièces
                if (err?.status === 403) this.accessForbidden = true;
                this.cdr.detectChanges();
            });
    }

    /* ────────────────────────────────────────
       Prévisualisation d'une pièce jointe
    ──────────────────────────────────────── */
    async previewFile(file: DetailFileItem, event: Event): Promise<void> {
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

        // Log : prévisualisation d'un fichier
        const fileLabel = `${file.name || ''}${ext ? '.' + ext : ''}`;
        this.histoLog.log(
            `A prévisualisé le fichier (${fileLabel}) du dossier (${this.doc?.code_docs || this.doc?.numero || ''})`,
            {idpiece_docs: file.uid}
        );

        if (this.isImage(ext)) {
            this.previewIsImage = true;
            this.previewImageUrl = url;
            return;
        }

        if (ext === 'pdf') {
            await this.renderPdfPreview(file, url);
            return;
        }

        // Formats non prévisualisables ici (Word, Excel…) : ouverture dans un onglet
        this.previewError = 'Ce type de fichier ne peut pas être prévisualisé ici.';
    }

    private async renderPdfPreview(file: DetailFileItem, url: string): Promise<void> {
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
        this.previewItem = null;
        this.previewImages = [];
        this.previewImageUrl = '';
        this.previewIsImage = false;
        this.previewError = '';
        this.previewLoading = false;
        this.previewingUid = null;
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

    /* ────────────────────────────────────────
       Suppression d'une pièce jointe
    ──────────────────────────────────────── */
    confirmDeletePiece(file: DetailFileItem, event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        if (!file?.uid || this.deletingUid) return;

        const nom = `${file.name || ''}${file.extension ? '.' + file.extension : ''}`;
        Swal.fire({
            width: 440,
            padding: 0,
            background: 'transparent',
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false,
            html: `
                <div style="position:relative;background:#fff;border-radius:14px;overflow:hidden;
                    box-shadow:0 24px 64px rgba(0,0,0,.22);text-align:center;">

                    <button id="dp-close" type="button" aria-label="Fermer"
                        style="position:absolute;top:14px;right:14px;width:34px;height:34px;padding:0;
                        box-sizing:border-box;border:none;background:#f1f3f5;color:#64748b;border-radius:50%;
                        cursor:pointer;font-size:15px;line-height:1;display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div style="padding:36px 38px 24px;">
                        <div style="width:86px;height:86px;margin:0 auto 20px;border-radius:50%;
                            background:#fde8e6;display:flex;align-items:center;justify-content:center;">
                            <i class="fa-regular fa-trash-can" style="font-size:32px;color:#d9432f;"></i>
                        </div>
                        <h3 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#2f4858;">
                            Supprimer cette pièce ?
                        </h3>
                        <p style="margin:0;font-size:13.5px;line-height:1.7;color:#5b7a8c;">
                            Le fichier sera définitivement retiré du dossier.
                            Cette action est irréversible.
                        </p>
                        ${nom ? `<p style="margin:12px 0 0;font-size:13px;font-weight:700;color:#2f4858;
                            display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                            ${nom}</p>` : ''}
                    </div>

                    <div style="display:flex;justify-content:center;gap:16px;padding:18px 24px;background:#eef1f4;">
                        <button id="dp-cancel" type="button"
                            style="min-width:140px;padding:12px 22px;border:none;border-radius:5px;cursor:pointer;
                            background:#8ba7b5;color:#fff;font-size:13px;font-weight:600;letter-spacing:.06em;">
                            ANNULER
                        </button>
                        <button id="dp-confirm" type="button"
                            style="min-width:140px;padding:12px 22px;border:none;border-radius:5px;cursor:pointer;
                            background:#c0392b;color:#fff;font-size:13px;font-weight:600;letter-spacing:.06em;">
                            SUPPRIMER
                        </button>
                    </div>
                </div>
            `,
            didOpen: () => {
                const popup = Swal.getPopup();
                if (!popup) return;
                popup.querySelector('#dp-cancel')?.addEventListener('click', () => Swal.close());
                popup.querySelector('#dp-close')?.addEventListener('click', () => Swal.close());
                popup.querySelector('#dp-confirm')?.addEventListener('click', () => {
                    Swal.close();
                    this.deletePiece(file);
                });
            }
        });
    }

    private deletePiece(file: DetailFileItem): void {
        const payload = {
            idsociete: this.users?.datasociete?.uid || this.doc?.datasociete?.uid || '',
            idpiece_docs: file.uid,
            iddocuments: this.doc?.uid || '',
        };

        this.deletingUid = file.uid;
        this.httService
            .deleteData(
                `${environment.api_url}api/:consultation-pieces-documents`,
                payload,
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                this.deletingUid = null;
                if (res.body.status || res.body.success) {
                    // Retrait de la liste + fermeture de l'aperçu si c'était cette pièce
                    this.files = this.files.filter(f => f.uid !== file.uid);
                    if (this.previewItem?.uid === file.uid) this.closePreview();

                    // Log : suppression d'une pièce
                    const fileLabel = `${file.name || ''}${file.extension ? '.' + file.extension : ''}`;
                    this.histoLog.log(
                        `A supprimé le fichier (${fileLabel}) du dossier (${this.doc?.code_docs || this.doc?.numero || ''})`,
                        {idpiece_docs: file.uid}
                    );

                    Swal.fire({
                        title: res?.body?.message || 'Pièce supprimée avec succès.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: res?.body?.message || 'La suppression a échoué.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                this.cdr.detectChanges();
            })
            .catch((err: any) => {
                this.deletingUid = null;
                Swal.fire({
                    title: err?.error?.err?.message || err?.error?.message || 'La suppression a échoué.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                this.cdr.detectChanges();
            });
    }

    /* Ouvre malgré tout dans un nouvel onglet (fichiers non prévisualisables) */
    openInNewTab(): void {
        if (!this.previewItem?.url_file) return;
        window.open(this.getProxyUrl(this.previewItem.url_file), '_blank');
    }

    /* ────────────────────────────────────────
       Titre / sous-titre de l'en-tête
    ──────────────────────────────────────── */
    get title(): string {
        return this.doc?.lib_document || this.doc?.lib_docs || 'Détail du document';
    }

    get reference(): string {
        return this.doc?.numero || this.doc?.code_docs || '';
    }

    get categorie(): string {
        return this.doc?.categorie || this.doc?.datacategories?.name_categories || '';
    }

    get categorieColor(): string {
        return this.doc?.categorie_color || '#6366f1';
    }

    /* ────────────────────────────────────────
       Sections de lignes (label / valeur)
    ──────────────────────────────────────── */
    get infosGenerales(): DetailRow[] {
        const d = this.doc || {};
        const type = d?.datatype_document?.[0]?.libelle_type_docs || '';
        const dboite = d?.databoites || {};

        const p = d?.datauser?.datapersonnel || d?.datapersonnel || {};
        const nomComplet = `${p?.nom || ''} ${p?.prenom || ''}`.trim();

        return this.clean([
            {label: 'Numéro', value: d?.numero || d?.code_docs},
            {label: 'Libellé', value: d?.lib_document || d?.lib_docs},
            {label: 'Description', value: d?.desc_docs},
            {label: 'Type de document', value: type},
            {label: 'Date du document', value: d?.date_document || this.formatDate(d?.date_docs)},
            {label: 'Créé le', value: this.formatDateTime(d?.created_at)},
            {label: 'Statut', bool: !!d?.publishe, value: d?.publishe ? 'Public' : 'Privée'},
            {
                label: 'Emplacement physique',
                value: `Ce dossier se trouve à ${d?.datasites?.libelle_sites} à l'épi ${d?.datarayons?.code_rayon} dans la boîte d'archives ${dboite.code_boites}`
            },
            {label: 'Auteur', value: nomComplet},
        ]);
    }


    get services(): DetailRow[] {
        const list = this.doc?.dataservices || [];
        return list.map((s: any) => ({
            label: s?.sigle || '—',
            value: s?.libelle || '',
        })).filter((r: DetailRow) => r.value);
    }

    // Champs à masquer dans « CHAMPS ADDITIONNELS » (déjà affichés ailleurs)
    private readonly PROPS_EXCLUES = [
        'numéro du document',
        'objet du document',
        'date du document',
    ];

    get proprietes(): DetailProp[] {
        const list = this.doc?.datatype_document?.[0]?.dataPro || [];
        return list.map((pr: any) => ({
            label: pr?.lib_proprietes_docs || '',
            type: pr?.type_proprietes_docs || '',
            // La valeur saisie se trouve dans dataPro.dataValue.value_proprietes_docs
            // (dataValue peut être un objet ou un tableau selon l'API)
            value: this.extractProValue(pr?.dataValue),
        })).filter((p: DetailProp) =>
            p.label && !this.PROPS_EXCLUES.includes(p.label.trim().toLowerCase())
        );
    }

    private extractProValue(dataValue: any): string {
        if (!Array.isArray(dataValue)) return '';
        return dataValue
            .map((v: any) => v?.value_proprietes_docs)
            .filter((v: any) => v !== null && v !== undefined && String(v).trim() !== '')
            .join(', ');
    }

    /* ────────────────────────────────────────
       Helpers
    ──────────────────────────────────────── */
    private clean(rows: DetailRow[]): DetailRow[] {
        return rows.filter(r =>
            r.bool !== undefined ||
            (r.value !== null && r.value !== undefined && String(r.value).trim() !== '')
        );
    }

    private formatDate(value: any): string {
        if (!value) return '';
        const m = moment(value);
        return m.isValid() ? m.format('DD/MM/YYYY') : '';
    }

    private formatDateTime(value: any): string {
        if (!value) return '';
        const m = moment(value);
        return m.isValid() ? m.format('DD/MM/YYYY [à] HH:mm') : '';
    }

    getFileExtension(url: string): string {
        if (!url) return '';
        const clean = url.split('?')[0].split('#')[0];
        return (clean.split('.').pop() || '').toLowerCase();
    }

    isImage(extension: string): boolean {
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes((extension || '').toLowerCase());
    }

    /* Teinte de la vignette selon le type de fichier */
    fileTone(extension: string): string {
        const ext = (extension || '').toLowerCase();
        if (ext === 'pdf') return 'tone-pdf';
        if (this.isImage(ext)) return 'tone-image';
        if (['doc', 'docx'].includes(ext)) return 'tone-word';
        if (['xls', 'xlsx'].includes(ext)) return 'tone-excel';
        if (['ppt', 'pptx'].includes(ext)) return 'tone-ppt';
        return 'tone-file';
    }

    isOffice(extension: string): boolean {
        return ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes((extension || '').toLowerCase());
    }

    /* En dev on retire le préfixe URL_API pour passer par le proxy */
    getProxyUrl(url: string): string {
        return environment.production ? url : url.replace(`${environment.URL_API}`, '');
    }

    closeModal() {
        this.close();
    }
}
