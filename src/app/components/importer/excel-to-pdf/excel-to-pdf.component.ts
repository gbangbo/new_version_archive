import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select2Module} from 'ng-select2-component';
import {NzSplitterModule} from 'ng-zorro-antd/splitter';
import {NzTreeSelectModule} from 'ng-zorro-antd/tree-select';
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
    ],
    templateUrl: './excel-to-pdf.component.html',
    styleUrl: './excel-to-pdf.component.scss',
})
export class ExcelToPdfComponent implements OnInit, AfterViewInit {
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
    isSaving = false;

    private workbook: XLSX.WorkBook | null = null;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
        private hostRef: ElementRef<HTMLElement>,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.showSites(this.users?.datasociete?.uid, '');
        this.showSerie('', '', '');
        this.showOrganigramme(this.users?.datasociete?.uid, '');
    }

    ngAfterViewInit(): void {
        // Après le rendu : la barre de fil d'Ariane n'a sa hauteur définitive
        // qu'une fois peinte.
        setTimeout(() => this.ajusterHauteurVolets());
    }

    @HostListener('window:resize')
    onRedimensionnement(): void {
        this.ajusterHauteurVolets();
    }

    // Les volets occupent ce qui reste sous l'en-tête, mesuré plutôt que
    // deviné : le calc(100vh - N) codé en dur laissait soit un ascenseur dans
    // le volet gauche, soit un débordement de la page entière selon l'écran.
    private ajusterHauteurVolets(): void {
        const volets = this.hostRef.nativeElement.querySelector('nz-splitter') as HTMLElement | null;
        if (!volets) return;

        // En dessous de 991px les volets s'empilent et se déroulent avec la page.
        if (window.innerWidth <= 991) {
            volets.style.removeProperty('height');
            return;
        }

        const haut = volets.getBoundingClientRect().top + window.scrollY;
        volets.style.height = `calc(100vh - ${Math.round(haut)}px - 16px)`;
    }

    // ── État du formulaire ────────────────────────────────────────

    // Ce qu'il reste à renseigner, libellés compris : le pied de page
    // l'annonce avant le clic plutôt que de laisser découvrir les erreurs
    // champ par champ après coup.
    get champsManquants(): string[] {
        const v = this.validationForm.value;
        const manque: string[] = [];
        if (!v.idcategories) manque.push('Série');
        if (!v.idtype_docs) manque.push('Type de document');
        if (!v.dataservices?.length) manque.push('Service bénéficiaire');
        if (!v.idsite) manque.push('Site');
        if (!v.idrayon) manque.push('Rayon');
        if (!v.idboites) manque.push("Boîte d'archivage");
        if (!this.selectedFile) manque.push('Fichier Excel');
        return manque;
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
        this.pageCourante = 1;
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
        this.pageCourante = 1;
    }

    // ── Pagination de l'aperçu ────────────────────────────────────
    // L'aperçu seul est paginé : l'import porte toujours sur la totalité des
    // lignes de la feuille, quelle que soit la page affichée.

    readonly taillePage = 50;
    pageCourante = 1;

    get nbPages(): number {
        return Math.max(1, Math.ceil(this.excelRows.length / this.taillePage));
    }

    get premiereLigne(): number {
        return (this.pageCourante - 1) * this.taillePage;
    }

    get lignesPage(): any[][] {
        return this.excelRows.slice(this.premiereLigne, this.premiereLigne + this.taillePage);
    }

    allerPage(page: number): void {
        this.pageCourante = Math.min(Math.max(1, page), this.nbPages);
    }

    // Fenêtre glissante : au-delà de sept pages, les numéros lointains sont
    // remplacés par des points de suspension plutôt que de déborder l'en-tête.
    get pagesAffichees(): (number | '…')[] {
        const total = this.nbPages;
        if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);

        const courante = this.pageCourante;
        const pages = new Set<number>([1, total, courante]);
        if (courante > 1) pages.add(courante - 1);
        if (courante < total) pages.add(courante + 1);
        if (courante <= 3) { pages.add(2); pages.add(3); pages.add(4); }
        if (courante >= total - 2) { pages.add(total - 1); pages.add(total - 2); pages.add(total - 3); }

        const triees = [...pages].filter(p => p >= 1 && p <= total).sort((a, b) => a - b);
        const sortie: (number | '…')[] = [];
        triees.forEach((p, i) => {
            if (i && p - triees[i - 1] > 1) sortie.push('…');
            sortie.push(p);
        });
        return sortie;
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

        const excelJson = this.excelRows.map(row =>
            Object.fromEntries(this.excelHeaders.map((h, i) => [h, row[i] ?? '']))
        );

        const proprietes_statics = excelJson.map(row => {
            const statics: any = {code_docs: '', date_docs: '', lib_docs: ''};
            const proprietes_dynamics: { proprietes_docs: string; value_proprietes_docs: any }[] = [];

            for (const [key, value] of Object.entries(row)) {
                const formatted = this.formatDateValue(value);
                const cle = this.normaliserEntete(key);

                if (ExcelToPdfComponent.CHAMPS_STATIQUES.includes(cle)) {
                    // Écrit sous le nom canonique attendu par l'API, quel que
                    // soit celui de la colonne du fichier.
                    statics[cle] = formatted;
                } else {
                    // Une propriété dynamique garde en revanche son intitulé
                    // d'origine : c'est lui que le serveur rapproche des
                    // propriétés déclarées sur le type de document.
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

        this.isSaving = true;
        this.httService.postData(`${environment.api_url}api/:importation-excel-pdf`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isSaving = false;
                if (res.body.status || res.body.success) {
                    // Import accepté : on repart d'un écran vierge. Sans ça,
                    // le formulaire et le fichier restaient en place et on
                    // pouvait réimporter les mêmes lignes sans s'en rendre compte.
                    this.resetForm();
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
                this.isSaving = false;
                Swal.fire({
                    title: err?.error?.err?.message || 'Une erreur est survenue !',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    // Les trois colonnes reprises telles quelles par l'API. Le reste du
    // fichier part en propriétés dynamiques.
    private static readonly CHAMPS_STATIQUES = ['code_docs', 'date_docs', 'lib_docs'];

    // Un en-tête saisi à la main s'écrit « Code_docs », « code docs »,
    // « date-docs » ou traîne une espace de fin. La comparaison stricte
    // d'avant les renvoyait tous dans les propriétés dynamiques et laissait
    // les trois champs statiques vides sans rien signaler. On compare donc sur
    // un nom normalisé : sans accent, sans casse, espaces, tirets et points
    // ramenés à un tiret bas.
    private normaliserEntete(nom: any): string {
        return (nom ?? '')
            .toString()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .trim()
            .toLowerCase()
            .replace(/[\s\-.]+/g, '_')
            .replace(/_+/g, '_');
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

    // Remet l'écran à son état d'ouverture : les champs, les listes filles des
    // cascades, le fichier et son aperçu, et l'état de validation (reset()
    // repasse les contrôles en « untouched », donc plus de messages rouges).
    resetForm() {
        this.validationForm.reset({
            idsite: '',
            idrayon: '',
            idboites: '',
            idcategories: '',
            idtype_docs: '',
            dataservices: [],
            statut_ocr: 0,
        });
        // Les listes filles sont rechargées par les cascades : on les vide pour
        // ne pas laisser les valeurs de l'import précédent.
        this.dataRayon = [];
        this.dataBoites = [];
        this.dataTypeDocument = [];
        this.removeFile();
    }
}
