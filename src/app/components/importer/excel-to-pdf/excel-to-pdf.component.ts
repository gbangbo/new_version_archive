import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select2Module} from 'ng-select2-component';
import {NzSplitterModule} from 'ng-zorro-antd/splitter';
import {NzTreeSelectModule} from 'ng-zorro-antd/tree-select';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {environment} from '../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";

@Component({
    selector: 'app-excel-to-pdf',
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        Select2Module, NzSplitterModule, NzTreeSelectModule,
        NzIconModule, NzTagModule,
    ],
    templateUrl: './excel-to-pdf.component.html',
    styleUrl: './excel-to-pdf.component.scss',
})
export class ExcelToPdfComponent implements OnInit {
    users: any = [];

    validationForm = new FormGroup({
        // Chaîne boîte
        idsite: new FormControl(''),
        idrayon: new FormControl(''),
        idboites: new FormControl('', Validators.required),
        // Chaîne type de document
        idcategories: new FormControl(''),
        idtype_docs: new FormControl('', Validators.required),
        // Autres
        dataservices: new FormControl<string[]>([], Validators.required),
        statut_ocr: new FormControl<number>(0),
    });

    // Données cascades boîte
    dataSites: any[] = [];
    dataRayon: any[] = [];
    dataBoites: any[] = [];

    // Données cascades type doc
    dataSeries: any[] = [];
    dataTypeDocument: any[] = [];

    // Services bénéficiaires
    dataOrg: any[] = [];

    // Loaders
    loadingSite = false;
    loadingRayon = false;
    loadingBoite = false;
    loadingSerie = false;
    loadingType = false;
    loadingOrg = false;

    // Fichier Excel
    selectedFile: File | null = null;
    excelSheets: string[] = [];
    activeSheet = '';
    excelHeaders: any[] = [];
    excelRows: any[][] = [];
    isDragOver = false;
    isReadingFile = false;

    private workbook: XLSX.WorkBook | null = null;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.showSites(this.users?.datasociete?.uid, '');
        this.showSerie('', '', '');
        this.showOrganigramme(this.users?.datasociete?.uid, '');
    }

    // ── Chaîne : Site → Rayon → Boîte ────────────────────────────

    showSites(idsociete: string, idsite: string) {
        this.loadingSite = true;
        this.dataSites = [];
        this.httService.getData(
            `${environment.api_url}api/:savesites?idsociete=${idsociete}&idsite=${idsite}`,
            false, this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingSite = false;
                if (res.body.status) {
                    this.dataSites = res.body.data.map((e: any) => ({label: e.libelle_sites, value: e.uid}));
                }
            })
            .catch(() => {
                this.loadingSite = false;
            });
    }

    changeSite(event: any) {
        this.dataRayon = [];
        this.dataBoites = [];
        this.validationForm.get('idrayon')?.setValue('');
        this.validationForm.get('idboites')?.setValue('');
        if (!event.value) return;
        this.showRayons(this.users?.datasociete?.uid, '', event.value);
    }

    showRayons(idsociete: string, idrayon: string, idsite: string) {
        this.loadingRayon = true;
        this.dataRayon = [];
        this.httService.getData(
            `${environment.api_url}api/:saverayons?idsociete=${idsociete}&idrayon=${idrayon}&idsite=${idsite}`,
            false, this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingRayon = false;
                if (res.body.status) {
                    this.dataRayon = res.body.data.map((e: any) => ({label: e.libelle_rayon, value: e.uid}));
                }
            })
            .catch(() => {
                this.loadingRayon = false;
            });
    }

    changeRayon(event: any) {
        this.dataBoites = [];
        this.validationForm.get('idboites')?.setValue('');
        if (!event.value) return;
        this.showBoites(this.users?.datasociete?.uid, event.value, '');
    }

    showBoites(idsociete: string, idrayon: string, idsite: string) {
        this.loadingBoite = true;
        this.dataBoites = [];
        this.httService.getData(
            `${environment.api_url}api/:saveboites?idsociete=${idsociete}&idrayon=${idrayon}&idsite=${idsite}`,
            false, this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingBoite = false;
                if (res.body.status) {
                    this.dataBoites = res.body.data.map((e: any) => ({label: e.code_boites, value: e.uid}));
                }
            })
            .catch(() => {
                this.loadingBoite = false;
            });
    }

    // ── Chaîne : Série → Type de document ────────────────────────

    showSerie(idsociete: string, idtype_document: string, idcategories: string) {
        this.loadingSerie = true;
        this.dataSeries = [];
        this.httService.getData(
            `${environment.api_url}api/:save-categorie-plan-classement?idsociete=${idsociete}&idtype_document=${idtype_document}&idcategories=${idcategories}`,
            false, this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingSerie = false;
                if (res.body.status || res.body.success) {
                    this.dataSeries = res.body.data.map((e: any) => ({
                        label: `${e.code_categories || ''}${e.code_categories ? ' - ' : ''}${e.name_categories}`,
                        value: e.uid,
                    }));
                }
            })
            .catch(() => {
                this.loadingSerie = false;
            });
    }

    selectSerie(event: any) {
        this.dataTypeDocument = [];
        this.validationForm.get('idtype_docs')?.setValue('');
        if (!event.value) return;
        this.showTypeDoc('', '', event.value);
    }

    showTypeDoc(idsociete: string, idtype_document: string, idcategories: string) {
        this.loadingType = true;
        this.dataTypeDocument = [];
        this.httService.getData(
            `${environment.api_url}api/:categories-type-documents?idsociete=${idsociete}&idtype_document=${idtype_document}&idcategories=${idcategories}`,
            false, this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingType = false;
                if (res.body.status) {
                    this.dataTypeDocument = res.body.data[0].children.map((d: any) => ({
                        ...d.datastype_document,
                        label: d.datastype_document.libelle_type_docs,
                        value: d.datastype_document.uid,
                    }));
                }
            })
            .catch(() => {
                this.loadingType = false;
            });
    }

    // ── Organigramme ──────────────────────────────────────────────

    showOrganigramme(idsociete: string, niveau: string) {
        this.loadingOrg = true;
        this.dataOrg = [];
        this.httService.getData(
            `${environment.api_url}auth/:save-service-organigramme?societe=${idsociete}&niveau=${niveau}`,
            false, this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingOrg = false;
                if (res.body.status || res.body.success) {
                    this.dataOrg = res.body.data.map((e: any, i: number) => this.formatNode(e, i === 0));
                }
            })
            .catch(() => {
                this.loadingOrg = false;
            });
    }

    formatNode(node: any, isFirstNode = false): any {
        return {
            title: node.libelle,
            key: node.uid,
            expanded: isFirstNode,
            isLeaf: !node.children || node.children.length === 0,
            children: node.children?.map((c: any) => this.formatNode(c)) || [],
        };
    }

    // ── OCR toggle ────────────────────────────────────────────────

    toggleOcr(event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        this.validationForm.get('statut_ocr')?.setValue(checked ? 1 : 0);
    }

    // ── Dropzone ──────────────────────────────────────────────────

    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.isDragOver = true;
    }

    onDragLeave() {
        this.isDragOver = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.isDragOver = false;
        const file = event.dataTransfer?.files[0];
        if (file) this.processFile(file);
    }

    onFileInput(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) this.processFile(file);
        (event.target as HTMLInputElement).value = '';
    }

    processFile(file: File) {
        if (!/\.(xls|xlsx)$/i.test(file.name)) {
            this.toast.error('Seuls les fichiers Excel (.xls, .xlsx) sont acceptés.', '', {
                positionClass: 'toast-top-right', closeButton: true, timeOut: 3000,
            });
            return;
        }
        this.selectedFile = file;
        this.readExcel(file);
    }

    readExcel(file: File) {
        this.isReadingFile = true;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = new Uint8Array(e.target.result);
            this.workbook = XLSX.read(data, {type: 'array', cellDates: true});
            this.excelSheets = this.workbook.SheetNames;
            this.activeSheet = this.workbook.SheetNames[0];
            this.loadSheet(this.activeSheet);
            this.isReadingFile = false;
        };
        reader.readAsArrayBuffer(file);
    }

    loadSheet(sheetName: string) {
        if (!this.workbook) return;
        const sheet = this.workbook.Sheets[sheetName];
        const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {header: 1}) as any[][];
        this.excelHeaders = rows.length > 0 ? (rows[0] as any[]) : [];
        this.excelRows = rows.length > 1
            ? rows.slice(1)
                .map(row => row.map((cell: any) => this.formatDateValue(cell)))
                .filter(row => row.some(cell => cell !== '' && cell !== null && cell !== undefined))
            : [];
    }

    selectSheet(sheet: string) {
        this.activeSheet = sheet;
        this.loadSheet(sheet);
    }

    removeFile() {
        this.selectedFile = null;
        this.workbook = null;
        this.excelSheets = [];
        this.activeSheet = '';
        this.excelHeaders = [];
        this.excelRows = [];
    }

    // ── Submit / Reset ────────────────────────────────────────────

    submitForm() {
        this.validationForm.markAllAsTouched();
        if (!this.validationForm.valid) return;
        if (!this.selectedFile) {
            this.toast.warning('Veuillez importer un fichier Excel.', '', {
                positionClass: 'toast-top-right', closeButton: true, timeOut: 3000,
            });
            return;
        }

        const staticFields = ['code_docs', 'date_docs', 'lib_docs'];

        const excelJson = this.excelRows.map(row =>
            Object.fromEntries(this.excelHeaders.map((h, i) => [h, row[i] ?? '']))
        );

        const proprietes_statics = excelJson.map(row => {
            const statics: any = {code_docs: '', date_docs: '', lib_docs: ''};
            const proprietes_dynamics: { proprietes_docs: string; value_proprietes_docs: any }[] = [];

            for (const [key, value] of Object.entries(row)) {
                const formatted = this.formatDateValue(value);
                if (staticFields.includes(key)) {
                    statics[key] = formatted;
                } else {
                    proprietes_dynamics.push({proprietes_docs: key, value_proprietes_docs: formatted});
                }
            }

            return {...statics, proprietes_dynamics};
        });

        const payload = {
            idsociete: this.users.datasociete.uid,
            iduser: this.users.uid,
            idboites: this.validationForm.value.idboites,
            idtype_docs: this.validationForm.value.idtype_docs,
            proprietes_statics,
            dataservices: this.setTranformer(this.validationForm.value.dataservices),
            statut_ocr: this.validationForm.value.statut_ocr,
        };
        console.log('Payload:', JSON.stringify(payload, null, 2));
        //  this.isloading = true;
        this.httService.postData(`${environment.api_url}api/:importation-excel-pdf`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                //  this.isloading = false;
                console.log("res.body ===", res.body)
                if (res.body.status || res.body.success) {
                    //  this.resetAfterSave();
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch((err: any) => {
                // this.isloading = false;
                console.log("err", err)
                Swal.fire({
                    title: err?.error?.err?.message || 'Une erreur est survenue !',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    private formatDateValue(value: any): any {
        if (value instanceof Date && !isNaN(value.getTime())) {
            const y = value.getFullYear();
            const m = String(value.getMonth() + 1).padStart(2, '0');
            const d = String(value.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        }
        return value;
    }

    setTranformer(e: any) {
        if (!e || !e.length) return [];
        return e.map((e: string) => ({
            "idservices": e
        }))
    }

    resetForm() {
        this.validationForm.reset({statut_ocr: 0});
        this.dataRayon = [];
        this.dataBoites = [];
        this.dataTypeDocument = [];
        this.removeFile();
    }
}
