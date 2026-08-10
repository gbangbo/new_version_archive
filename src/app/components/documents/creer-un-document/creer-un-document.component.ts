import {Component, ViewChild, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Select2Data, Select2Module} from "ng-select2-component";
import {DropzoneConfigInterface, DropzoneModule, DropzoneDirective} from "ngx-dropzone-wrapper";
import {Editor, NgxEditorModule} from "ngx-editor";
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {addBlogCategory, blogType} from '../../../shared/data/blog';
import {DropzoneComponent} from 'ngx-dropzone-wrapper';
import {environment} from "../../../../environments/environment";
import {Authorization} from "../../../protect/authorization.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpService} from "../../../core/http.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NzSplitterModule} from 'ng-zorro-antd/splitter';
import {NzTreeFlatDataSource, NzTreeFlattener, NzTreeViewModule} from 'ng-zorro-antd/tree-view';
import {NzIconModule} from 'ng-zorro-antd/icon';

import Dropzone from 'dropzone';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';

import * as pdfjsLib from 'pdfjs-dist';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "@danielmoncada/angular-datetime-picker";
import {TreeNode} from "../../configuration/plan-de-classement/tree-node.model";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";
import {SvgIconComponent} from "../../../shared/components/ui/svg-icon/svg-icon.component";
import Swal from 'sweetalert2';
import moment from "moment";
import {decryptData} from "../../../config/config";
import {HistoLogService} from "../../../shared/services/histo-log.service";
// Désactiver l'auto-découverte AU NIVEAU MODULE (en dehors de la classe)
Dropzone.autoDiscover = false;

interface FoodNode {
    name: string;
    key?: string;
    url_file?: string;
    extension?: string;
    desc_ocr_text?: string;
    nombre_page?: string;
    uid?: string;
    iduser_save?: string;
    password_file?: string;
    disabled?: boolean;
    isFile?: boolean;
    children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
    {
        name: 'Fichiers',
        children: [
            {
                name: 'Apple',
                extension: ''
            },
            {
                name: 'Banana',
                extension: ''
            },
            {
                name: 'Fruit loops',
                extension: ''
            }

        ]
    }
];
const TREE_DATAA: TreeNode[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    key: string;
    extension: string;
    url_file: string;
    desc_ocr_text: string;
    nombre_page: string;
    uid: string;
    iduser_save: string;
    password_file: string;
    level: number;
    disabled: boolean;
    isFile: boolean;
}

@Component({
    selector: 'app-creer-un-document',
    imports: [CommonModule, Select2Module,
        DropzoneModule,
        NgxEditorModule,
        CardComponent,
        NzSplitterModule,
        NzIconModule,
        NzTreeViewModule,
        ReactiveFormsModule,
        FormsModule,
        NzSelectModule,
        NzToolTipModule,
        NzDatePickerModule, OwlDateTimeModule,
        OwlNativeDateTimeModule, NzTagModule, NzPopoverModule, NzTreeSelectModule, SvgIconComponent
    ],
    templateUrl: './creer-un-document.component.html',
    styleUrl: './creer-un-document.component.scss',
})
export class CreerUnDocumentComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(DropzoneDirective, {static: false}) dropzoneDirective: DropzoneDirective;
    @ViewChild('viewerContainer', {static: false}) viewerContainer!: ElementRef;
    @ViewChild('pdfCanvas', {static: false}) pdfCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('pdfWrapper', {static: false}) pdfWrapper!: ElementRef<HTMLDivElement>;


    public currentYear: number = new Date().getFullYear();
    public addBlogCategory: Select2Data = addBlogCategory;
    public blogType = blogType;
    public text = `
    <div class="dz-message needsclick">
<!--      <i data-feather="upload"></i>-->
      <i class="icofont icofont-upload-alt"></i>
<!--      <i class="fa-solid fa-cloud-arrow-up fa-fade"></i>-->
      <h6>Glisser-déposez vos fichiers ici</h6>
      <span class="note needsclick">ou cliquez pour parcourir(<strong>PDF, Image, Documents</strong>)</span>
    </div>`;
    users: any = [];
    // AJOUTER CETTE LIGNE - Déclaration de la propriété
    private dropzoneInstance: Dropzone | null = null;
    public config: any = {
        url: '/api/saveuploadfile-temps', // ⚠️ AJOUTER VOTRE URL ICI
        maxFilesize: 10,
        acceptedFiles: '.pdf,.jpg,.png,.doc,.docx',
        addRemoveLinks: true,
        dictDefaultMessage: 'Glissez-déposez vos fichiers ici ou cliquez pour parcourir',
        autoProcessQueue: true,
        clickable: true, // L'utilisateur peut cliquer pour ouvrir l'explorateur
        // IMPORTANT: Empêcher l'ouverture automatique
        autoQueue: true,
        parallelUploads: 1,
        maxFiles: 1,
        uploadMultiple: false
    };
    config2: DropzoneConfigInterface = {
        url: `${environment.api_url}api/:saveuploadfile-temps`,
        // url: `${environment.api_url}api/saveuploadfile-temps`,
        // url: `${environment.api_url}/api/saveuploadfile-temps`,
        maxFilesize: 50,
        acceptedFiles: '.pdf,.PDF,.jpg,.jpeg,.JPG,.png,.PNG,.doc,.docx',
        addRemoveLinks: true,
        autoProcessQueue: true,
        clickable: true,
        maxFiles: 50,
        parallelUploads: 1,
        uploadMultiple: false,
        //     previewTemplate: `
        //   <div class="dz-preview dz-file-preview">
        //     <div class="dz-details">
        //       <div class="dz-filename"><span data-dz-name></span></div>
        //       <div class="dz-size" data-dz-size></div>
        //     </div>
        //     <div class="dz-progress">
        //       <span class="dz-upload" data-dz-uploadprogress></span>
        //     </div>
        //     <div class="dz-success-mark"><span>✓</span></div>
        //     <div class="dz-error-mark"><span>✗</span></div>
        //     <div class="dz-error-message"><span data-dz-errormessage></span></div>
        //   </div>
        // `

        dictRemoveFile: '✕ Supprimer',
        // ou
        // dictRemoveFile: '✕ Retirer',
        // dictRemoveFile: '🗑️ Effacer',

        // Texte pour annuler l'upload
        dictCancelUpload: 'Annuler',

        // Message par défaut
        // dictDefaultMessage: 'Glissez-déposez vos fichiers ici ou cliquez pour parcourir',

        // Message quand un fichier est invalide
        dictInvalidFileType: 'Type de fichier non autorisé',

        // Message quand le fichier est trop gros
        dictFileTooBig: 'Fichier trop volumineux ({{filesize}}MB). Taille max: {{maxFilesize}}MB',

        // Message quand on dépasse le nombre max de fichiers
        dictMaxFilesExceeded: 'Vous ne pouvez pas télécharger plus de fichiers',

        // Texte de réponse du serveur
        dictResponseError: 'Erreur du serveur: {{statusCode}}',

        // Texte pour annuler les uploads
        dictCancelUploadConfirmation: 'Voulez-vous vraiment annuler cet upload ?',

        // Texte pour supprimer tous les fichiers
        // dictRemoveFileConfirmation: null, // null = pas de confirmation
        // ou pour demander confirmation :
        // dictRemoveFileConfirmation: 'Êtes-vous sûr de vouloir supprimer ce fichier ?',

        // Message de fallback pour anciens navigateurs
        dictFallbackMessage: 'Votre navigateur ne supporte pas le drag & drop',

        // Texte pendant l'upload
        dictUploadCanceled: 'Upload annulé',
    };
    // DropzoneConfigInterface = {
    //     url: '/api/saveuploadfile-temps',
    //     addRemoveLinks: true,
    //     // params: {
    //     //     userId: 123,
    //     //     dossier: "TEMP",
    //     //     type: "pdf"
    //     // },
    //     maxFiles: 1,
    //     maxFilesize: 10,
    //     acceptedFiles: '.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, image/*',
    //     dictRemoveFile: 'Supprimer ce fichier',
    //     parallelUploads: 1,
    //     autoProcessQueue: true,
    //     previewTemplate: `
    //   <div class="dz-preview dz-file-preview">
    //     <div class="dz-image"><img data-dz-thumbnail /></div>
    //     <div class="dz-details">
    //       <div class="dz-size" data-dz-size></div>
    //       <div class="dz-filename"><span data-dz-name></span></div>
    //     </div>
    //     <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
    //     <div class="dz-error-message"><span data-dz-errormessage></span></div>
    //     <div class="dz-success-mark"><span>✓</span></div>
    //     <div class="dz-error-mark"><span>✘</span></div>
    //   </div>`,
    //     headers: {
    //         Authorization: `Bearer ${this.users?.access_token}`,
    //     },
    //     init: function () {
    //
    //     }
    // };
    // Variables pour le progress
    isUploading: boolean = false;
    uploadProgress: number = 0;
    currentFileName: string = '';
    totalFiles: number = 0;
    uploadedFiles: number = 0;

    public editor: Editor;
    public editor2: Editor;
    dataFileTemps: any = [];
    isloading: boolean = false;
    isLoadingPreview: boolean = false;
    private officeLoaderTimer: any = null;
    private readonly OFFICE_EXTENSIONS = ['doc', 'docx', 'xls', 'xlsx'];

    // ── État du viewer PDF ───────────────────────────────────────
    pdfDoc: any = null;
    currentPage = 1;
    totalPages = 0;
    pdfScale = 1.0;
    pdfRotation = 0;
    isRenderingPdf = false;
    currentPageInput = 1;
    idcategorie: string = 'i';

    // ── État du viewer Office ────────────────────────────────────
    officeZoom: number = 1.0;

    // ── État du viewer Image ─────────────────────────────────────
    imageZoom: number = 1.0;
    imageRotation: number = 0;

    get pdfZoomLabel(): string {
        return Math.round(this.pdfScale * 100) + '%';
    }

    get officeZoomLabel(): string {
        return Math.round(this.officeZoom * 100) + '%';
    }

    get imageZoomLabel(): string {
        return Math.round(this.imageZoom * 100) + '%';
    }

    private transformer = (node: FoodNode, level: number): ExampleFlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        key: (node as any)?.key || node?.uid || '',
        extension: node?.extension || '',
        url_file: node?.url_file || '',
        desc_ocr_text: node?.desc_ocr_text || '',
        nombre_page: node?.nombre_page || '',
        password_file: node?.password_file || '',
        uid: node?.uid || '',
        iduser_save: node?.iduser_save || '',
        isFile: node?.isFile || false,
        level,
        disabled: !!node.disabled
    });

    selectListSelection = new SelectionModel<ExampleFlatNode>();

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level,
        node => node.expandable
    );

    treeFlattener = new NzTreeFlattener(
        this.transformer,
        node => node.level,
        node => node.expandable,
        node => node.children
    );

    dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);
    selectedFile: any = null;

    // ── Prévisualisation Office ───────────────────────────────────
    officePreviewUrl: SafeResourceUrl | null = null;

    // ── Drag & Drop ──────────────────────────────────────────────
    private cleanTreeData: any[] = [];
    fileAssignments = new Map<string, string>(); // fileUid → folderKey
    draggedFileNode: ExampleFlatNode | null = null;
    dropTargetKey: string | null = null;


    /*

     */

    archiveStatus: string = 'courante';
    documentStatus: string = 'privee';
    applyOCR: boolean = false;
    dateInputDisplay: string = '';
    notifyBeneficiary: boolean = false;
    assignProprietaires: boolean = false;
    proprietairesCollapsed: boolean = false;  // repli de l'accordéon (sans désélectionner)
    dataSocietes: any[] = [];
    loadingSocietes: boolean = false;
    selectedSociete: string = '';
    dataComptes: any[] = [];
    loadingComptes: boolean = false;
    selectedProprietaires: string[] = [];
    dataTypeDocument: any = [];
    ligneTypeOfDoc: any = [];
    uidTypeDocument: string = '';
    dynamicValues: { [key: string]: any } = {};
    treeData: any[] = [];

    validationForm = new FormGroup({
        idtype_docs: new FormControl('', Validators.required),
        idboites: new FormControl('',),
        code_docs: new FormControl('', Validators.required),
        lib_docs: new FormControl('', Validators.required),
        date_docs: new FormControl<Date | null>(null, Validators.required),
        publishe: new FormControl<number>(0, Validators.required),
        typeArchivage: new FormControl('courante', Validators.required),
        idrayon: new FormControl('',),
        idsite: new FormControl('',),
        date_sig: new FormControl('',),
        dataservices: new FormControl('',),
        desc_docs: new FormControl('',),
        iddocuments: new FormControl('',),
        etat_docs: new FormControl('',),
        active_docs: new FormControl('',),
        region: new FormControl('',),
        departement: new FormControl('',),
        statut_docs: new FormControl('',),
        fulltexts_docs: new FormControl('',),
        idproprietaire: new FormControl('',),
        sendmail: new FormControl<boolean>(false),
        idcategories: new FormControl('',),
    })
    isSaving: boolean = false;
    isDeleting: boolean = false;   // suppression d'un fichier en cours
    isEdit: boolean = false;   // mode modification d'un document existant
    loadingType: boolean = false;
    loadingService: boolean = false;
    isGeneratingCode: boolean = false;
    loadingBoite: boolean = false;
    dataServices: any;


    value: string[] = ['0-0-0'];
    dataOrg: any = [];
    dataRayon: any = [];
    dataBoites: any = [];
    isload: boolean = false;
    isloadSerie: boolean = false;
    dataSites: any = [];
    dataSeries: any = [];

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService,
                private router: Router,
                private toast: ToastrService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer,
                private histoLog: HistoLogService) {
        //  this.dataSource.setData(TREE_DATA);

    }

    ngOnInit(): void {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
        // Masque le pied de page global sur cet écran (l'info est reprise dans la barre d'actions)
        document.body.classList.add('hide-app-footer');
        this.editor = new Editor();
        this.editor2 = new Editor();
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();

        // En modification, on charge les pièces du document (pas la zone temporaire)
        const editDoc = this.autor.getEditDoc();
        if (!editDoc) {
            this.loadFileTemps(this.users?.datasociete?.uid, this.users?.uid);
        }
        //  this.showTypeDoc(this.users?.datasociete?.uid, '');
        this.showOrganigramme(this.users?.datasociete?.uid, '');
        this.showSites(this.users?.datasociete?.uid, '');
        this.showSerie('', '', '');
        // Forcer la mise à jour de l'icône dossier à chaque toggle
        this.treeControl.expansionModel.changed.subscribe(() => setTimeout(() => this.cdr.detectChanges(), 0));

        // ── Mode modification : document déposé par l'action "Modifier" ──
        if (editDoc) {
            this.autor.clearEditDoc();
            this.hydrateForEdit(editDoc);
        }
    }

    /* Pré-remplit le formulaire à partir d'un document existant */
    private async hydrateForEdit(doc: any): Promise<void> {
        this.isEdit = true;

        // Type d'archivage selon la présence d'une boîte
        const hasBoite = !!doc?.databoites?.uid;
        this.validationForm.get('typeArchivage')?.setValue(hasBoite ? 'definitive' : 'courante');

        // Statut : privé (0) / public (1) / confidentiel (2)
        this.documentStatus = this.codeToStatut(doc?.publishe);

        // Champs scalaires
        this.validationForm.patchValue({
            iddocuments: doc?.uid || '',
            code_docs: doc?.code_docs || '',
            lib_docs: doc?.lib_docs || doc?.lib_document || '',
            desc_docs: doc?.desc_docs || '',
            date_docs: doc?.date_docs ? new Date(doc.date_docs) : null,
            publishe: this.statutToCode(this.documentStatus),
            idcategories: doc?.datacategories?.uid || '',
        });

        // Boîte (si archivage définitif) : on injecte l'option pour l'afficher
        if (hasBoite) {
            this.dataBoites = [{label: doc.databoites.code_boites, value: doc.databoites.uid}];
            this.validationForm.get('idboites')?.setValue(doc.databoites.uid);
        }

        // Services bénéficiaires
        const services = (doc?.dataservices || []).map((s: any) => s?.uid).filter((v: any) => v);
        if (services.length) {
            this.validationForm.get('dataservices')?.setValue(services);
        }

        // Pièces déjà attachées au document (remplacent la zone temporaire)
        await this.loadDocumentPieces(doc?.uid || '');

        // Type de document : charger les types de la catégorie puis appliquer
        const catUid = doc?.datacategories?.uid || '';
        const typeUid = doc?.datatype_document?.[0]?.uid || '';
        if (catUid && typeUid) {
            await this.showTypeDoc('', '', catUid);
            this.validationForm.get('idtype_docs')?.setValue(typeUid);
            this.changeType({value: typeUid});   // déclenche showCatOrder → rebuildTreeWithFiles
            this.prefillProprietes(doc);
        }

        this.cdr.detectChanges();
    }

    /* Nettoie le nom d'une pièce : retire l'éventuelle URL/query et
       l'extension en double (le gabarit rajoute déjà « .ext ») */
    private cleanPieceName(rawName: string, ext: string): string {
        if (!rawName) return '';
        let base = rawName.split('?')[0].split('#')[0];
        base = base.substring(base.lastIndexOf('/') + 1);
        if (ext && base.toLowerCase().endsWith('.' + ext.toLowerCase())) {
            base = base.slice(0, -(ext.length + 1));
        }
        return base;
    }

    /* Charge les pièces existantes d'un document et les met au format attendu
       par l'arbre de classement (dataFileTemps) */
    private async loadDocumentPieces(iddocuments: string): Promise<void> {
        if (!iddocuments) return;
        const iduser = this.users?.uid || '';
        this.isloading = true;
        try {
            const res: any = await this.httService.getData(
                `${environment.api_url}api/:consultation-pieces-documents?iduser=${iduser}&iddocuments=${iddocuments}`,
                false,
                this.users?.access_token || ''
            ).toPromise();
            this.isloading = false;
            if (res.body.status || res.body.success) {
                this.dataFileTemps = (res.body.data || []).map((d: any) => {
                    const url = d.url_file || d.lib_file_temp || d.file || '';
                    const ext = (d.extension || this.getFileExtension(url) || '').toLowerCase();
                    const rawName = d.name_piece_docs || d.name_file_docs || d.name || '';
                    return {
                        uid: d.uid,
                        name_file_docs: this.cleanPieceName(rawName, ext),
                        lib_file_temp: url,
                        url_file: url,
                        extension: ext,
                        desc_ocr_text: d.desc_ocr_text || '',
                        nombre_page: d.nombre_page || '',
                        password_file: d.password_file || '',
                        iduser_save: d.iduser_save || '',
                        datacats: d.datacats || null,
                    };
                });
                this.fileAssignments.clear();
                if (this.cleanTreeData.length > 0) {
                    this.rebuildTreeWithFiles();
                }
            }
        } catch {
            this.isloading = false;
        }
    }

    /* Reporte les valeurs des propriétés dynamiques du document sur le formulaire */
    private prefillProprietes(doc: any): void {
        const saved = doc?.proprietes_docs || doc?.dataproprietes_docs || doc?.dataproprietes || [];
        if (!this.ligneTypeOfDoc?.dataPro?.length || !saved?.length) return;
        this.ligneTypeOfDoc.dataPro.forEach((p: any) => {
            const match = saved.find((s: any) =>
                s?.idproprietes_docs === p.uid || s?.uid === p.uid || s?.iduid === p.uid);
            if (match) {
                p.value_proprietes_docs = match.value_proprietes_docs ?? match.value ?? '';
            }
        });
    }

    hasChild = (_: number, node: ExampleFlatNode): boolean => node.expandable;
    isFile = (_: number, node: ExampleFlatNode): boolean => node.isFile || !!node.extension;


    getNode(name: string): ExampleFlatNode | null {
        return this.treeControl.dataNodes.find(n => n.name === name) || null;
    }

    initDropzone() {
        const element = document.getElementById("multiFileUpload");
        if (!element) {
            console.error("Élément avec l'ID 'multiFileUpload' introuvable");
            return;
        }

        //   console.log("Élément trouvé, initialisation de Dropzone");

        // Détruire l'instance existante si elle existe
        if ((element as any).dropzone) {
            (element as any).dropzone.destroy();
        }

        this.dropzoneInstance = new Dropzone("#multiFileUpload", this.config);

        // Événement 'addedfile' - quand un fichier est ajouté
        this.dropzoneInstance.on("addedfile", (file: any) => {
            // console.log("Fichier ajouté:", file.name);
        });

        // Événement 'sending'
        this.dropzoneInstance.on("sending", (file: any, xhr: any, formData: any) => {

            if (this.users && this.users.datasociete && this.users.uid) {
                formData.append("action", 1);
                formData.append("idsociete", this.users.datasociete.uid);
                formData.append("idcategorie ", this.idcategorie);
                formData.append("token", `Bearer ${this.users?.access_token}`);
                formData.append("iduser_file_temp", this.users.uid);
                formData.append("statut_ocr", 1);
                formData.append("idfile_temp", "");
                formData.append("lib_file_temp", "Fichier de Build__1");
                formData.append("date", new Date().toISOString());
            } else {
                // console.error("Les données utilisateur ne sont pas disponibles !");
            }
        });

        // Événement 'success'
        this.dropzoneInstance.on("success", (file: any, response: any) => {
            // console.log("Upload réussi:", file.name, response);
            // NE PAS ouvrir l'explorateur ici !
        });

        // Événement 'complete' - après l'upload (succès ou échec)
        this.dropzoneInstance.on("complete", (file: any) => {
            // console.log("Upload terminé:", file.name);
            // NE PAS ouvrir l'explorateur ici !
        });

        // Événement 'queuecomplete' - quand tous les uploads sont terminés
        this.dropzoneInstance.on("queuecomplete", () => {
            //  console.log("Tous les uploads sont terminés");
            // NE PAS ouvrir l'explorateur ici !
        });

        this.dropzoneInstance.on("error", (file: any, errorMessage: any) => {
            console.error("Erreur d'upload:", errorMessage);
        });
    }


    ngAfterViewInit(): void {
        // 1. Désactiver l'auto-découverte de Dropzone (à faire UNE SEULE FOIS au début de votre app)
        Dropzone.autoDiscover = false;

// Attendre que la vue soit complètement chargée
        setTimeout(() => {
            //this.initDropzone();
        }, 0);


        // if (this.dropzoneDirective) {
        //     const dropzone = this.dropzoneDirective.dropzone();
        //
        //     dropzone.on('addedfile', (file: any) => {
        //         console.log('Fichier ajouté:', file);
        //         if (file.type === 'application/pdf') {
        //             const pdfIcon = '<img src="path_to_pdf_icon.png" alt="PDF Icon" />';
        //             file.previewElement.querySelector('.dz-image').innerHTML = pdfIcon;
        //         }
        //     });
        //
        //     dropzone.on('error', (file: any, message: any) => {
        //         console.log('Erreur sur le fichier:', file, message);
        //     });
        //
        //     dropzone.on('thumbnail', (file: any, dataUrl: string) => {
        //         if (file.type.startsWith('image/')) {
        //             file.previewElement.querySelector('img').src = dataUrl;
        //         } else if (file.type === 'application/pdf') {
        //             file.previewElement.querySelector('.dz-image').innerHTML = `<img src="path_to_pdf_icon.png" alt="PDF Icon" />`;
        //         } else {
        //             file.previewElement.querySelector('.dz-image').innerHTML = `<img src="path_to_generic_file_icon.png" alt="Fichier Icon" />`;
        //         }
        //     });
        // } else {
        //     console.warn('DropzoneDirective est introuvable. Vérifie ton template HTML.');
        // }

        // setTimeout(() => {
        //     this.treeControl.expand(this.getNode('Fichiers')!);
        // }, 300);

    }

    ngOnDestroy(): void {
        // Rétablit le pied de page global en quittant l'écran
        document.body.classList.remove('hide-app-footer');
        this.editor.destroy();
        this.editor2.destroy();
        // ou componentWillUnmount() ou onUnmounted()
        const element = document.getElementById("multiFileUpload");
        if (element?.dropzone) {
            element.dropzone.destroy();
        }
    }

    loadFileTemps(idsociete: string = '', iduser_file_temp: string = '') {
        this.isloading = true;
        this.dataFileTemps = [];
        this.httService.getData(`${environment.api_url}api/:saveuploadfile-temps?idsociete=${idsociete}&iduser_file_temp=${iduser_file_temp}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataFileTemps = res.body.data;
                    console.log("File temps ====", res.body.data)
                    // datacats de l'API est désormais la source de vérité : on purge les overrides locaux
                    this.fileAssignments.clear();
                    if (this.cleanTreeData.length > 0) {
                        this.rebuildTreeWithFiles();
                    }
                }
            })
            .catch((err) => {
                this.isloading = false;
            });
    }

    private mapFilesToTreeNodes(): any[] {
        return (this.dataFileTemps || []).map((d: any) => ({
            name: d.name_file_docs,
            key: d.uid,
            uid: d.uid,
            url_file: d.url_file,
            extension: (d.extension || this.getFileExtension(d?.lib_file_temp) || '').toLowerCase(),
            desc_ocr_text: d.desc_ocr_text,
            nombre_page: d.nombre_page,
            password_file: d.password_file,
            iduser_save: d.iduser_save,
            datacats: d.datacats || null,
            isFile: true,
            disabled: false,
            children: undefined
        }));
    }

    // ── Drag & Drop handlers ──────────────────────────────────────

    onFileDragStart(event: DragEvent, node: ExampleFlatNode) {
        this.draggedFileNode = node;
        event.dataTransfer!.effectAllowed = 'move';
        event.dataTransfer!.setData('text/plain', node.uid);
    }

    onDragEnd() {
        this.draggedFileNode = null;
        this.dropTargetKey = null;
    }

    onFolderDragOver(event: DragEvent, folderKey: string) {
        if (!this.draggedFileNode || !folderKey) return;
        event.preventDefault();
        event.dataTransfer!.dropEffect = 'move';
        this.dropTargetKey = folderKey;
    }

    onFolderDragLeave(event: DragEvent) {
        const target = event.currentTarget as HTMLElement;
        const related = event.relatedTarget as HTMLElement;
        if (!target.contains(related)) {
            this.dropTargetKey = null;
        }
    }

    onFolderDrop(event: DragEvent, folderKey: string) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.draggedFileNode || !folderKey) return;

        // Capture synchrone : dragend se déclenche avant la réponse API et met draggedFileNode à null
        const draggedUid = this.draggedFileNode.uid;
        this.draggedFileNode = null;
        this.dropTargetKey = null;

        const formData = new FormData();
        formData.append('action', '2');
        formData.append('idfile_temp', draggedUid ?? '');
        formData.append('idcategorie', folderKey ?? '');
        formData.append('idsociete', this.users?.datasociete?.uid ?? '');

        this.httService
            .postDataMultipart(`${environment.api_url}api/:saveuploadfile-temps`, formData, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.fileAssignments.set(draggedUid, folderKey);
                    this.rebuildTreeWithFiles();
                    this.toast.success('Fichier rangé avec succès.', 'Succès');
                } else {
                    this.toast.error(res.body.message || 'Erreur lors du déplacement.', 'Erreur');
                }
            })
            .catch(() => {
                this.toast.error('Erreur lors du déplacement du fichier.', 'Erreur');
            });
    }

    private rebuildTreeWithFiles() {
        if (!this.cleanTreeData?.length) return;

        const allFiles = this.mapFilesToTreeNodes();
        const grouped = new Map<string, any[]>();
        const unassigned: any[] = [];

        for (const file of allFiles) {
            // Priorité : affectation manuelle (drag-drop) > datacats de l'API > non classé
            const folderKey = this.fileAssignments.get(file.uid) || file.datacats?.uid || null;
            if (folderKey) {
                if (!grouped.has(folderKey)) grouped.set(folderKey, []);
                grouped.get(folderKey)!.push(file);
            } else {
                unassigned.push(file);
            }
        }

        const tree = this.injectFilesIntoFolders(
            JSON.parse(JSON.stringify(this.cleanTreeData)),
            grouped
        );

        // Fichiers non classés → dernier nœud
        if (unassigned.length && tree.length) {
            const last = tree[tree.length - 1];
            last.children = [...(last.children || []).filter((n: any) => !n.isFile), ...unassigned];
        }

        this.treeData = tree;
        this.dataSource.setData([...tree]);
        setTimeout(() => this.treeControl.expandAll(), 100);
        this.cdr.detectChanges();
    }

    private injectFilesIntoFolders(nodes: any[], grouped: Map<string, any[]>): any[] {
        return nodes.map((node: any) => {
            const nodeKey = node.key || node.uid || '';
            const files = grouped.get(nodeKey) || [];
            if (node.children) {
                node.children = [...this.injectFilesIntoFolders(node.children, grouped), ...files];
            } else if (files.length) {
                node.children = [...files];
            }
            return node;
        });
    }

    private injectFilesIntoLastNode() {
        if (!this.treeData?.length || !this.dataFileTemps?.length) return;
        const lastNode = this.treeData[this.treeData.length - 1];
        const existingChildren = (lastNode.children || []).filter((n: any) => !n.isFile);
        lastNode.children = [...existingChildren, ...this.mapFilesToTreeNodes()];
    }

    async deleteFile(node: any, event: Event) {
        event.stopPropagation();

        const result = await Swal.fire({
            html: `
              <div style="margin-top: 8px;">
                <p style="font-size: 17px; font-weight: 700; color: #0F172A; margin-bottom: 10px;">
                  Êtes-vous sûr de vouloir supprimer ce fichier ?
                </p>
                <p style="font-size: 13px; color: #64748B; margin: 0;">
                  Le fichier <strong>${node.name}.${node.extension}</strong> sera définitivement supprimé.
                </p>
              </div>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        const formData = new FormData();
        formData.append('action', '3');
        formData.append('idfile_temp', node.uid ?? '');
        formData.append('idsociete', this.users?.datasociete?.uid ?? '');

        this.isDeleting = true;
        this.httService
            .postDataMultipart(`${environment.api_url}api/:saveuploadfile-temps`, formData, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isDeleting = false;
                if (res.body.status || res.body.success) {
                    this.toast.success('Fichier supprimé avec succès.', 'Succès');
                    if (this.selectedFile?.uid === node.uid) {
                        this.selectedFile = null;
                    }
                    this.loadFileTemps(this.users?.datasociete?.uid, this.users?.uid);
                } else {
                    this.toast.error(res.body.message || 'Erreur lors de la suppression.', 'Erreur');
                }
            })
            .catch(() => {
                this.isDeleting = false;
                this.toast.error('Erreur lors de la suppression du fichier.', 'Erreur');
            });
    }

    onSending(event: any) {
        const [file, xhr, formData] = event;

        if (!this.validationForm.controls['idtype_docs'].value) {
            xhr.abort();
            this.toast.warning('Veuillez sélectionner un type de document avant d\'importer un fichier.', 'Type requis', {timeOut: 4000});
            if (this.dropzoneInstance) {
                setTimeout(() => this.dropzoneInstance?.removeFile(file), 500);
            }
            return;
        }

        this.isUploading = true;
        this.currentFileName = file.name;
        this.uploadProgress = 0;
        // Vérifier si les données utilisateur sont disponibles
        if (this.users && this.users.datasociete && this.users.uid) {

            console.log("this.idcategorie ===", this.idcategorie)
            formData.append("action", '1');
            formData.append("idsociete", this.users.datasociete.uid);
            formData.append("idfile_temp", "");
            formData.append("idcategorie", this.idcategorie);
            formData.append("iduser_file_temp", this.users.uid);
            formData.append("statut_ocr", this.applyOCR ? '1' : '0');
            formData.append("lib_file_temp", file);

            xhr.setRequestHeader("Authorization", `Bearer ${this.users?.access_token}`);
        }
    }

    onUploadProgress(event: any) {
        const [file, progress] = event;
        // Mettre à jour la barre de progression
        this.uploadProgress = Math.round(progress);
    }

    onSuccess(event: any) {
        const [file, response] = event;

        this.isUploading = false;
        this.uploadProgress = 0;
        this.currentFileName = '';

        // La réponse est chiffrée (AES-CBC) : déchiffrer avant de lire status/success
        let decrypted: any;
        try {
            decrypted = decryptData(response?.data);
        } catch (e) {
            this.toast.error('Erreur lors du déchiffrement de la réponse serveur.', 'Erreur', {timeOut: 5000});
            if (this.dropzoneInstance) {
                setTimeout(() => this.dropzoneInstance?.removeFile(file), 3000);
            }
            return;
        }

        const isSuccess = decrypted?.status === true || decrypted?.success === true;

        if (!isSuccess) {
            const msg = decrypted?.message || 'Échec de l\'enregistrement du fichier.';
            this.toast.error(msg, 'Erreur', {timeOut: 5000});
            if (this.dropzoneInstance) {
                this.dropzoneInstance.emit('error', file, msg);
                setTimeout(() => this.dropzoneInstance?.removeFile(file), 3000);
            }
            return;
        }

        this.uploadedFiles++;
        this.toast.success('Fichier enregistré avec succès.', 'Succès');
        this.loadFileTemps(this.users?.datasociete?.uid, this.users?.uid);
    }

    onError(event: any) {
        const [file, errorMessage] = event;

        this.isUploading = false;
        this.uploadProgress = 0;
        let message = 'Erreur réseau lors de l’opération';

        if (typeof errorMessage === 'string') {
            message = errorMessage;
        } else if (errorMessage?.detail) {
            message = errorMessage.detail;
        }
        this.toast.error(message, 'Erreur upload', {timeOut: 5000});

        // Retirer le fichier du dropzone après 3 s
        if (this.dropzoneInstance) {
            setTimeout(() => this.dropzoneInstance?.removeFile(file), 3000);
        }
    }

    onDropzoneInit(dropzoneRef: any) {
        // ngx-dropzone-wrapper émet la directive ; on récupère l'instance native
        this.dropzoneInstance = dropzoneRef?.dropzone ? dropzoneRef.dropzone() : (dropzoneRef as Dropzone);
    }

    getFileType(filename: string): string {
        if (!filename) return 'other';

        const extension = filename.toLowerCase().split('.').pop();
        // const extension = filename.toLowerCase().split('.').pop();

        switch (extension) {
            case 'pdf':
                return 'pdf';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg':
            case 'webp':
                return 'image';
            case 'doc':
            case 'docx':
                return 'word';
            case 'xls':
            case 'xlsx':
                return 'excel';
            case 'ppt':
            case 'pptx':
                return 'ppt';
            default:
                return 'other';
        }
    }

    getFileExtension(url: string): string {
        // Extraire l'extension après le dernier point
        const extension = url.split('.').pop();
        return extension ? extension : '';
    }

    /* Sélection d'un dossier : c'est ce dossier qui devient la cible de
       rangement des prochains fichiers uploadés (via this.idcategorie). */
    onFolderClick(node: any): void {
        this.selectListSelection.toggle(node);
        if (this.selectListSelection.isSelected(node)) {
            this.idcategorie = node.key || '';
        } else {
            // Désélection : on retombe sur le dossier racine par défaut
            this.idcategorie = this.cleanTreeData?.[0]?.key || '';
        }
    }

    // Pour gérer la sélection
    onNodeClick(node: any) {
        if (!node.children) {
            this.selectListSelection.toggle(node);
            this.selectedFile = node;
            this.officeZoom = 1.0;
            this.imageZoom = 1.0;
            this.imageRotation = 0;
            if (node.extension) {
                this.isLoadingPreview = true;
                if (this.OFFICE_EXTENSIONS.includes(node.extension)) {
                    this.startOfficeLoaderTimer();
                }
            }
            this.getSafeUrl(node);
        } else {
            this.selectListSelection.toggle(node);
            this.selectedFile = null;
            this.officePreviewUrl = null;
            this.officeZoom = 1.0;
            this.imageZoom = 1.0;
            this.imageRotation = 0;
            this.isLoadingPreview = false;
        }
    }

    onPreviewLoaded(): void {
        setTimeout(() => {
            this.isLoadingPreview = false;
        }, 0);
    }

    onOfficePreviewLoaded(): void {
        // Google Docs Viewer déclenche "load" plusieurs fois (redirections internes).
        // On annule le timer de secours et on cache le loader immédiatement.
        if (this.officeLoaderTimer) {
            clearTimeout(this.officeLoaderTimer);
            this.officeLoaderTimer = null;
        }
        this.isLoadingPreview = false;
    }

    private startOfficeLoaderTimer(): void {
        if (this.officeLoaderTimer) clearTimeout(this.officeLoaderTimer);
        // Repli : cache le loader après 10s si l'iframe ne répond pas
        this.officeLoaderTimer = setTimeout(() => {
            this.isLoadingPreview = false;
            this.officeLoaderTimer = null;
        }, 10000);
    }

    // Sécuriser l'URL pour l'iframe (pour PDF et images locales)
    getSafeUrl(data: any) {
        const proxyUrl = environment.production ? data.url_file : data.url_file.replace('http://api-ged.archivepro.ci', '');

        //const extension = data?.lib_file_temp?.split('.')?.pop()?.toLowerCase();
        // const extension = proxyUrl.split('.').pop()?.toLowerCase();

        if (data.extension === 'pdf') {
            // if (extension === 'pdf') {
            this.officePreviewUrl = null;
            this.renderPdf(data.url_file, data.password_file);
            // this.renderPdf(proxyUrl, data.password_file);
        } else if (this.OFFICE_EXTENSIONS.includes(data.extension || '')) {
            // 1. Détruire l'iframe (null → *ngIf retire le DOM)
            this.officePreviewUrl = null;
            // 2. Après un tick Angular, recréer l'iframe avec la nouvelle URL
            //    On n'appelle PAS cdr.detectChanges() : la zone Angular gère le timing
            setTimeout(() => {
                this.officePreviewUrl = this.getGoogleDocsViewerUrl(data.url_file);
            }, 150);
        }
    }

    // ── Chargement initial du PDF ────────────────────────────────
    renderPdf(url: string, pwd: string) {
        this.pdfDoc = null;
        this.currentPage = 1;
        this.totalPages = 0;
        this.pdfScale = 1.0;
        this.pdfRotation = 0;
        this.isRenderingPdf = false;
        this.currentPageInput = 1;

        pdfjsLib.getDocument({url, password: pwd}).promise
            .then((pdf: any) => {
                this.pdfDoc = pdf;
                this.totalPages = pdf.numPages;
                this.cdr.detectChanges();
                this.renderPage(1);
            })
            .catch((error: any) => {
                if (error.name === 'PasswordException') {
                    const pass = prompt('Ce PDF est protégé. Veuillez saisir le mot de passe :');
                    if (pass) this.renderPdfWithPassword(url, pass);
                } else {
                    console.error('Erreur de chargement du PDF:', error);
                    this.isLoadingPreview = false;
                }
            });
    }

    renderPdfWithPassword(url: string, password: string) {
        pdfjsLib.getDocument({url, password}).promise
            .then((pdf: any) => {
                this.pdfDoc = pdf;
                this.totalPages = pdf.numPages;
                this.cdr.detectChanges();
                this.renderPage(1);
            })
            .catch(() => {
                this.isLoadingPreview = false;
            });
    }

    // ── Rendu d'une page à l'échelle et rotation courantes ──────
    renderPage(pageNum: number) {
        if (!this.pdfDoc || this.isRenderingPdf) return;
        this.isRenderingPdf = true;
        this.currentPage = pageNum;
        this.currentPageInput = pageNum;

        this.pdfDoc.getPage(pageNum).then((page: any) => {
            const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
            if (!canvas) {
                this.isRenderingPdf = false;
                return;
            }
            const ctx = canvas.getContext('2d')!;
            const viewport = page.getViewport({scale: this.pdfScale, rotation: this.pdfRotation});
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            page.render({canvasContext: ctx, viewport}).promise
                .then(() => {
                    this.isRenderingPdf = false;
                    this.isLoadingPreview = false;
                    this.cdr.detectChanges();
                })
                .catch(() => {
                    this.isRenderingPdf = false;
                    this.isLoadingPreview = false;
                });
        });
    }

    // ── Navigation ───────────────────────────────────────────────
    prevPage() {
        if (this.currentPage > 1 && !this.isRenderingPdf)
            this.renderPage(this.currentPage - 1);
    }

    nextPage() {
        if (this.currentPage < this.totalPages && !this.isRenderingPdf)
            this.renderPage(this.currentPage + 1);
    }

    goToPage() {
        const p = Math.max(1, Math.min(this.totalPages, this.currentPageInput || 1));
        this.currentPageInput = p;
        if (p !== this.currentPage) this.renderPage(p);
    }

    // ── Zoom ─────────────────────────────────────────────────────
    zoomInPdf() {
        if (this.pdfScale >= 3 || this.isRenderingPdf) return;
        this.pdfScale = parseFloat(Math.min(3, this.pdfScale + 0.25).toFixed(2));
        this.renderPage(this.currentPage);
    }

    zoomOutPdf() {
        if (this.pdfScale <= 0.25 || this.isRenderingPdf) return;
        this.pdfScale = parseFloat(Math.max(0.25, this.pdfScale - 0.25).toFixed(2));
        this.renderPage(this.currentPage);
    }

    resetZoomPdf() {
        if (this.isRenderingPdf) return;
        this.pdfScale = 1.0;
        this.renderPage(this.currentPage);
    }

    fitWidthPdf() {
        if (!this.pdfDoc || !this.pdfWrapper || this.isRenderingPdf) return;
        this.pdfDoc.getPage(this.currentPage).then((page: any) => {
            const viewport = page.getViewport({scale: 1, rotation: this.pdfRotation});
            const w = this.pdfWrapper.nativeElement.clientWidth - 32;
            this.pdfScale = parseFloat((w / viewport.width).toFixed(2));
            this.renderPage(this.currentPage);
        });
    }

    // ── Rotation ─────────────────────────────────────────────────
    rotatePdf(dir: 'left' | 'right') {
        if (this.isRenderingPdf) return;
        this.pdfRotation = (this.pdfRotation + (dir === 'right' ? 90 : -90) + 360) % 360;
        this.renderPage(this.currentPage);
    }

    // ── Actions fichier ──────────────────────────────────────────
    downloadCurrentPdf() {
        if (!this.selectedFile?.url_file) return;
        const a = document.createElement('a');
        a.href = this.selectedFile.url_file;
        a.download = `${this.selectedFile.name}.${this.selectedFile.extension}`;
        a.target = '_blank';
        a.click();
    }

    openPdfNewTab() {
        if (this.selectedFile?.url_file) window.open(this.selectedFile.url_file, '_blank');
    }

    // ── Zoom Office ───────────────────────────────────────────────
    officeZoomIn(): void {
        if (this.officeZoom < 2) this.officeZoom = parseFloat(Math.min(2, this.officeZoom + 0.25).toFixed(2));
    }

    officeZoomOut(): void {
        if (this.officeZoom > 0.5) this.officeZoom = parseFloat(Math.max(0.5, this.officeZoom - 0.25).toFixed(2));
    }

    officeZoomReset(): void {
        this.officeZoom = 1.0;
    }

    openFileNewTab(): void {
        if (this.selectedFile?.url_file) window.open(this.selectedFile.url_file, '_blank');
    }

    downloadSelectedFile(): void {
        if (!this.selectedFile?.url_file) return;
        const a = document.createElement('a');
        a.href = this.selectedFile.url_file;
        a.download = `${this.selectedFile.name}.${this.selectedFile.extension}`;
        a.target = '_blank';
        a.click();
    }

    // ── Zoom / Rotation Image ─────────────────────────────────────
    imageZoomIn(): void {
        if (this.imageZoom < 4) this.imageZoom = parseFloat(Math.min(4, this.imageZoom + 0.25).toFixed(2));
    }

    imageZoomOut(): void {
        if (this.imageZoom > 0.25) this.imageZoom = parseFloat(Math.max(0.25, this.imageZoom - 0.25).toFixed(2));
    }

    imageZoomReset(): void {
        this.imageZoom = 1.0;
        this.imageRotation = 0;
    }

    imageRotateLeft(): void {
        this.imageRotation = (this.imageRotation - 90 + 360) % 360;
    }

    imageRotateRight(): void {
        this.imageRotation = (this.imageRotation + 90) % 360;
    }

    renderImage(url: string) {

        if (!this.viewerContainer) {
            console.error('viewerContainer non initialisé');
            return;
        }

        const container = this.viewerContainer.nativeElement;
        container.innerHTML = '';

        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '100%';

        container.appendChild(img);
    }


    // Générer l'URL de prévisualisation pour les fichiers Office
    getOfficePreviewUrl(fileUrl: string): SafeResourceUrl {
        // Option 1: Microsoft Office Online Viewer
        const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;

        // Option 2: Google Docs Viewer (alternative)
        // const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;

        return this.sanitizer.bypassSecurityTrustResourceUrl(officeViewerUrl);
    }


    // Google Docs Viewer (meilleure compatibilité)
    getGoogleDocsViewerUrl(fileUrl: string): SafeResourceUrl {
        const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(viewerUrl);
    }

    // Alternative: Office Online Viewer
    getOfficeViewerUrl(fileUrl: string): SafeResourceUrl {
        const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(officeViewerUrl);
    }

    // Gérer les erreurs de prévisualisation
    // onPreviewError() {
    //     this.previewError = true;
    // }

    // Télécharger le fichier
    downloadFile(file: any) {
        // Méthode 1: Simple download link
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        link.click();

        // Méthode 2: Si vous devez passer par votre backend
        // this.http.get(file.url, { responseType: 'blob' }).subscribe(blob => {
        //     const url = window.URL.createObjectURL(blob);
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.download = file.name;
        //     link.click();
        //     window.URL.revokeObjectURL(url);
        // });
    }

    // SOLUTION ALTERNATIVE: Convertir en Base64 pour contourner X-Frame-Options
    // (Nécessite que votre backend renvoie le fichier en base64)
    // displayFileAsBase64(file: any) {
    //     this.http.get(file.url, { responseType: 'blob' }).subscribe(blob => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const base64data = reader.result;
    //             this.selectedFile.base64Url = base64data;
    //             // Utilisez ensuite base64Url dans votre template
    //         };
    //         reader.readAsDataURL(blob);
    //     });
    // }


    showTypeDoc(idsociete: string = '', idtype_document: string = '', idcategories: string = '') {
        this.dataTypeDocument = [];
        this.dataTypeDocument = [];
        this.loadingType = true;
        return this.httService.getData(`${environment.api_url}api/:categories-type-documents?idsociete=${idsociete}&idtype_document=${idtype_document}&idcategories=${idcategories}`, false, this.users?.access_token || '')
            // this.httService.getData(`${environment.api_url}api/:savetypedocuments?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingType = false;
                if (res.body.status) {
                    this.dataTypeDocument = res.body.data[0].children.map((d: any) => {
                        return {
                            ...d.datastype_document,
                            label: d.datastype_document.libelle_type_docs,
                            value: d.datastype_document.uid
                        }
                    });
                }
            })
            .catch((err) => {
                this.loadingType = false;
            });

    }

    changeType(event: any) {
        this.ligneTypeOfDoc = [];

        if (!event.value) return;
        this.showCatOrder('', event.value, '');

        this.ligneTypeOfDoc = this.dataTypeDocument.find((d: any) => d.uid == event.value);
        this.ligneTypeOfDoc.dataPro = this.ligneTypeOfDoc.dataPro.map((d: any) => {
            return {
                ...d,
                lib_proprietes_docs: this.capitalize(d.lib_proprietes_docs)
            }
        })
        const elementsARetirer = [
            "Numéro du document",
            "Objet du document",
            "Date du document"
        ];

        this.ligneTypeOfDoc.dataPro = this.ligneTypeOfDoc.dataPro.filter(
            (item: any) => !elementsARetirer.includes(item.lib_proprietes_docs)
        );
    }

    capitalize(str: string | null | undefined): string {
        if (!str) return '';
        str = str.trim().toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    resetAfterSave(): void {
        this.validationForm.reset({
            typeArchivage: 'courante',
            publishe: 0,
        });
        this.validationForm.markAsPristine();
        this.validationForm.markAsUntouched();

        this.isEdit = false;
        this.ligneTypeOfDoc = [];
        this.dynamicValues = {};
        this.archiveStatus = 'courante';
        this.documentStatus = 'privee';
        this.applyOCR = false;
        this.dateInputDisplay = '';
        this.notifyBeneficiary = false;
        this.assignProprietaires = false;
        this.proprietairesCollapsed = false;
        this.selectedSociete = '';
        this.dataComptes = [];
        this.selectedProprietaires = [];
        this.dataRayon = [];
        this.dataBoites = [];
        this.dataFileTemps = [];
        this.isUploading = false;
        this.uploadProgress = 0;
        this.currentFileName = '';
        this.uploadedFiles = 0;

        if (this.dropzoneInstance) {
            this.dropzoneInstance.removeAllFiles(true);
        }

        this.resetTree();
    }

    submitForm() {

        if (this.validationForm.value.typeArchivage == "definitive") {
            if (!this.validationForm.value.idboites) {
                return;
            }
        } else {
            this.validationForm.get('idboites')?.setValue('');
        }
        const payload = {
            "action": this.isEdit ? 2 : 1,
            "iddocuments": this.isEdit ? (this.validationForm.value.iddocuments || '') : "",
            "idsociete": this.users.datasociete.uid,
            "iduser": this.users?.uid,
            "idtype_docs": this.validationForm.value.idtype_docs,
            "idboites": this.validationForm.value.idboites || '',
            "code_docs": this.validationForm.value.code_docs,
            "lib_docs": this.validationForm.value.lib_docs,
            "date_docs": moment(this.validationForm.value.date_docs).format('YYYY-MM-DD'),
            "date_sig": "",
            "desc_docs": this.validationForm.value.desc_docs,
            "etat_docs": 0,
            "active_docs": true,
            "region": "",
            "departement": "",
            "proprietes_docs": this.ligneTypeOfDoc?.dataPro
                ?.filter((e: any) => e.value_proprietes_docs)
                .map((e: any) => {
                    return {
                        "idproprietes_docs": e.uid,
                        "value_proprietes_docs": e.value_proprietes_docs,
                        "active": true
                    };
                }),
            "dataservices": this.setTranformer(this.validationForm.value.dataservices),
            "dataproprietaire": this.assignProprietaires
                ? this.selectedProprietaires.map((uid: string) => ({"idproprietaire": uid}))
                : [],
            "region_dep_localite": "",
            "statut_docs": 0,
            "publishe": this.statutToCode(this.documentStatus),
            "fulltexts_docs": "",
            "idproprietaire": 0,
            "sendmail": this.validationForm.value.sendmail || false
        }
        // Log d'action (construit avant reset du formulaire)
        const typeLabel = this.ligneTypeOfDoc?.libelle_type_docs
            || this.dataTypeDocument.find((d: any) => d.uid === this.validationForm.value.idtype_docs)?.libelle_type_docs || '';
        const codeDocs = this.validationForm.value.code_docs || '';
        const addFields = (this.ligneTypeOfDoc?.dataPro || [])
            .filter((e: any) => e.value_proprietes_docs)
            .map((e: any) => `${e.lib_proprietes_docs} : ${e.value_proprietes_docs}`)
            .join('\n');
        const actionLogs = `Enregistré le document (${typeLabel}) numéro (${codeDocs})` + "  \n \n " + addFields;

        this.isloading = true;
        this.isSaving = true;
        this.httService.postData(`${environment.api_url}api/:savedocuments`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                this.isSaving = false;
                if (res.body.status || res.body.success) {
                    this.histoLog.log(actionLogs);
                    const wasEdit = this.isEdit;
                    this.resetAfterSave();
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        if (wasEdit) this.router.navigate(['/documents/mes-documents']);
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
                this.isloading = false;
                this.isSaving = false;
                Swal.fire({
                    title: err?.error?.err?.message || 'Une erreur est survenue !',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });

    }

    setTranformer(e: any) {
        if (!e || !e.length) return [];
        return e.map((e: string) => ({
            "idservices": e
        }))
    }

    private resetTree(): void {
        this.treeData = [];
        this.cleanTreeData = [];
        this.dataSource.setData([]);
        this.selectedFile = null;
        this.isLoadingPreview = false;
        this.fileAssignments.clear();
        this.draggedFileNode = null;
        this.dropTargetKey = null;
    }

    showCatOrder(idsociete: string = '', idtype_document: string = '', idcategories: string = '') {
        const params = new URLSearchParams();

        if (idsociete) {
            params.append('idsociete', idsociete);
        }

        if (idtype_document) {
            params.append('idtype_document', idtype_document);
        }

        if (idcategories) {
            params.append('idcategories', idcategories);
        }

        this.resetTree();
        this.idcategorie = '';
        const url = `${environment.api_url}api/save-categorie-plan-classement?${params.toString()}`;
        this.httService.getData(url, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    const mapped = this.mapApiToTree(res.body.data);
                    if (!mapped?.length) {
                        this.resetTree();
                        return;
                    }
                    this.idcategorie = mapped[0].key;
                    this.cleanTreeData = JSON.parse(JSON.stringify(mapped));
                    this.treeData = mapped;
                    this.rebuildTreeWithFiles();
                } else {
                    this.resetTree();
                }
            })
            .catch(() => {
                this.resetTree();
            });

    }

    showOrganigramme(idsociete: string = '', niveau: string = '') {
        this.dataOrg = [];
        this.isload = true;
        this.httService.getData(`${environment.api_url}auth/:save-service-organigramme?societe=${idsociete}&niveau=${niveau}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isload = false;
                if (res.body.status || res.body.success) {
                    this.dataOrg = res.body.data.map((e: any, index: number) => {
                        return this.formatNode(e, index === 0);
                    });
                }
            })
            .catch((err) => {
                this.isload = false;
            });
    }

    mapApiToTree(data: any[]): TreeNode[] {
        return data.map(item => ({
            name: item?.name_categories,   // ← nom affiché dans le tree
            key: item?.uid,                // ← identifiant unique
            id: item?.id,
            position: item?.position,
            actif: item?.actif,
            apiLevel: item?.level,
            auth: `${item?.actif ? 'Actif' : 'Inactif'}`,
            color: item?.actif ? '#87d068' : '#9a0218',
            code_type_docs: item?.code_type_docs,
            libelle_type_docs: item?.libelle_type_docs,
            idtype_document: item?.idtype_document,
            uid_type_docs: item?.uid_type_docs,
            disabled: false,
            children: item.children?.length > 0
                ? this.mapApiToTree(item.children)
                : undefined
        }));
    }

    onChange($event: string[]): void {

    }

    formatNode(node: any, isFirstNode: boolean = false): any {
        return {
            title: node.libelle,
            key: node.uid,
            expanded: isFirstNode,
            isLeaf: !node.children || node.children.length === 0,
            children: node.children?.map((child: any) => {
                return this.formatNode(child);
            }) || []
        };
    }


    setArchive(value: 'courante' | 'definitive', event?: Event): void {
        // Comportement radio : un re-clic sur le switch déjà actif ne doit pas le décocher
        const input = event?.target as HTMLInputElement | null;
        if (input) input.checked = true;
        this.validationForm.get('typeArchivage')?.setValue(value);
    }

    toggleProprietaires(value: boolean): void {
        this.assignProprietaires = value;
        this.proprietairesCollapsed = false;
        if (this.assignProprietaires) {
            if (!this.dataSocietes.length) {
                this.showSocietes('');
            }
        } else {
            this.selectedSociete = '';
            this.selectedProprietaires = [];
            this.dataComptes = [];
        }
    }

    /** Rond (coche) : active / désactive l'attribution (désélection possible). */
    onAssignDot(event: Event): void {
        event.stopPropagation();
        this.toggleProprietaires(!this.assignProprietaires);
    }

    /** En-tête / chevron : replie ou déplie l'accordéon sans perdre la sélection. */
    onAssignHeader(): void {
        if (!this.assignProprietaires) {
            this.toggleProprietaires(true);
        } else {
            this.proprietairesCollapsed = !this.proprietairesCollapsed;
        }
    }

    showSocietes(code_societe: string = ''): void {
        this.loadingSocietes = true;
        this.dataSocietes = [];
        this.httService.getData(`${environment.api_url}auth/:savesociete?code_societe=${code_societe}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingSocietes = false;
                if (res.body.status || res.body.success) {
                    this.dataSocietes = (res.body.data || []).map((e: any) => ({
                        ...e,
                        label: e?.raison_sociale ?? '',
                        value: e?.uid || e?.id,
                    }));
                }
            })
            .catch(() => {
                this.loadingSocietes = false;
            });
    }

    onSocieteChange(idsociete: string): void {
        this.selectedSociete = idsociete || '';
        this.selectedProprietaires = [];
        this.dataComptes = [];
        if (this.selectedSociete) {
            this.showComptes(this.selectedSociete);
        }
    }

    showComptes(idsociete: string = ''): void {
        this.loadingComptes = true;
        this.dataComptes = [];
        this.httService.getData(`${environment.api_url}auth/:liste-des-comptes?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingComptes = false;
                if (res.body.status) {
                    this.dataComptes = res.body.data.map((e: any) => ({
                        ...e,
                        label: `${e?.datapersonnel?.nom ?? ''} ${e?.datapersonnel?.prenom ?? ''}`.trim(),
                        value: e?.uid || e?.id,
                    }));
                }
            })
            .catch(() => {
                this.loadingComptes = false;
            });
    }

    setStatut(value: 'privee' | 'public' | 'confidentiel', event?: Event): void {
        // Comportement radio : un re-clic sur le switch déjà actif ne doit pas le décocher
        const input = event?.target as HTMLInputElement | null;
        if (input) input.checked = true;
        this.documentStatus = value;
        // Synchronise la valeur numérique du formulaire (0 = privé, 1 = public, 2 = confidentiel)
        this.validationForm.get('publishe')?.setValue(this.statutToCode(value));
    }

    /** Convertit le statut en code numérique attendu par l'API (publishe). */
    private statutToCode(status: string): number {
        if (status === 'public') return 1;
        if (status === 'confidentiel') return 2;
        return 0; // privé
    }

    /** Convertit le code numérique de l'API (publishe) en statut. */
    private codeToStatut(code: any): 'privee' | 'public' | 'confidentiel' {
        const n = Number(code);
        if (n === 1 || code === true) return 'public';
        if (n === 2) return 'confidentiel';
        return 'privee';
    }

    disableFutureDates = (date: Date): boolean => {
        return date > new Date();
    };

    parseDateInput(value: string): void {
        if (!value || !value.trim()) {
            this.validationForm.get('date_docs')?.setValue(null);
            this.validationForm.get('date_docs')?.markAsTouched();
            this.dateInputDisplay = '';
            return;
        }
        const parsed = moment(value.trim(), ['DD/MM/YYYY', 'DD-MM-YYYY'], true);
        if (parsed.isValid()) {
            this.validationForm.get('date_docs')?.setValue(parsed.toDate());
            this.dateInputDisplay = parsed.format('DD/MM/YYYY');
        } else {
            this.validationForm.get('date_docs')?.setValue(null);
            this.validationForm.get('date_docs')?.markAsTouched();
            this.dateInputDisplay = '';
        }
    }

    onDateSelected(date: Date | null): void {
        if (date) {
            this.dateInputDisplay = moment(date).format('DD/MM/YYYY');
        }
    }

    generateDocumentNumber(): void {
        if (this.isGeneratingCode) return;
        if (!this.validationForm.value.idtype_docs) {
            Swal.fire({
                title: `Veuillez selectionner le type de document svp.`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        this.isGeneratingCode = true;
        this.validationForm.get('code_docs')?.disable();

        this.httService.getData(`${environment.api_url}api/:generate-code-documents?useruid=${this.users?.uid}&idtype_docs=${this.validationForm.value.idtype_docs}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.validationForm.get('code_docs')?.setValue(res.body.numero);
                    this.validationForm.get('code_docs')?.markAsTouched();
                }
            })
            .catch(() => {
            })
            .finally(() => {
                this.isGeneratingCode = false;
                this.validationForm.get('code_docs')?.enable();
            });
    }

    showSites(idsociete: string = '', idsite: string = '') {
        this.dataSites = [];
        this.httService.getData(`${environment.api_url}api/:savesites?idsociete=${idsociete}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status) {
                    this.dataSites = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            label: e.libelle_sites,
                            value: e.uid
                        }
                    });
                }
            })
            .catch((err) => {
            });
    }

    showRayons(idsociete: string = '', idrayon: string = '', idsite: string = '') {
        this.dataRayon = [];
        this.httService.getData(`${environment.api_url}api/:saverayons?idsociete=${idsociete}&idrayon=${idrayon}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataRayon = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            label: e.libelle_rayon,
                            value: e.uid
                        }
                    });
                }
            })
            .catch((err) => {
            });
    }

    changeSite(event: any) {
        if (!event.value) return;
        this.showRayons(this.users.datasociete.uid, '', event.value);
    }

    changeRayon(event: any) {
        if (!event.value) return;
        this.showBoites(this.users.datasociete.uid, event.value, '');
    }

    showBoites(idsociete: string = '', idrayon: string = '', idsite: string = '') {
        this.dataBoites = [];
        this.loadingBoite = true;
        this.httService.getData(`${environment.api_url}api/:saveboites?idsociete=${idsociete}&idrayon=${idrayon}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingBoite = false;
                if (res.body.status) {
                    this.dataBoites = res.body.data.map((e: any) => {
                        return {
                            label: e.code_boites,
                            value: e.uid
                        }
                    });
                }
            })
            .catch((err) => {
                this.loadingBoite = false;
            });
    }

    showSerie(idsociete: string = '', idtype_document: string = '', idcategories: string = '') {
        this.isloadSerie = true;
        this.dataSeries = [];
        this.httService.getData(`${environment.api_url}api/:save-categorie-plan-classement?idsociete=${idsociete}&idtype_document=${idtype_document}&idcategories=${idcategories}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloadSerie = false;
                if (res.body.status || res.body.success) {
                    this.dataSeries = res.body.data.map((e: any) => {
                        return {
                            label: `${e.code_categories || ''} ${e.code_categories ? '-' : ''} ${e?.name_categories}`,
                            value: e.uid
                        }
                    });
                }
            })
            .catch((err) => {
                this.isloadSerie = false;
            });
    }

    selectSerie(e: any) {
        if (!e.value) return;
        this.showTypeDoc('', '', e.value)
    }
}
