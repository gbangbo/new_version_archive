import {
    Component,
    ViewChild,
    AfterViewInit,
    OnInit,
    OnDestroy,
    ChangeDetectorRef,
    ElementRef,
    HostListener
} from '@angular/core';
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
import {LayoutService} from "../../../shared/services/layout.service";
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
    // ── Volets repliables de la colonne de droite ────────────
    // Replier le téléversement et le plan de classement rend toute la hauteur
    // de la colonne à l'aperçu du PDF, qui en a besoin pour être lisible.
    uploadReplie = false;
    treeReplie = false;

    // ── Capture de texte depuis le PDF vers les Métadonnées ──────
    // Champ « armé » : dernière propriété des Métadonnées qui a reçu le focus.
    // On ne peut pas se fier à document.activeElement au moment du relâchement
    // de la souris : cliquer dans l'aperçu a déjà fait perdre le focus au champ.
    captureCible: any = null;
    private textLayerTask: any = null;

    // ── Capture par zone (PDF scanne, sans couche de texte) ──────
    /* Faux des que getTextContent() ne renvoie rien pour la page affichee :
       le document est une image, la selection native est impossible et on
       bascule sur le trace d'une zone suivi d'un OCR local. */
    pageTexteDisponible = true;
    /** Rectangle en cours de trace, en pixels du canvas affiche. */
    zoneOcr: { x: number; y: number; w: number; h: number } | null = null;
    private zoneDepart: { x: number; y: number } | null = null;
    zoneEnTrace = false;
    ocrZoneEnCours = false;
    ocrZoneProgres = 0;
    /** Worker tesseract cree a la premiere demande puis reutilise. */
    private ocrWorker: any = null;
    private ocrWorkerPromesse: Promise<any> | null = null;
    /** État de la barre latérale avant l'entrée sur cet écran. */
    private sidebarAvant = false;

    pdfDoc: any = null;
    currentPage = 1;
    totalPages = 0;
    pdfScale = 1.0;
    pdfRotation = 0;
    isRenderingPdf = false;
    currentPageInput = 1;

    /* Ajustement automatique du zoom.

       Par défaut la page est mise à l'échelle de la largeur disponible, et le
       zoom suit chaque redimensionnement (fenêtre, splitter, plein écran).
       Un zoom manuel (+ / − / 100%) désactive ce suivi ; le bouton
       « Ajuster à la largeur » le réactive. */
    pdfAutoFit = true;
    private pdfResizeObs?: ResizeObserver;
    private pdfWrapperObserve: HTMLElement | null = null;
    private pdfFitTimer: any = null;
    idcategorie: string = 'i';

    // ── État du viewer Office ────────────────────────────────────
    officeZoom: number = 1.0;

    // ── État du viewer Image ─────────────────────────────────────
    imageZoom: number = 1.0;
    imageRotation: number = 0;

    get pdfZoomLabel(): string {
        return Math.round(this.pdfScale * 100) + '%';
    }

    get pdfZoomTitle(): string {
        return this.pdfAutoFit
            ? 'Zoom ajusté automatiquement à la largeur du cadre'
            : 'Zoom manuel';
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
    previewFullscreen: boolean = false;

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
    private seriesPretes: Promise<any> | null = null;
    /* Arborescence brute des séries : dataSeries n'en garde que les racines,
       alors que la modification doit y retrouver un nœud de n'importe quel niveau. */
    private dataSeriesRaw: any[] = [];
    dataSites: any = [];
    dataSeries: any = [];

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService,
                private router: Router,
                private toast: ToastrService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer,
                private histoLog: HistoLogService,
                private layoutService: LayoutService,
                private hostRef: ElementRef<HTMLElement>) {
        //  this.dataSource.setData(TREE_DATA);

    }

    ngOnInit(): void {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
        // Masque le pied de page global sur cet écran (l'info est reprise dans la barre d'actions)
        document.body.classList.add('hide-app-footer');
        /* Replie la barre latérale : le formulaire et l'aperçu se partagent la
           largeur, chaque pixel compte. L'état précédent est rendu en quittant.

           Le drapeau est posé tout de suite (il n'est pas affiché), mais le
           changement visible attend le tour de boucle suivant : closeSidebar est
           lié dans le gabarit du parent, déjà vérifié quand ce ngOnInit s'exécute
           (NG0100). */
        this.sidebarAvant = this.layoutService.closeSidebar;
        this.layoutService.replierForce = true;
        setTimeout(() => {
            this.layoutService.closeSidebar = true;
            this.cdr.detectChanges();
        }, 0);
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
        // La promesse est conservée : la modification doit attendre que la liste
        // des séries soit là avant d'y poser la valeur du document.
        this.seriesPretes = this.showSerie('', '', '');
        // Forcer la mise à jour de l'icône dossier à chaque toggle
        this.treeControl.expansionModel.changed.subscribe(() => setTimeout(() => this.cdr.detectChanges(), 0));

        // ── Mode modification : document déposé par l'action "Modifier" ──
        if (editDoc) {
            this.autor.clearEditDoc();
            this.hydrateForEdit(editDoc);
        }
    }

    /* Pré-remplit le formulaire à partir d'un document existant */
    private async hydrateForEdit(docListe: any): Promise<void> {
        this.isEdit = true;
        this.isloading = true;

        /* Les trois écrans qui ouvrent la modification (accueil, mes documents,
           recherche) ne transmettent qu'un extrait de la ligne affichée : pas de
           série, pas de propriétés dynamiques, pas d'emplacement physique, et une
           date déjà reformatée. On repart donc de la fiche complète. */
        const complet = await this.fetchDocumentComplet(docListe?.uid || docListe?.iddocuments || '');
        const doc = complet ? {...docListe, ...complet} : docListe;

        // Type d'archivage selon la présence d'une boîte
        const hasBoite = !!doc?.databoites?.uid;
        this.archiveStatus = hasBoite ? 'definitive' : 'courante';
        this.validationForm.get('typeArchivage')?.setValue(hasBoite ? 'definitive' : 'courante');

        // Statut : privé (0) / public (1) / confidentiel (2)
        this.documentStatus = this.codeToStatut(doc?.publishe);

        // Champs scalaires
        this.validationForm.patchValue({
            iddocuments: doc?.uid || '',
            code_docs: doc?.code_docs || '',
            lib_docs: doc?.lib_docs || doc?.lib_document || '',
            desc_docs: doc?.desc_docs || '',
            date_docs: this.parseDateDoc(doc?.date_docs || doc?.date_document),
            publishe: this.statutToCode(this.documentStatus),
        });

        // Emplacement physique (site → rayon → boîte)
        await this.hydrateEmplacement(doc);

        // Services bénéficiaires
        const services = (doc?.dataservices || [])
            .map((s: any) => s?.uid || s?.idservices)
            .filter((v: any) => v);
        if (services.length) {
            this.validationForm.get('dataservices')?.setValue(services);
        }

        // Type de document + propriétés dynamiques (plan de classement inclus)
        await this.hydrateTypeEtProprietes(doc);

        /* Pièces déjà attachées (elles remplacent la zone temporaire). Chargées
           après le type : le rangement dans l'arbre suppose le plan de
           classement du type déjà en place. */
        await this.loadDocumentPieces(doc?.uid || '');

        /* Série en dernier : la poser déclenche selectSerie → showTypeDoc, qui
           réécrit dataTypeDocument. Le faire plus tôt viderait la liste des
           types pendant la construction des propriétés dynamiques. */
        await this.hydrateSerie(doc);

        this.isloading = false;
        this.cdr.detectChanges();
    }

    private async hydrateSerie(doc: any): Promise<void> {
        const catUid = doc?.datacategories?.uid || '';
        if (!catUid) return;
        try {
            await this.seriesPretes;
        } catch {
            // liste indisponible : on se rabattra sur l'option du document
        }

        /* Le document pointe sur le dossier où il est rangé (« BANQUE »), pas sur
           la série : la liste ne contient que les racines du plan de classement.
           On remonte donc à l'ancêtre racine du nœud. */
        let serieUid = this.racineSerie(catUid);

        /* À défaut, la racine du plan chargé pour le type du document : c'est la
           même série, vue depuis l'autre bout. */
        if (!serieUid) {
            const racinePlan = this.cleanTreeData?.[0]?.key || '';
            if (racinePlan && (this.dataSeries || []).some((s: any) => s?.value === racinePlan)) {
                serieUid = racinePlan;
            }
        }

        // Sinon on affiche le nœud tel quel plutôt que de laisser le champ vide
        if (!serieUid) {
            serieUid = catUid;
            if (!(this.dataSeries || []).some((s: any) => s?.value === catUid)) {
                const cat = doc.datacategories;
                this.dataSeries = [
                    ...(this.dataSeries || []),
                    {
                        label: `${cat?.code_categories || ''} ${cat?.code_categories ? '-' : ''} ${cat?.name_categories || ''}`.trim(),
                        value: catUid,
                    },
                ];
            }
        }

        this.poserValeurSelect2('idcategories', serieUid);
    }

    /* Racine de l'arborescence des séries contenant le nœud `uid`. */
    private racineSerie(uid: string): string {
        const chercher = (noeuds: any[], racine: string): string => {
            for (const noeud of noeuds || []) {
                const courante = racine || noeud?.uid || '';
                if (noeud?.uid === uid) return courante;
                const trouve = chercher(noeud?.children || [], courante);
                if (trouve) return trouve;
            }
            return '';
        };
        return chercher(this.dataSeriesRaw, '');
    }

    /* ng-select2-component ne résout le libellé d'une valeur qu'à l'instant où
       on la lui pose, à partir des options qu'il détient déjà. Affecter la liste
       et la valeur dans le même tour laisse le champ vide — et le composant
       renvoie alors `undefined` dans le contrôle. On force donc la propagation
       de [data] avant de poser la valeur. */
    private poserValeurSelect2(nom: string, valeur: any): void {
        const ctrl = this.validationForm.get(nom);
        if (!ctrl || !valeur) return;
        this.cdr.detectChanges();
        ctrl.setValue(valeur);
    }

    /* Fiche complète du document, seule source fiable pour la modification. */
    private async fetchDocumentComplet(uid: string): Promise<any | null> {
        if (!uid) return null;
        const idsociete = this.users?.datasociete?.uid || '';
        try {
            const res: any = await this.httService.getData(
                `${environment.api_url}api/:savedocuments?idsociete=${idsociete}&iddocuments=${uid}`,
                false,
                this.users?.access_token || ''
            ).toPromise();
            if (!(res?.body?.status || res?.body?.success)) return null;
            const data = res.body.data;
            const fiche = Array.isArray(data) ? data[0] : data;
            return fiche && typeof fiche === 'object' ? fiche : null;
        } catch {
            return null;
        }
    }

    /* Les listes reformatent la date en JJ/MM/AAAA avant de la transmettre :
       new Date() la lirait à l'américaine (et renverrait Invalid Date passé le
       12 du mois). Les deux écritures sont acceptées. */
    private parseDateDoc(valeur: any): Date | null {
        if (!valeur) return null;
        if (valeur instanceof Date) return isNaN(valeur.getTime()) ? null : valeur;
        const m = moment(String(valeur), ['YYYY-MM-DD', moment.ISO_8601, 'DD/MM/YYYY', 'DD-MM-YYYY'], true);
        return m.isValid() ? m.toDate() : null;
    }

    /* Emplacement physique : on recharge les listes dépendantes (rayons du site,
       boîtes du rayon) pour que les trois sélecteurs soient lisibles ET
       modifiables, et pas seulement porteurs d'un identifiant. */
    private async hydrateEmplacement(doc: any): Promise<void> {
        const idsociete = this.users?.datasociete?.uid || '';
        const idsite = doc?.datasites?.uid || doc?.datarayons?.datasites?.uid || '';
        const idrayon = doc?.datarayons?.uid || doc?.databoites?.datarayons?.uid || '';
        const idboite = doc?.databoites?.uid || '';

        if (idsite) {
            // dataSites est chargé depuis ngOnInit ; poser la valeur déclenche
            // aussi changeSite, donc le rechargement des rayons du site.
            this.poserValeurSelect2('idsite', idsite);
        }
        if (idrayon) {
            await this.showRayons(idsociete, '', idsite);
            if (!(this.dataRayon || []).some((r: any) => r?.value === idrayon)) {
                this.dataRayon = [
                    ...(this.dataRayon || []),
                    {label: doc?.datarayons?.libelle_rayon || doc?.datarayons?.code_rayon || '', value: idrayon},
                ];
            }
            this.poserValeurSelect2('idrayon', idrayon);
        }
        if (idboite) {
            await this.showBoites(idsociete, idrayon, '');
            // Repli si la liste des boîtes n'a pas pu être chargée
            if (!(this.dataBoites || []).some((b: any) => b?.value === idboite)) {
                this.dataBoites = [
                    ...(this.dataBoites || []),
                    {label: doc?.databoites?.code_boites || '', value: idboite},
                ];
            }
            this.poserValeurSelect2('idboites', idboite);
        }
    }

    /* Type de document : la liste des types dépend de la série. Quand la série
       est absente, le type porté par le document sert lui-même d'option — il
       transporte déjà ses propriétés. */
    private async hydrateTypeEtProprietes(doc: any): Promise<void> {
        const typeDoc = doc?.datatype_document?.[0] || doc?.datatypedocuments || null;
        const typeUid = typeDoc?.uid || '';
        if (!typeUid) return;

        const catUid = doc?.datacategories?.uid || '';
        if (catUid) {
            await this.showTypeDoc('', '', catUid);
        }

        if (!(this.dataTypeDocument || []).some((t: any) => t?.uid === typeUid)) {
            this.dataTypeDocument = [
                ...(this.dataTypeDocument || []),
                {...typeDoc, label: typeDoc?.libelle_type_docs, value: typeUid},
            ];
        }

        this.poserValeurSelect2('idtype_docs', typeUid);
        await this.changeType({value: typeUid});   // charge aussi le plan de classement
        this.prefillProprietes(doc);
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
                    const url = d.url_file || d.url_file_docs || d.lib_file_temp || d.file || '';
                    /* Les pièces d'un document renvoient extension_file_docs
                       (avec le point) là où la zone temporaire renvoie extension. */
                    const ext = (d.extension || d.extension_file_docs || this.getFileExtension(url) || '')
                        .toLowerCase()
                        .replace('.', '');
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

    /* Reporte les valeurs des propriétés dynamiques du document sur le formulaire.
       L'API les loge dans datatype_document[0].dataPro[].dataValue[] (même
       structure que la fenêtre « Voir le détail ») ; les formes à plat des
       anciennes réponses restent acceptées. */
    private prefillProprietes(doc: any): void {
        if (!this.ligneTypeOfDoc?.dataPro?.length) return;

        const valeurs = new Map<string, any>();

        const propsDuType = doc?.datatype_document?.[0]?.dataPro || [];
        (Array.isArray(propsDuType) ? propsDuType : []).forEach((p: any) => {
            const v = this.extraireValeurPropriete(p?.dataValue);
            if (p?.uid && v !== '') valeurs.set(p.uid, v);
        });

        const aPlat = doc?.proprietes_docs || doc?.dataproprietes_docs || doc?.dataproprietes || [];
        (Array.isArray(aPlat) ? aPlat : []).forEach((s: any) => {
            const uid = s?.idproprietes_docs || s?.dataproprietes_docs?.uid || s?.uid || s?.iduid;
            const v = s?.value_proprietes_docs ?? s?.value;
            if (uid && v !== null && v !== undefined && String(v).trim() !== '') {
                valeurs.set(uid, v);
            }
        });

        if (!valeurs.size) return;

        this.ligneTypeOfDoc.dataPro.forEach((p: any) => {
            if (!valeurs.has(p.uid)) return;
            const v = valeurs.get(p.uid);
            // nz-date-picker attend un objet Date, pas la chaîne renvoyée par l'API
            p.value_proprietes_docs = p?.type_proprietes_docs === 'date'
                ? (this.parseDateDoc(v) ?? v)
                : v;
        });
    }

    /* La valeur saisie arrive dans dataValue, tantôt en tableau, tantôt en objet. */
    private extraireValeurPropriete(dataValue: any): string {
        if (dataValue === null || dataValue === undefined) return '';
        if (Array.isArray(dataValue)) {
            return dataValue
                .map((v: any) => v?.value_proprietes_docs ?? v?.value ?? '')
                .filter((v: any) => String(v).trim() !== '')
                .join(', ');
        }
        if (typeof dataValue === 'object') {
            const v = dataValue?.value_proprietes_docs ?? dataValue?.value ?? '';
            return String(v).trim();
        }
        return String(dataValue).trim();
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


    // ══ Hauteur de la carte ═══════════════════════════════════════════════
    // La carte doit s'arrêter exactement au bas de la fenêtre : la barre
    // d'actions (Annuler / Enregistrer) reste ainsi toujours visible et seules
    // les deux colonnes défilent. On mesure la position réelle du composant au
    // lieu de coder en dur header + fil d'Ariane : ces hauteurs varient selon
    // le zoom, la largeur et le retour à la ligne du fil d'Ariane.
    private resizeObs?: ResizeObserver;

    private ajusterHauteurCarte = (): void => {
        const host = this.hostRef.nativeElement;

        // ≤ 991px : la mise en page passe en colonne et la page reprend le
        // scroll (cf. media query du SCSS) → on ne force aucune hauteur.
        if (window.innerWidth <= 991) {
            host.style.removeProperty('height');
            return;
        }

        // getBoundingClientRect().top est relatif à la fenêtre ; on y rajoute
        // le défilement pour obtenir la distance depuis le haut du document.
        const offsetHaut = host.getBoundingClientRect().top + window.scrollY;
        host.style.height = `calc(100vh - ${Math.round(offsetHaut)}px - 14px)`;
    };

    ngAfterViewInit(): void {
        // 1. Désactiver l'auto-découverte de Dropzone (à faire UNE SEULE FOIS au début de votre app)
        Dropzone.autoDiscover = false;

        // Le fil d'Ariane est rendu par le layout parent : on attend un tour de
        // boucle pour le mesurer, puis on suit ses changements de hauteur.
        setTimeout(() => this.ajusterHauteurCarte(), 0);
        window.addEventListener('resize', this.ajusterHauteurCarte);
        const filAriane = document.querySelector('.page-title');
        if (filAriane && typeof ResizeObserver !== 'undefined') {
            this.resizeObs = new ResizeObserver(() => this.ajusterHauteurCarte());
            this.resizeObs.observe(filAriane);
        }

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
        // ...ainsi que la barre latérale telle qu'elle était avant d'entrer ici
        this.layoutService.replierForce = false;
        this.layoutService.closeSidebar = window.innerWidth < 1200 ? true : this.sidebarAvant;
        window.removeEventListener('resize', this.ajusterHauteurCarte);
        // Le worker OCR porte un thread et quelques Mo de WASM : on le rend
        try { this.ocrWorker?.terminate(); } catch { /* jamais créé */ }
        this.ocrWorker = null;
        this.ocrWorkerPromesse = null;
        this.resizeObs?.disconnect();
        this.pdfResizeObs?.disconnect();
        clearTimeout(this.pdfFitTimer);
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
                console.log("Suppression ===", res.body)
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

    /** Bascule l'aperçu en plein écran (et retour). */
    togglePreviewFullscreen(): void {
        this.previewFullscreen = !this.previewFullscreen;
    }

    @HostListener('document:keydown.escape')
    onEscapePreview(): void {
        if (this.previewFullscreen) {
            this.previewFullscreen = false;
            this.cdr.detectChanges();
        }
    }

    /**
     * Type de prévisualisation d'un fichier, déduit de son extension.
     *
     * Remplaçait getFileType(), qui lisait l'extension dans `name`. Or les nœuds
     * de l'arbre stockent le nom SANS extension (elle vit dans `extension`) :
     * la fonction renvoyait donc 'other' pour tous les fichiers et le message
     * « Prévisualisation non disponible » s'affichait sous l'aperçu, même quand
     * celui-ci fonctionnait. Les quatre branches du gabarit s'appuient
     * désormais sur cette seule source, elles ne peuvent plus diverger.
     */
    previewKind(file: any): 'image' | 'pdf' | 'office' | 'other' {
        const ext = (file?.extension || '').toString().toLowerCase();
        if (ext === 'pdf') return 'pdf';
        if (['jpg', 'jpeg', 'png'].includes(ext)) return 'image';
        if (['doc', 'docx', 'xls', 'xlsx'].includes(ext)) return 'office';
        return 'other';
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
        console.log("lecture ===", data)
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
        this.pdfAutoFit = true;

        this.loadPdfDocument(url, (pwd ?? '').toString(), false);
    }

    renderPdfWithPassword(url: string, password: string) {
        this.loadPdfDocument(url, (password ?? '').toString(), true);
    }

    /* Point d'entrée unique vers pdf.js.

       pdf.js refuse un PDF protégé de deux façons distinctes, que l'ancien code
       confondait : NEED_PASSWORD (aucun mot de passe fourni) et
       INCORRECT_PASSWORD (mot de passe fourni mais refusé par le fichier). D'où
       l'impression que la saisie est réclamée « alors que le mot de passe est
       bien dans le retour de l'API » : la valeur arrive bien, mais le fichier la
       rejette (pièce ré-encodée par l'OCR, mot de passe propriétaire enregistré
       à la place du mot de passe d'ouverture, espaces parasites…).

       Le message distingue désormais les deux cas et la console indique ce qui a
       été réellement essayé. Un mot de passe refusé est automatiquement retenté
       une fois sans ses espaces de bordure avant de solliciter l'utilisateur. */
    private loadPdfDocument(url: string, pwd: string, retry: boolean) {
        pdfjsLib.getDocument({url, password: pwd}).promise
            .then((pdf: any) => {
                this.pdfDoc = pdf;
                this.totalPages = pdf.numPages;
                this.cdr.detectChanges();
                this.surveillerLargeurCadrePdf();
                this.afficherPage(1);
            })
            .catch((error: any) => {
                if (error?.name !== 'PasswordException') {
                    console.error('Erreur de chargement du PDF:', error);
                    this.isLoadingPreview = false;
                    this.cdr.detectChanges();
                    return;
                }

                // PasswordResponses : 1 = NEED_PASSWORD, 2 = INCORRECT_PASSWORD
                const motDePasseAbsent = error?.code === 1 || !pwd;

                console.warn('[Aperçu PDF] mot de passe refusé', {
                    url,
                    motDePasseFourni: !!pwd,
                    longueur: pwd.length,
                    espacesDeBordure: pwd !== pwd.trim(),
                    code: error?.code,
                    message: error?.message
                });

                // Repli silencieux : mot de passe enregistré avec des espaces
                if (!motDePasseAbsent && !retry && pwd.trim() && pwd.trim() !== pwd) {
                    this.loadPdfDocument(url, pwd.trim(), true);
                    return;
                }

                this.isLoadingPreview = false;
                this.cdr.detectChanges();

                const message = motDePasseAbsent
                    ? "Ce PDF est protégé et aucun mot de passe n'est enregistré pour cette pièce. Veuillez le saisir :"
                    : 'Le mot de passe enregistré pour cette pièce a été refusé par le fichier. Veuillez le saisir :';

                const pass = prompt(message);
                if (pass) {
                    this.isLoadingPreview = true;
                    this.loadPdfDocument(url, pass, true);
                }
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
                    this.renderTextLayer(page, viewport);
                    this.cdr.detectChanges();
                })
                .catch(() => {
                    this.isRenderingPdf = false;
                    this.isLoadingPreview = false;
                });
        });
    }

    /* Couche de texte superposée au canvas.

       Le canvas est une image : sans cette couche, il n'y a rien à sélectionner
       à la souris. pdf.js positionne ici des <span> transparents au-dessus de
       chaque mot — c'est ce que fait le visualiseur officiel — ce qui rend la
       sélection native possible.

       Sans texte natif (PDF scanné), getTextContent ne renvoie aucun élément :
       la couche reste vide et l'aperçu se comporte comme avant. */
    private renderTextLayer(page: any, viewport: any): void {
        const container = document.getElementById('pdf-text-layer');
        if (!container) return;

        // Toute nouvelle page annule la zone en cours de trace
        this.zoneOcr = null;
        this.zoneDepart = null;
        this.zoneEnTrace = false;

        // Un rendu peut être encore en cours (changement de page rapide, zoom
        // répété) : on l'annule avant de repartir, sinon les deux couches se
        // superposent.
        if (this.textLayerTask) {
            try { this.textLayerTask.cancel(); } catch { /* déjà terminé */ }
            this.textLayerTask = null;
        }
        container.replaceChildren();

        // pdf.js positionne les spans en calc(var(--total-scale-factor) * Npx) :
        // sans cette variable, tout le texte s'empile dans le coin haut-gauche.
        container.style.setProperty('--total-scale-factor', String(this.pdfScale));
        container.style.width = viewport.width + 'px';
        container.style.height = viewport.height + 'px';

        page.getTextContent().then((textContent: any) => {
            // Un PDF scanné ne renvoie aucun item : il n'y a pas de texte à
            // sélectionner, la capture passera par le tracé d'une zone + OCR.
            const aDuTexte = !!textContent?.items?.length;
            this.majDisponibiliteTexte(aDuTexte);
            if (!aDuTexte) return;

            const layer = new (pdfjsLib as any).TextLayer({
                textContentSource: textContent,
                container,
                viewport
            });
            this.textLayerTask = layer;
            layer.render().catch(() => { /* rendu annulé */ });
        }).catch(() => {
            // Page illisible côté texte : même traitement qu'un scan
            this.majDisponibiliteTexte(false);
        });
    }

    // ── Capture d'une sélection du PDF vers un champ Métadonnées ──

    /* Arme le champ : la prochaine sélection faite dans l'aperçu ira dedans. */
    armerCapture(item: any): void {
        this.captureCible = item;
    }

    /* Désarme : les sélections dans l'aperçu redeviennent sans effet. */
    desarmerCapture(event?: Event): void {
        event?.stopPropagation();
        this.captureCible = null;
    }

    get libelleCapture(): string {
        return this.captureCible?.lib_proprietes_docs || '';
    }

    /* Relâchement de la souris sur la couche de texte : on ajoute la sélection
       au champ armé. Le contenu existant n'est jamais écrasé — la valeur est
       complétée, ce qui permet de composer un champ à partir de plusieurs
       fragments du document. */
    onPdfTextSelection(): void {
        if (!this.captureCible) return;

        const selection = window.getSelection();
        const brut = selection?.toString() || '';
        if (!brut.trim()) return;

        // La sélection doit venir de la couche de texte, pas du formulaire
        const container = document.getElementById('pdf-text-layer');
        const ancre = selection?.anchorNode as Node | null;
        if (!container || !ancre || !container.contains(ancre)) return;

        this.injecterDansChampArme(brut);
        selection?.removeAllRanges();
    }

    /* Ajoute un fragment au champ armé, qu'il vienne de la couche de texte
       ou de l'OCR d'une zone. Le contenu existant n'est jamais écrasé :
       la valeur est complétée, ce qui permet de composer un champ à partir
       de plusieurs fragments du document. */
    private injecterDansChampArme(brut: string): void {
        const item = this.captureCible;
        if (!item) return;

        // Les retours à la ligne du PDF n'ont pas de sens dans un champ
        const texte = (brut || '').replace(/\s+/g, ' ').trim();
        if (!texte) return;

        const actuel = (item.value_proprietes_docs ?? '').toString();

        if (item.type_proprietes_docs === 'number') {
            // Champ numérique : on ne retient que les chiffres et le séparateur
            const chiffres = texte.replace(/[^0-9.,-]/g, '').replace(',', '.');
            if (!chiffres) return;
            item.value_proprietes_docs = actuel ? actuel + chiffres : chiffres;
        } else {
            item.value_proprietes_docs = actuel ? actuel + ' ' + texte : texte;
        }

        this.cdr.detectChanges();
    }

    // ── Capture par zone sur un PDF scanné (OCR local) ──────────

    /* Mémorise si la page courante offre du texte sélectionnable. Appelé
       depuis une promesse pdf.js : le rendu doit être déclenché à la main. */
    private majDisponibiliteTexte(disponible: boolean): void {
        if (this.pageTexteDisponible === disponible) return;
        this.pageTexteDisponible = disponible;
        this.cdr.detectChanges();
    }

    /* Vrai quand il faut proposer le tracé d'une zone plutôt que la
       sélection native : un champ est armé et la page n'a pas de texte. */
    get captureZoneActive(): boolean {
        return !!this.captureCible && !this.pageTexteDisponible;
    }

    onZoneMouseDown(event: MouseEvent): void {
        if (!this.captureZoneActive || this.ocrZoneEnCours) return;
        event.preventDefault();

        const point = this.pointDansCalque(event);
        this.zoneDepart = point;
        this.zoneEnTrace = true;
        this.zoneOcr = {x: point.x, y: point.y, w: 0, h: 0};
    }

    onZoneMouseMove(event: MouseEvent): void {
        if (!this.zoneEnTrace || !this.zoneDepart) return;

        const point = this.pointDansCalque(event);
        this.zoneOcr = {
            x: Math.min(this.zoneDepart.x, point.x),
            y: Math.min(this.zoneDepart.y, point.y),
            w: Math.abs(point.x - this.zoneDepart.x),
            h: Math.abs(point.y - this.zoneDepart.y)
        };
    }

    onZoneMouseUp(): void {
        if (!this.zoneEnTrace) return;
        this.zoneEnTrace = false;
        this.zoneDepart = null;

        const zone = this.zoneOcr;
        // Un simple clic ne doit pas déclencher un OCR : on exige une zone
        // assez grande pour contenir au moins quelques caractères.
        if (!zone || zone.w < 12 || zone.h < 8) {
            this.zoneOcr = null;
            return;
        }

        this.lancerOcrZone(zone);
    }

    /* Coordonnées du pointeur dans le repère du calque, qui recouvre
       exactement le canvas : la zone tracée reste juste quel que soit le
       zoom ou le défilement. */
    private pointDansCalque(event: MouseEvent): { x: number; y: number } {
        const calque = document.getElementById('pdf-zone-layer');
        const rect = calque?.getBoundingClientRect();
        if (!rect) return {x: 0, y: 0};
        return {
            x: Math.max(0, Math.min(rect.width, event.clientX - rect.left)),
            y: Math.max(0, Math.min(rect.height, event.clientY - rect.top))
        };
    }

    /* Découpe la zone dans le canvas, la remet à l'échelle pour l'OCR,
       puis injecte le texte reconnu dans le champ armé. */
    private async lancerOcrZone(zone: { x: number; y: number; w: number; h: number }): Promise<void> {
        const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement | null;
        if (!canvas) {
            this.zoneOcr = null;
            return;
        }

        // Le canvas est affiché à sa taille naturelle, mais on ne fait aucune
        // hypothèse : on convertit via le ratio réel rendu / affiché.
        const affiche = canvas.getBoundingClientRect();
        const ratioX = affiche.width ? canvas.width / affiche.width : 1;
        const ratioY = affiche.height ? canvas.height / affiche.height : 1;

        const sx = Math.round(zone.x * ratioX);
        const sy = Math.round(zone.y * ratioY);
        const sw = Math.round(zone.w * ratioX);
        const sh = Math.round(zone.h * ratioY);
        if (sw < 4 || sh < 4) {
            this.zoneOcr = null;
            return;
        }

        this.ocrZoneEnCours = true;
        this.ocrZoneProgres = 0;
        this.cdr.detectChanges();

        try {
            const image = this.preparerImageOcr(canvas, sx, sy, sw, sh);
            const worker = await this.obtenirOcrWorker();
            const resultat = await worker.recognize(image);
            const texte = resultat?.data?.text || '';

            if (texte.trim()) {
                this.injecterDansChampArme(texte);
            } else {
                this.toast.info(
                    'Aucun texte reconnu dans la zone. Essayez une zone plus large ou augmentez le zoom.',
                    'OCR'
                );
            }
        } catch (e: any) {
            console.error('[OCR zone] échec', e);
            // tesseract.js rejette parfois avec undefined (échec de chargement
            // du worker) : un message générique vaut mieux qu'un vide.
            const brut = e?.message ?? e;
            const detail = (brut ? brut.toString() : 'le worker OCR n\'a pas pu démarrer')
                .slice(0, 200);
            this.toast.error(
                "La reconnaissance de texte n'a pas pu aboutir sur cette zone. "
                + detail,
                'OCR',
                {timeOut: 12000}
            );
        } finally {
            this.ocrZoneEnCours = false;
            this.ocrZoneProgres = 0;
            this.zoneOcr = null;
            this.cdr.detectChanges();
        }
    }

    /* Recadre la zone et l'agrandit si elle est petite : Tesseract perd
       beaucoup de précision en dessous d'une trentaine de pixels de hauteur
       de ligne. Le résultat est passé en niveaux de gris contrastés, ce qui
       aide sur les fonds de scan jaunis. */
    private preparerImageOcr(
        source: HTMLCanvasElement, sx: number, sy: number, sw: number, sh: number
    ): HTMLCanvasElement {
        const facteur = Math.max(1, Math.min(4, 160 / Math.max(1, sh)));
        const cible = document.createElement('canvas');
        cible.width = Math.round(sw * facteur);
        cible.height = Math.round(sh * facteur);

        const ctx = cible.getContext('2d')!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, cible.width, cible.height);
        ctx.drawImage(source, sx, sy, sw, sh, 0, 0, cible.width, cible.height);

        try {
            const donnees = ctx.getImageData(0, 0, cible.width, cible.height);
            const px = donnees.data;
            for (let i = 0; i < px.length; i += 4) {
                const gris = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
                // Contraste autour du gris moyen, borné à [0, 255]
                const ajuste = Math.max(0, Math.min(255, (gris - 128) * 1.45 + 128));
                px[i] = px[i + 1] = px[i + 2] = ajuste;
            }
            ctx.putImageData(donnees, 0, 0);
        } catch { /* canvas souillé : on envoie l'image telle quelle */ }

        return cible;
    }

    /* Worker Tesseract paresseux : le chargement du cœur WASM et des données
       françaises coûte quelques secondes, on ne le fait qu'à la première
       zone puis on garde le worker pour les suivantes. */
    private obtenirOcrWorker(): Promise<any> {
        if (this.ocrWorker) return Promise.resolve(this.ocrWorker);
        if (this.ocrWorkerPromesse) return this.ocrWorkerPromesse;

        this.ocrWorkerPromesse = (async () => {
            // tesseract.js est publie en CommonJS avec un module.exports etale :
            // selon le bundler, l'import dynamique expose les fonctions a la
            // racine ou sous `default`. On accepte les deux formes.
            const mod: any = await import('tesseract.js');
            const createWorker = mod.createWorker ?? mod.default?.createWorker;
            if (typeof createWorker !== 'function') {
                throw new Error('createWorker introuvable dans tesseract.js');
            }

            // Un worker dont le script est introuvable échoue via onerror, et
            // tesseract.js rejette alors avec `event.message`, vide : on se
            // retrouve avec une erreur « undefined » impossible à lire. On
            // vérifie donc les fichiers d'abord, pour nommer le fautif.
            await this.verifierAssetsOcr();

            const worker = await createWorker('fra', 1, {
                workerPath: this.urlAssetOcr('assets/tesseract/worker.min.js'),
                corePath: this.urlAssetOcr(this.cheminCoeurOcr()),
                langPath: this.urlAssetOcr('assets/tesseract/lang'),
                // Les donnees de langue sont deployees NON compressees. Servi
                // en .gz, le fichier repart avec un en-tete Content-Encoding:
                // gzip (dev server Angular comme Nginx) : le navigateur le
                // decompresse deja et tesseract.js echoue en voulant le
                // decompresser une seconde fois.
                gzip: false,
                // Par defaut tesseract.js lance son worker depuis une URL blob:.
                // Le coeur WASM resout alors son fichier .wasm a cote du blob
                // au lieu de /assets/tesseract, et l'initialisation reste
                // bloquee indefiniment. Nos fichiers sont servis par la meme
                // origine : le worker peut etre charge directement.
                workerBlobURL: false,
                logger: (m: any) => {
                    if (m?.status === 'recognizing text') {
                        this.ocrZoneProgres = Math.round((m.progress || 0) * 100);
                        this.cdr.detectChanges();
                    }
                }
            });
            this.ocrWorker = worker;
            return worker;
        })();

        this.ocrWorkerPromesse.catch(() => {
            // L'échec ne doit pas condamner les tentatives suivantes
            this.ocrWorkerPromesse = null;
        });

        return this.ocrWorkerPromesse;
    }

    /* Contrôle que les fichiers OCR sont bien servis. Deux pièges courants :
       le serveur de développement n'a pas été redémarré depuis l'ajout des
       assets dans angular.json, ou le repli SPA renvoie index.html en 200
       pour un fichier absent — le worker recevrait alors du HTML à exécuter. */
    private async verifierAssetsOcr(): Promise<void> {
        const fichiers = [
            'assets/tesseract/worker.min.js',
            this.cheminCoeurOcr(),
            this.cheminCoeurOcr().replace(/\.js$/, '.wasm'),
            'assets/tesseract/lang/fra.traineddata'
        ];

        const controles = await Promise.all(fichiers.map(async (chemin) => {
            try {
                const rep = await fetch(this.urlAssetOcr(chemin), {method: 'HEAD'});
                const type = rep.headers.get('content-type') || '';
                if (!rep.ok) return `${chemin} (HTTP ${rep.status})`;
                if (type.includes('text/html')) return `${chemin} (page HTML reçue)`;
                return null;
            } catch {
                return `${chemin} (injoignable)`;
            }
        }));

        const manquants = controles.filter((c): c is string => c !== null);
        if (manquants.length) {
            throw new Error(
                'fichiers OCR non servis : ' + manquants.join(', ')
                + ' — redémarrez le serveur après la mise à jour des assets'
            );
        }
    }

    /* tesseract.js résout ses chemins contre window.location.href : un chemin
       relatif se retrouverait préfixé par la route courante
       (/documents/assets/…). On ancre donc tout sur le <base href> de
       l'application, ce qui reste juste si elle est servie sous un sous-chemin. */
    private urlAssetOcr(chemin: string): string {
        return new URL(chemin, document.baseURI).href;
    }

    /* Deux variantes du cœur sont embarquées : on désigne le fichier
       explicitement, sinon tesseract.js va chercher les versions tout-en-un
       de 4 Mo que nous ne déployons pas. */
    private cheminCoeurOcr(): string {
        // Sonde WebAssembly SIMD standard (wasm-feature-detect)
        const sondeSimd = new Uint8Array([
            0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123,
            3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11
        ]);
        let simd = false;
        try { simd = WebAssembly.validate(sondeSimd); } catch { simd = false; }
        return simd
            ? 'assets/tesseract/tesseract-core-simd-lstm.js'
            : 'assets/tesseract/tesseract-core-lstm.js';
    }

    // ── Navigation ───────────────────────────────────────────────
    prevPage() {
        if (this.currentPage > 1 && !this.isRenderingPdf)
            this.afficherPage(this.currentPage - 1);
    }

    nextPage() {
        if (this.currentPage < this.totalPages && !this.isRenderingPdf)
            this.afficherPage(this.currentPage + 1);
    }

    goToPage() {
        const p = Math.max(1, Math.min(this.totalPages, this.currentPageInput || 1));
        this.currentPageInput = p;
        if (p !== this.currentPage) this.afficherPage(p);
    }

    /* Affiche une page en recalculant d'abord l'échelle si le suivi
       automatique est actif : les pages d'un même PDF n'ont pas toujours le
       même format (planche A3 au milieu d'un document A4). */
    private afficherPage(pageNum: number): void {
        if (!this.pdfAutoFit) {
            this.renderPage(pageNum);
            return;
        }
        this.calculerEchelleLargeur(pageNum).then(echelle => {
            if (echelle !== null) this.pdfScale = echelle;
            this.renderPage(pageNum);
        });
    }

    // ── Zoom ─────────────────────────────────────────────────────
    zoomInPdf() {
        if (this.pdfScale >= 3 || this.isRenderingPdf) return;
        this.pdfAutoFit = false;
        this.pdfScale = parseFloat(Math.min(3, this.pdfScale + 0.25).toFixed(2));
        this.renderPage(this.currentPage);
    }

    zoomOutPdf() {
        if (this.pdfScale <= 0.25 || this.isRenderingPdf) return;
        this.pdfAutoFit = false;
        this.pdfScale = parseFloat(Math.max(0.25, this.pdfScale - 0.25).toFixed(2));
        this.renderPage(this.currentPage);
    }

    resetZoomPdf() {
        if (this.isRenderingPdf) return;
        this.pdfAutoFit = false;
        this.pdfScale = 1.0;
        this.renderPage(this.currentPage);
    }

    /** Ajuste à la largeur et réactive le suivi automatique. */
    fitWidthPdf() {
        if (!this.pdfDoc || this.isRenderingPdf) return;
        this.pdfAutoFit = true;
        this.calculerEchelleLargeur(this.currentPage).then(echelle => {
            if (echelle !== null) this.pdfScale = echelle;
            this.renderPage(this.currentPage);
        });
    }

    /* Échelle qui fait tenir la page dans la largeur utile du cadre.

       clientWidth exclut déjà l'ascenseur vertical ; on retire les 16px de
       padding de .pdf-canvas-wrapper de chaque côté. Retourne null tant que le
       cadre n'est pas mesurable (aperçu pas encore dans le DOM). */
    private calculerEchelleLargeur(pageNum: number): Promise<number | null> {
        const cadre = this.cadrePdf();
        if (!this.pdfDoc || !cadre) return Promise.resolve(null);
        const dispo = cadre.clientWidth - 32;
        if (dispo <= 0) return Promise.resolve(null);

        return this.pdfDoc.getPage(pageNum)
            .then((page: any) => {
                const viewport = page.getViewport({scale: 1, rotation: this.pdfRotation});
                if (!viewport.width) return null;
                const echelle = Math.min(3, Math.max(0.25, dispo / viewport.width));
                return parseFloat(echelle.toFixed(2));
            })
            .catch(() => null);
    }

    private cadrePdf(): HTMLElement | null {
        return this.pdfWrapper?.nativeElement
            ?? (document.querySelector('.pdf-canvas-wrapper') as HTMLElement | null);
    }

    /* Suit la largeur du cadre d'aperçu : redimensionnement de la fenêtre,
       déplacement du splitter, passage en plein écran, repli de la barre
       latérale… Un ResizeObserver couvre tous ces cas d'un seul coup. */
    private surveillerLargeurCadrePdf(): void {
        const cadre = this.cadrePdf();
        if (!cadre || typeof ResizeObserver === 'undefined') return;
        if (this.pdfWrapperObserve === cadre) return;

        this.pdfResizeObs?.disconnect();
        this.pdfResizeObs = new ResizeObserver(() => {
            if (!this.pdfAutoFit || !this.pdfDoc) return;
            // Anti-rebond : un glissement de splitter émet des dizaines
            // d'événements, on ne relance qu'un rendu à la fin du geste.
            clearTimeout(this.pdfFitTimer);
            this.pdfFitTimer = setTimeout(() => this.reajusterZoomAuto(), 150);
        });
        this.pdfResizeObs.observe(cadre);
        this.pdfWrapperObserve = cadre;
    }

    private reajusterZoomAuto(): void {
        if (!this.pdfAutoFit || !this.pdfDoc) return;
        if (this.isRenderingPdf) {
            // Rendu en cours : on repasse juste après.
            this.pdfFitTimer = setTimeout(() => this.reajusterZoomAuto(), 150);
            return;
        }
        this.calculerEchelleLargeur(this.currentPage).then(echelle => {
            if (echelle === null) return;
            if (Math.abs(echelle - this.pdfScale) < 0.02) return;
            this.pdfScale = echelle;
            this.renderPage(this.currentPage);
        });
    }

    // ── Rotation ─────────────────────────────────────────────────
    rotatePdf(dir: 'left' | 'right') {
        if (this.isRenderingPdf) return;
        this.pdfRotation = (this.pdfRotation + (dir === 'right' ? 90 : -90) + 360) % 360;
        this.afficherPage(this.currentPage);
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
        this.captureCible = null; // les champs sont reconstruits : plus rien à armer

        if (!event.value) return Promise.resolve();

        /* Le type peut être absent de la liste (série non résolue en
           modification) : sans garde, l'accès à dataPro casse l'écran. */
        const ligne = this.dataTypeDocument.find((d: any) => d.uid == event.value);
        if (ligne) {
            this.ligneTypeOfDoc = ligne;
            this.ligneTypeOfDoc.dataPro = (this.ligneTypeOfDoc.dataPro || []).map((d: any) => {
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

        return this.showCatOrder('', event.value, '');
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
        this.captureCible = null;
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
            // En modification, date_sig porte la date du jour (date de reprise)
            "date_sig":  moment().format('YYYY-MM-DD'),
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
        console.log("payload===",payload)
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
        this.previewFullscreen = false;
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
        // La promesse est rendue : en modification, les pièces du document ne
        // peuvent être rangées qu'une fois le plan de classement chargé.
        return this.httService.getData(url, false, this.users?.access_token || '')
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
        return this.httService.getData(`${environment.api_url}api/:saverayons?idsociete=${idsociete}&idrayon=${idrayon}&idsite=${idsite}`, false, this.users?.access_token || '')
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
        return this.httService.getData(`${environment.api_url}api/:saveboites?idsociete=${idsociete}&idrayon=${idrayon}&idsite=${idsite}`, false, this.users?.access_token || '')
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
        return this.httService.getData(`${environment.api_url}api/:save-categorie-plan-classement?idsociete=${idsociete}&idtype_document=${idtype_document}&idcategories=${idcategories}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloadSerie = false;
                if (res.body.status || res.body.success) {
                    this.dataSeriesRaw = res.body.data || [];
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
