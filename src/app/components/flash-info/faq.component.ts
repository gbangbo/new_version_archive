import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {Editor, NgxEditorModule, Toolbar} from 'ngx-editor';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import moment from 'moment';
import {CardComponent} from '../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../protect/authorization.service';
import {HttpService} from '../../core/http.service';
import {environment} from '../../../environments/environment';

interface FlashInfoRow {
    uid: string;
    lib_flashinfo: string;
    desc_flashinfo: string;   // HTML (mise en forme)
    desc_text: string;        // texte brut (aperçu tableau + recherche)
    actif: boolean;
    date: string;
    periode: string;
    raw: any;
}

@Component({
    selector: 'app-faq',
    imports: [CommonModule, FormsModule, NzTableModule, NzTagModule, NzToolTipModule, NzDatePickerModule, NgxEditorModule, CardComponent, FeatherIconComponent],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit, OnDestroy {

    private users: any = [];
    isloading: boolean = false;
    searchValue: string = '';

    // Éditeur de texte enrichi (description)
    editor!: Editor;
    toolbar: Toolbar = [
        ['bold', 'italic', 'underline', 'strike'],
        ['ordered_list', 'bullet_list'],
        [{heading: ['h1', 'h2', 'h3']}],
        ['link'],
        ['align_left', 'align_center', 'align_right'],
        ['text_color', 'background_color'],
        ['blockquote', 'code'],
    ];

    private allRows: FlashInfoRow[] = [];
    rows: FlashInfoRow[] = [];

    // ── Modal création / modification ─────────────────────────────────
    showModal: boolean = false;
    isEdit: boolean = false;
    editUid: string = '';
    saving: boolean = false;
    modalError: string = '';
    form: {
        libflashinfo: string;
        desc_flashinfo: string;
        dateDebut: Date | null;
        dateFin: Date | null;
    } = {libflashinfo: '', desc_flashinfo: '', dateDebut: null, dateFin: null};

    togglingUid: string | null = null;

    // Dates passées non sélectionnables
    disabledStartDate = (current: Date): boolean => {
        if (!current) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return current < today;
    };

    // La date de fin ne peut pas précéder aujourd'hui ni la date de début
    disabledEndDate = (current: Date): boolean => {
        if (!current) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const s = this.form.dateDebut;
        const start = s ? new Date(s.getFullYear(), s.getMonth(), s.getDate()) : today;
        const min = start > today ? start : today;
        return current < min;
    };

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.editor = new Editor();
        this.users = this.autor.getInfosUsers();
        this.loadFlashInfos();
    }

    ngOnDestroy(): void {
        this.editor?.destroy();
    }

    /** Retire les balises HTML pour un aperçu texte (tableau, recherche). */
    private stripHtml(html: string): string {
        return (html || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // ── Chargement ────────────────────────────────────────────────────
    loadFlashInfos(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];
        const id = this.users?.datasociete?.uid || '';
        this.httService.getData(
            `${environment.api_url}api/:save-flash-info?idflashinfo=&idsociete=${id}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log('save-flash-info ===', res.body);
                if (res.body.status || res.body.success) {
                    this.allRows = (res.body.data || []).map((e: any) => this.mapRow(e));
                    this.applyFilter();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private mapRow(e: any): FlashInfoRow {
        const start = e?.date_start || e?.date_debut || e?.date_debut_flashinfo || '';
        const end = e?.date_end || e?.date_fin || e?.date_fin_flashinfo || '';
        const fmt = (d: any) => d ? moment(d).format('DD/MM/YYYY') : '';
        const s = fmt(start);
        const f = fmt(end);
        const descHtml = e?.desc_flashinfo || '';
        return {
            uid: e?.uid || e?.idflashinfo || '',
            lib_flashinfo: e?.lib_flashinfo || e?.libflashinfo || '',
            desc_flashinfo: descHtml,
            desc_text: this.stripHtml(descHtml),
            actif: e?.active_flash,
            date: e?.created_at ? moment(e.created_at).format('DD/MM/YYYY HH:mm') : '',
            periode: (s && f) ? `${s} → ${f}` : (s || f || '—'),
            raw: e,
        };
    }

    // ── Recherche ─────────────────────────────────────────────────────
    onSearch(value: string): void {
        this.searchValue = value;
        this.applyFilter();
    }

    private applyFilter(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.rows = q
            ? this.allRows.filter(r =>
                r.lib_flashinfo.toLowerCase().includes(q) ||
                r.desc_text.toLowerCase().includes(q))
            : [...this.allRows];
    }

    // ── Modal ─────────────────────────────────────────────────────────
    openCreate(): void {
        this.isEdit = false;
        this.editUid = '';
        this.form = {libflashinfo: '', desc_flashinfo: '', dateDebut: null, dateFin: null};
        this.modalError = '';
        this.showModal = true;
    }

    openEdit(row: FlashInfoRow): void {
        this.isEdit = true;
        this.editUid = row.uid;
        const rawStart = row.raw?.date_start || row.raw?.date_debut || row.raw?.date_debut_flashinfo || null;
        const rawEnd = row.raw?.date_end || row.raw?.date_fin || row.raw?.date_fin_flashinfo || null;
        this.form = {
            libflashinfo: row.lib_flashinfo,
            desc_flashinfo: row.desc_flashinfo,
            dateDebut: rawStart ? new Date(rawStart) : null,
            dateFin: rawEnd ? new Date(rawEnd) : null,
        };
        this.modalError = '';
        this.showModal = true;
    }

    closeModal(): void {
        if (this.saving) return;
        this.showModal = false;
    }

    submit(): void {
        this.modalError = '';
        if (!this.form.libflashinfo.trim()) {
            this.modalError = 'Veuillez saisir le libellé du flash info.';
            return;
        }
        if (this.form.dateDebut && this.form.dateFin && this.form.dateFin < this.form.dateDebut) {
            this.modalError = 'La date de fin ne peut pas être antérieure à la date de début.';
            return;
        }

        const payload: any = {
            action: this.isEdit ? 2 : 1,
            idflashinfo: this.isEdit ? this.editUid : '',
            idsociete: this.users?.datasociete?.uid || '',
            iduser_save: this.users?.uid || '',
            libflashinfo: this.form.libflashinfo.trim(),
            desc_flashinfo: this.form.desc_flashinfo.trim(),
        };
        // Dates envoyées uniquement si renseignées (format YYYY-MM-DD)
        if (this.form.dateDebut) payload.date_start = moment(this.form.dateDebut).format('YYYY-MM-DD');
        if (this.form.dateFin) payload.date_end = moment(this.form.dateFin).format('YYYY-MM-DD');

        this.saving = true;
        this.httService.postData(`${environment.api_url}api/:save-flash-info`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.saving = false;
                if (res.body.status || res.body.success) {
                    this.toast.success(res.body.message || (this.isEdit ? 'Flash info modifié.' : 'Flash info créé.'), 'Succès');
                    this.showModal = false;
                    this.loadFlashInfos();
                } else {
                    this.modalError = res.body.message || 'Échec de l\'enregistrement.';
                }
            })
            .catch((err: any) => {
                this.saving = false;
                this.modalError = err?.error?.err?.message || err?.error?.message || 'Une erreur est survenue.';
            });
    }

    // ── Activer / désactiver (action 4) ───────────────────────────────
    toggleActive(row: FlashInfoRow): void {
        this.togglingUid = row.uid;
        const payload = {
            action: 4,
            idflashinfo: row.uid,
            idsociete: this.users?.datasociete?.uid || '',
            iduser_save: this.users?.uid || '',
            libflashinfo: row.lib_flashinfo,
            desc_flashinfo: row.desc_flashinfo,
        };
        this.httService.postData(`${environment.api_url}api/:save-flash-info`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.togglingUid = null;
                if (res.body.status || res.body.success) {
                    row.actif = !row.actif;
                    this.toast.success(row.actif ? 'Flash info activé.' : 'Flash info désactivé.', 'Succès');
                } else {
                    this.toast.error(res.body.message || 'Opération échouée.', 'Erreur');
                }
            })
            .catch(() => {
                this.togglingUid = null;
                this.toast.error('Une erreur est survenue.', 'Erreur');
            });
    }

    // ── Suppression (action 3) ────────────────────────────────────────
    async remove(row: FlashInfoRow): Promise<void> {
        const result = await Swal.fire({
            html: `
              <div style="margin-top:8px;">
                <p style="font-size:17px;font-weight:700;color:#0F172A;margin-bottom:10px;">
                  Supprimer ce flash info ?
                </p>
                <p style="font-size:13px;color:#64748B;margin:0;">
                  « <strong>${row.lib_flashinfo}</strong> » sera définitivement supprimé.
                </p>
              </div>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            reverseButtons: true,
        });
        if (!result.isConfirmed) return;

        const payload = {
            action: 3,
            idflashinfo: row.uid,
            idsociete: this.users?.datasociete?.uid || '',
            iduser_save: this.users?.uid || '',
            libflashinfo: row.lib_flashinfo,
            desc_flashinfo: row.desc_flashinfo,
        };
        this.httService.postData(`${environment.api_url}api/:save-flash-info`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.toast.success('Flash info supprimé.', 'Succès');
                    this.loadFlashInfos();
                } else {
                    this.toast.error(res.body.message || 'Suppression échouée.', 'Erreur');
                }
            })
            .catch(() => {
                this.toast.error('Une erreur est survenue.', 'Erreur');
            });
    }
}
