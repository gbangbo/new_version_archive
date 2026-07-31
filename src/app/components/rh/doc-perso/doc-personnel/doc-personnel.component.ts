import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../../environments/environment';
import {Authorization} from '../../../../protect/authorization.service';
import {HttpService} from '../../../../core/http.service';
import {CardComponent} from '../../../../shared/components/ui/card/card.component';

interface PreviewFile {
    file: File;
    name: string;          // nom_fichiers (éditable)
    previewUrl: string;    // object-URL (tous types)
    isImage: boolean;
    isPdf: boolean;
    extension: string;
    sizeLabel: string;
}

@Component({
    selector: 'app-doc-personnel',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSelectModule, CardComponent],
    templateUrl: './doc-personnel.component.html',
    styleUrl: './doc-personnel.component.scss',
})
export class DocPersonnelComponent implements OnInit, OnDestroy {

    users: any = [];

    dataSocietes: any[] = [];
    loadingSocietes: boolean = false;

    dataPersonnel: any[] = [];
    loadingPersonnel: boolean = false;

    selectedFiles: PreviewFile[] = [];
    isDragging: boolean = false;

    isSaving: boolean = false;
    totalUploads: number = 0;
    doneUploads: number = 0;
    errorTexte: string = '';

    // ── Aperçu ────────────────────────────────────────────────────────
    previewPf: PreviewFile | null = null;
    previewSafeUrl: SafeResourceUrl | null = null;

    // ── Rapport d'enregistrement ──────────────────────────────────────
    showReport: boolean = false;
    reportOk: number = 0;
    reportFail: number = 0;
    reportRows: { personnel: string; ok: number; total: number; failures: { fichier: string; raison: string }[] }[] = [];

    validationForm = new FormGroup({
        societe_uid: new FormControl('', Validators.required),
        personnel_uids: new FormControl<string[]>([], Validators.required),
    });

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadSocietes('');
    }

    ngOnDestroy(): void {
        this.selectedFiles.forEach(pf => pf.previewUrl && URL.revokeObjectURL(pf.previewUrl));
    }

    // ── Sociétés ──────────────────────────────────────────────────────
    loadSocietes(code_societe: string = ''): void {
        this.loadingSocietes = true;
        this.dataSocietes = [];
        this.httService.getData(
            `${environment.api_url}auth/:savesociete?code_societe=${code_societe}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingSocietes = false;
                if (res.body.status || res.body.success) {
                    this.dataSocietes = (res.body.data || []).map((e: any) => ({
                        label: e?.raison_sociale ?? '',
                        value: e?.uid || e?.id,
                    })).filter((s: any) => s.value && s.label);
                }
            })
            .catch(() => {
                this.loadingSocietes = false;
            });
    }

    onSocieteChange(idsociete: string): void {
        // La société conditionne la liste du personnel
        this.validationForm.get('personnel_uids')?.setValue([]);
        this.dataPersonnel = [];
        if (idsociete) {
            this.loadPersonnel(idsociete);
        }
    }

    // ── Liste du personnel (personnel_uid = datapersonnel.uid) ────────
    loadPersonnel(idsociete: string = ''): void {
        this.loadingPersonnel = true;
        this.dataPersonnel = [];
        this.httService.getData(
            `${environment.api_url}auth/:liste-des-comptes?idsociete=${idsociete}&idpersonnel=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingPersonnel = false;
                if (res.body.status || res.body.success) {
                    this.dataPersonnel = (res.body.data || [])
                        .map((e: any) => ({
                            label: `${e?.datapersonnel?.nom || ''} ${e?.datapersonnel?.prenom || ''}`.trim(),
                            value: e?.datapersonnel?.uid || '',
                        }))
                        .filter((p: any) => p.value && p.label);
                }
            })
            .catch(() => {
                this.loadingPersonnel = false;
            });
    }

    // ── Sélection des fichiers (multiple) ─────────────────────────────
    onFilesSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.addFiles(input.files);
        // Réinitialise l'input pour autoriser une nouvelle sélection du même fichier
        input.value = '';
    }

    // ── Glisser-déposer ───────────────────────────────────────────────
    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;
        this.addFiles(event.dataTransfer?.files ?? null);
    }

    private addFiles(files: FileList | null): void {
        if (!files || !files.length) return;
        Array.from(files).forEach((file: File) => {
            const extension = (file.name.split('.').pop() || '').toLowerCase();
            const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(extension);
            const isPdf = extension === 'pdf';
            this.selectedFiles.push({
                file,
                name: file.name,
                previewUrl: URL.createObjectURL(file),
                isImage,
                isPdf,
                extension,
                sizeLabel: this.formatSize(file.size),
            });
        });
    }

    removeFileAt(index: number): void {
        const pf = this.selectedFiles[index];
        if (this.previewPf === pf) this.closePreview();
        if (pf?.previewUrl) URL.revokeObjectURL(pf.previewUrl);
        this.selectedFiles.splice(index, 1);
    }

    // ── Aperçu d'un fichier ───────────────────────────────────────────
    openPreview(pf: PreviewFile): void {
        this.previewPf = pf;
        // L'iframe (PDF) exige une URL de confiance
        this.previewSafeUrl = pf.isPdf
            ? this.sanitizer.bypassSecurityTrustResourceUrl(pf.previewUrl)
            : null;
    }

    closePreview(): void {
        this.previewPf = null;
        this.previewSafeUrl = null;
    }

    iconFor(extension: string): string {
        switch (extension) {
            case 'pdf': return 'fa-file-pdf';
            case 'doc':
            case 'docx': return 'fa-file-word';
            case 'xls':
            case 'xlsx': return 'fa-file-excel';
            case 'ppt':
            case 'pptx': return 'fa-file-powerpoint';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'webp':
            case 'bmp': return 'fa-file-image';
            default: return 'fa-file-lines';
        }
    }

    colorFor(extension: string): string {
        switch (extension) {
            case 'pdf': return '#E53E3E';
            case 'doc':
            case 'docx': return '#3182CE';
            case 'xls':
            case 'xlsx': return '#276749';
            case 'ppt':
            case 'pptx': return '#DD6B20';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'webp':
            case 'bmp': return '#805AD5';
            default: return '#64748B';
        }
    }

    private formatSize(bytes: number): string {
        if (!bytes) return '';
        const kb = bytes / 1024;
        return kb < 1024 ? `${kb.toFixed(0)} Ko` : `${(kb / 1024).toFixed(1)} Mo`;
    }

    // ── Enregistrement (personnel × fichiers) ─────────────────────────
    async submitForm(): Promise<void> {
        this.errorTexte = '';
        this.validationForm.markAllAsTouched();

        const personnels = this.validationForm.value.personnel_uids || [];
        if (!this.validationForm.valid || !personnels.length) {
            return;
        }
        if (!this.selectedFiles.length) {
            this.toast.warning('Veuillez joindre au moins un fichier.', 'Pièce jointe requise', {timeOut: 4000});
            return;
        }

        this.totalUploads = personnels.length * this.selectedFiles.length;
        this.doneUploads = 0;
        this.isSaving = true;

        const total = this.selectedFiles.length;
        const rows: { personnel: string; ok: number; total: number; failures: { fichier: string; raison: string }[] }[] = [];
        let totalOk = 0;
        let totalFail = 0;

        // Envoi séquentiel : un couple (personnel × fichier) à la fois
        for (const personnelUid of personnels) {
            const persoLabel = this.dataPersonnel.find(p => p.value === personnelUid)?.label || personnelUid;
            let pOk = 0;
            const pFailures: { fichier: string; raison: string }[] = [];

            for (const pf of this.selectedFiles) {
                try {
                    const res: any = await this.uploadOne(personnelUid, pf);
                    if (res?.body?.status || res?.body?.success) {
                        pOk++;
                    } else {
                        pFailures.push({fichier: pf.name, raison: res?.body?.message || 'Refusé par le serveur'});
                    }
                } catch (err: any) {
                    const raison = err?.error?.err?.message || err?.error?.message
                        || (err?.status ? `Erreur ${err.status}` : 'Erreur réseau');
                    pFailures.push({fichier: pf.name, raison});
                }
                this.doneUploads++;
            }

            totalOk += pOk;
            totalFail += pFailures.length;
            rows.push({personnel: persoLabel, ok: pOk, total, failures: pFailures});
        }

        this.isSaving = false;

        // Rapport final dans une popup
        this.reportRows = rows;
        this.reportOk = totalOk;
        this.reportFail = totalFail;
        this.showReport = true;

        if (totalFail) console.warn('Échecs save-fichier-personnel :', rows);
    }

    closeReport(): void {
        this.showReport = false;
        // Tout s'est bien passé → on réinitialise le formulaire
        if (this.reportFail === 0) this.resetForm();
    }

    initials(name: string): string {
        const parts = (name || '').trim().split(/\s+/).filter(Boolean);
        if (!parts.length) return '?';
        return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
    }

    private uploadOne(personnelUid: string, pf: PreviewFile): Promise<any> {
        const formData = new FormData();
        formData.append('action', '1');
        formData.append('uid_filepersonnel', '');
        formData.append('nom_fichiers', (pf.name || pf.file.name) ?? '');
        formData.append('piece_jointe', pf.file, pf.file.name);
        formData.append('idsociete', this.validationForm.value.societe_uid ?? '');
        formData.append('personnel_uid', personnelUid ?? '');
        formData.append('idcategorie_personnel', '');

        // Même canal que mes-doc : gateway chiffré + réponse déchiffrée par HttpService
        return this.httService.postDataMultipart(
            `${environment.api_url}auth/:save-fichier-personnel`,
            formData,
            this.users?.access_token || ''
        ).toPromise();
    }

    private resetForm(): void {
        this.validationForm.reset({societe_uid: '', personnel_uids: []});
        this.validationForm.markAsPristine();
        this.validationForm.markAsUntouched();
        this.closePreview();
        this.selectedFiles.forEach(pf => pf.previewUrl && URL.revokeObjectURL(pf.previewUrl));
        this.selectedFiles = [];
        this.dataPersonnel = [];
        this.errorTexte = '';
    }
}
