import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {ToastrService} from 'ngx-toastr';
import moment from 'moment';
import {environment} from '../../../../../environments/environment';
import {Authorization} from '../../../../protect/authorization.service';
import {HttpService} from '../../../../core/http.service';

interface DocResult {
    uid: string;
    code_docs: string;
    lib_docs: string;
}

interface ImputeFile {
    uid: string;
    name: string;
    extension: string;
    checked: boolean;
}

@Component({
    selector: 'app-compose-email-modal',
    imports: [CommonModule, FormsModule, NzSelectModule, NzDatePickerModule],
    templateUrl: './compose-email-modal.component.html',
    styleUrl: './compose-email-modal.component.scss'
})
export class ComposeEmailModalComponent implements OnInit {

    @Output() modalOpen = new EventEmitter<boolean>();
    @Output() created = new EventEmitter<void>();

    private users: any = null;

    // ── Recherche du document (par numéro) ────────────────────────────
    docNumero: string = '';
    searchingDoc: boolean = false;
    docResults: DocResult[] = [];
    docSearched: boolean = false;
    selectedDoc: DocResult | null = null;

    // ── Fichiers du document ──────────────────────────────────────────
    loadingFiles: boolean = false;
    files: ImputeFile[] = [];

    // ── Destinataires (personnels) ────────────────────────────────────
    dataPersonnels: any[] = [];
    loadingPersonnels: boolean = false;
    selectedPersonnels: string[] = [];

    // ── Priorité / consigne ───────────────────────────────────────────
    dataPriorites: any[] = [];
    selectedPriorite: string = '';
    dataConsignes: any[] = [];
    selectedConsigne: string = '';

    // ── Champs ────────────────────────────────────────────────────────
    descImpute: string = '';
    message: string = '';
    notifyEmail: boolean = true;
    dateEnd: Date | null = null;

    // ── État ──────────────────────────────────────────────────────────
    isSaving: boolean = false;
    errorTexte: string = '';

    disabledPastDate = (current: Date): boolean => {
        if (!current) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return current < today;
    };

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadPersonnels();
        this.loadPriorites();
        this.loadConsignes();
    }

    @HostListener('document:keydown.escape')
    handleEscKey(): void {
        this.closeModal();
    }

    closeModal(): void {
        if (this.isSaving) return;
        this.modalOpen.emit(false);
    }

    // ── Recherche document par numéro ─────────────────────────────────
    searchDocument(): void {
        const numero = this.docNumero.trim();
        if (!numero) return;
        const id = this.users?.datasociete?.uid || '';
        this.searchingDoc = true;
        this.docSearched = false;
        this.docResults = [];
        this.httService.getData(
            `${environment.api_url}api/:savedocuments?idsociete=${id}&code_docs=${encodeURIComponent(numero)}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.searchingDoc = false;
                this.docSearched = true;
                if (res.body.status || res.body.success) {
                    this.docResults = (res.body.data || []).map((e: any) => ({
                        uid: e.uid,
                        code_docs: e.code_docs || '',
                        lib_docs: e.lib_docs || e.lib_document || '',
                    }));
                }
            })
            .catch(() => {
                this.searchingDoc = false;
                this.docSearched = true;
            });
    }

    selectDocument(doc: DocResult): void {
        this.selectedDoc = doc;
        this.docResults = [];
        this.loadFiles(doc.uid);
    }

    clearDocument(): void {
        this.selectedDoc = null;
        this.files = [];
        this.docResults = [];
        this.docSearched = false;
        this.docNumero = '';
    }

    private loadFiles(iddocuments: string): void {
        this.loadingFiles = true;
        this.files = [];
        this.httService.getData(
            `${environment.api_url}api/:consultation-pieces-documents?iduser=${this.users?.uid || ''}&iddocuments=${iddocuments}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingFiles = false;
                if (res.body.status || res.body.success) {
                    this.files = (res.body.data || []).map((d: any) => ({
                        uid: d.uid,
                        name: d.name_piece_docs || d.name_file_docs || d.name || '',
                        extension: (d.extension || '').toLowerCase(),
                        checked: true,
                    }));
                }
            })
            .catch(() => {
                this.loadingFiles = false;
            });
    }

    toggleFile(f: ImputeFile): void {
        f.checked = !f.checked;
    }

    get selectedFileUids(): string[] {
        return this.files.filter(f => f.checked).map(f => f.uid);
    }

    // ── Chargement personnels / priorités ─────────────────────────────
    private loadPersonnels(): void {
        const id = this.users?.datasociete?.uid || this.users?.uidsociete || '';
        this.loadingPersonnels = true;
        this.httService.getData(
            `${environment.api_url}auth/:liste-des-comptes?idsociete=${id}&idpersonnel=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingPersonnels = false;
                console.log('liste-des-comptes ===', res.body);
                if (res.body.status || res.body.success) {
                    this.dataPersonnels = (res.body.data || [])
                        .map((e: any) => {
                            const p = e?.datapersonnel || e || {};
                            const nom = `${p?.nom || ''} ${p?.prenom || ''}`.trim();
                            const email = p?.emailAgent || p?.email || e?.email || e?.login || '';
                            return {
                                label: nom || email || '—',
                                value: e?.uid || e?.id,
                            };
                        })
                        .filter((x: any) => !!x.value);
                }
            })
            .catch(() => {
                this.loadingPersonnels = false;
            });
    }

    private loadPriorites(): void {
        const id = this.users?.datasociete?.uid || '';
        this.httService.getData(
            `${environment.api_url}api/:savepriorite?idsociete=${id}&idpriorites=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.dataPriorites = (res.body.data || []).map((e: any) => ({
                        label: e?.lib_priorite || e?.libelle || '',
                        value: e?.uid,
                    })).filter((p: any) => p.value && p.label);
                }
            })
            .catch(() => {
            });
    }

    private loadConsignes(): void {
        const id = this.users?.datasociete?.uid || '';
        this.httService.getData(
            `${environment.api_url}api/:saveconsigne?idsociete=${id}&idconsigne=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.dataConsignes = (res.body.data || []).map((e: any) => ({
                        label: e?.libconsigne || e?.desc_consigne || '',
                        value: e?.uid,
                    })).filter((c: any) => c.value && c.label);
                }
            })
            .catch(() => {
            });
    }

    // ── Enregistrement ────────────────────────────────────────────────
    submit(): void {
        this.errorTexte = '';
        if (!this.selectedDoc) {
            this.errorTexte = 'Veuillez rechercher et sélectionner un document.';
            return;
        }
        if (!this.selectedPersonnels.length) {
            this.errorTexte = 'Veuillez sélectionner au moins un destinataire.';
            return;
        }

        const payload: any = {
            action: 1,
            idimputation: '',
            idsociete: this.users?.datasociete?.uid || '',
            idpriorite: this.selectedPriorite || '',
            idconsigne: this.selectedConsigne || '',
            idsender: this.users?.uid || '',
            iddocuments: this.selectedDoc.uid,
            desc_impute: this.descImpute.trim(),
            status_email: this.notifyEmail ? 1 : 0,
            personnels: this.selectedPersonnels,
            file_docs: this.selectedFileUids,
            message: this.message.trim(),
        };
        if (this.dateEnd) {
            payload.date_end_traitement = moment(this.dateEnd).format('YYYY-MM-DD HH:mm:ss');
        }
        console.log("payload =====", payload)
        this.isSaving = true;
        this.httService.postData(`${environment.api_url}api/:saveimputation`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isSaving = false;
                if (res.body.status || res.body.success) {
                    this.toast.success(res.body.message || 'Imputation créée avec succès.', 'Succès');
                    this.created.emit();
                    this.modalOpen.emit(false);
                } else {
                    this.errorTexte = res.body.message || 'Échec de la création de l\'imputation.';
                }
            })
            .catch((err: any) => {
                this.isSaving = false;
                this.errorTexte = err?.error?.err?.message || err?.error?.message || 'Une erreur est survenue.';
            });
    }

    fileIcon(ext: string): string {
        const e = (ext || '').toLowerCase();
        if (e === 'pdf') return 'fa-file-pdf';
        if (['doc', 'docx'].includes(e)) return 'fa-file-word';
        if (['xls', 'xlsx'].includes(e)) return 'fa-file-excel';
        if (['ppt', 'pptx'].includes(e)) return 'fa-file-powerpoint';
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(e)) return 'fa-file-image';
        return 'fa-file-lines';
    }
}
