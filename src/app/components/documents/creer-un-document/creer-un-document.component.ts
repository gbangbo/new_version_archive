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
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";
import {SvgIconComponent} from "../../../shared/components/ui/svg-icon/svg-icon.component";
import Swal from 'sweetalert2';
import moment from "moment";
// Désactiver l'auto-découverte AU NIVEAU MODULE (en dehors de la classe)
Dropzone.autoDiscover = false;

interface FoodNode {
    name: string;
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
        NzDatePickerModule, OwlDateTimeModule,
        OwlNativeDateTimeModule, NzTagModule, NzPopoverModule, NzTreeSelectModule, SvgIconComponent
    ],
    templateUrl: './creer-un-document.component.html',
    styleUrl: './creer-un-document.component.scss',
})
export class CreerUnDocumentComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(DropzoneDirective, {static: false}) dropzoneDirective: DropzoneDirective;

    @ViewChild('viewerContainer', {static: false})
    viewerContainer!: ElementRef;

    @ViewChild('pdfCanvas', {static: false})
    pdfCanvas!: ElementRef<HTMLCanvasElement>;


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
        url: '/api/saveuploadfile-temps',
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

    private transformer = (node: FoodNode, level: number): ExampleFlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
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


    /*

     */

    archiveStatus: string = 'courante';
    documentStatus: string = 'privee';
    applyOCR: boolean = false;
    notifyBeneficiary: boolean = false;
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
        date_docs: new FormControl('', Validators.required),
        publishe: new FormControl('', Validators.required),
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
        sendmail: new FormControl('',),
    })
    loadingType: boolean = false;
    loadingService: boolean = false;
    loadingBoite: boolean = false;
    dataServices: any;


    value: string[] = ['0-0-0'];
    dataOrg: any = [];
    dataRayon: any = [];
    dataBoites: any = [];
    isload: boolean = false;
    dataSites: any = [];

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService,
                private toast: ToastrService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
        //  this.dataSource.setData(TREE_DATA);

    }

    ngOnInit(): void {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
        this.editor = new Editor();
        this.editor2 = new Editor();
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.loadFileTemps(this.users?.dataSociete?.uid, this.users?.uid);
        this.showTypeDoc(this.users?.datasociete?.uid, '');
        this.showOrganigramme(this.users?.datasociete?.uid, '');
        this.showSites(this.users?.datasociete?.uid, '');
        // Forcer la mise à jour de l'icône dossier à chaque toggle
        this.treeControl.expansionModel.changed.subscribe(() => setTimeout(() => this.cdr.detectChanges(), 0));
    }

    hasChild = (_: number, node: ExampleFlatNode): boolean => node.expandable;


    getNode(name: string): ExampleFlatNode | null {
        return this.treeControl.dataNodes.find(n => n.name === name) || null;
    }

    initDropzone() {
        const element = document.getElementById("multiFileUpload");
        if (!element) {
            console.error("Élément avec l'ID 'multiFileUpload' introuvable");
            return;
        }

        console.log("Élément trouvé, initialisation de Dropzone");

        // Détruire l'instance existante si elle existe
        if ((element as any).dropzone) {
            (element as any).dropzone.destroy();
        }

        this.dropzoneInstance = new Dropzone("#multiFileUpload", this.config);

        // Événement 'addedfile' - quand un fichier est ajouté
        this.dropzoneInstance.on("addedfile", (file: any) => {
            console.log("Fichier ajouté:", file.name);
        });

        // Événement 'sending'
        this.dropzoneInstance.on("sending", (file: any, xhr: any, formData: any) => {
            console.log("Envoi du fichier:", file.name);

            if (this.users && this.users.dataSociete && this.users.uid) {
                formData.append("action", 1);
                formData.append("idsociete", this.users.dataSociete.uid);
                formData.append("token", `Bearer ${this.users?.access_token}`);
                formData.append("iduser_file_temp", this.users.uid);
                formData.append("statut_ocr", 1);
                formData.append("idfile_temp", "");
                formData.append("lib_file_temp", "Fichier de Build__1");
                formData.append("date", new Date().toISOString());
            } else {
                console.error("Les données utilisateur ne sont pas disponibles !");
            }
        });

        // Événement 'success'
        this.dropzoneInstance.on("success", (file: any, response: any) => {
            console.log("Upload réussi:", file.name, response);
            // NE PAS ouvrir l'explorateur ici !
        });

        // Événement 'complete' - après l'upload (succès ou échec)
        this.dropzoneInstance.on("complete", (file: any) => {
            console.log("Upload terminé:", file.name);
            // NE PAS ouvrir l'explorateur ici !
        });

        // Événement 'queuecomplete' - quand tous les uploads sont terminés
        this.dropzoneInstance.on("queuecomplete", () => {
            console.log("Tous les uploads sont terminés");
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
                    console.log("all file ", res.body.data)
                    if (this.treeData.length > 0) {
                        this.injectFilesIntoLastNode();
                        this.dataSource.setData([...this.treeData]);
                        setTimeout(() => this.treeControl.expandAll(), 300);
                        this.cdr.detectChanges();
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
            extension: this.getFileExtension(d?.url_file),
            desc_ocr_text: d.desc_ocr_text,
            nombre_page: d.nombre_page,
            password_file: d.password_file,
            iduser_save: d.iduser_save,
            isFile: true,
            disabled: false,
            children: undefined
        }));
    }

    private injectFilesIntoLastNode() {
        if (!this.treeData?.length || !this.dataFileTemps?.length) return;
        const lastNode = this.treeData[this.treeData.length - 1];
        const existingChildren = (lastNode.children || []).filter((n: any) => !n.isFile);
        lastNode.children = [...existingChildren, ...this.mapFilesToTreeNodes()];
    }

    async deleteFile(node: any, event: Event) {
        event.stopPropagation();

        console.log("to delete ::::", node)

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
        formData.append('action', '2');
        formData.append('idfile_temp', node.uid ?? '');
        formData.append('idsociete', this.users?.datasociete?.uid ?? '');

        this.httService
            .postDataMultipart(`${environment.api_url}api/:saveuploadfile-temps`, formData, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
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

            // Ajouter des données supplémentaires au formData
            formData.append("action", 1);
            formData.append("idsociete", this.users.datasociete.uid);
            formData.append("idfile_temp", "");
            formData.append("iduser_file_temp", this.users.uid);
            formData.append("statut_ocr", this.applyOCR ? 1 : 0);
            formData.append("lib_file_temp", file);

            // Ajouter un en-tête Authorization à la requête XHR
            xhr.setRequestHeader("Authorization", `Bearer ${this.users?.access_token}`);
            // xhr.setRequestHeader("Content-Type", "multipart/form-data");
        }
    }

    onUploadProgress(event: any) {
        const [file, progress] = event;

        // Mettre à jour la barre de progression
        this.uploadProgress = Math.round(progress);
        console.log(`Progress: ${this.uploadProgress}% - ${file.name}`);
    }

    onSuccess(event: any) {
        const [file, response] = event;

        this.isUploading = false;
        this.uploadProgress = 0;
        this.currentFileName = '';

        // Vérifier le statut retourné par l'API (HTTP 200 ne garantit pas le succès métier)
        const isSuccess = response?.status === true || response?.success === true;

        if (!isSuccess) {
            const msg = response?.message || 'Échec de l\'enregistrement du fichier.';
            this.toast.error(msg, 'Erreur', {timeOut: 5000});

            // Marquer le fichier en erreur dans le dropzone puis le retirer après 3 s
            if (this.dropzoneInstance) {
                this.dropzoneInstance.emit('error', file, msg);
                setTimeout(() => this.dropzoneInstance?.removeFile(file), 3000);
            }
            return;
        }

        this.uploadedFiles++;
        this.toast.success('Fichier enregistré avec succès.', 'Succès');
        this.loadFileTemps(this.users?.dataSociete?.uid, this.users?.uid);
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

    // Pour gérer la sélection
    onNodeClick(node: any) {
        if (!node.children) {
            console.log("node ====", node)
            this.selectListSelection.toggle(node);
            this.selectedFile = node;
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
            this.isLoadingPreview = false;
        }

        console.log("desc_ocr_text  ===", node)
    }

    onPreviewLoaded(): void {
        setTimeout(() => {
            this.isLoadingPreview = false;
        }, 0);
    }

    onOfficePreviewLoaded(): void {
        if (this.officeLoaderTimer) {
            clearTimeout(this.officeLoaderTimer);
            this.officeLoaderTimer = null;
        }
        // Petit délai pour que l'iframe ait le temps d'afficher son contenu
        setTimeout(() => {
            this.isLoadingPreview = false;
        }, 800);
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

        // On remplace l'adresse absolue par le chemin relatif du proxy
        // Si vous avez choisi l'Option A (intercepter /medias) :
        const proxyUrl = environment.production ? data.url_file : data.url_file.replace('http://api-ged.archivepro.ci', '');

        console.log('URL via Proxy:', proxyUrl);

        const extension = proxyUrl.split('.').pop()?.toLowerCase();

        if (extension === 'pdf') {
            this.renderPdf(proxyUrl, data.password_file);
        }
    }

    renderPdf(url: string, pwd: string) {

        console.log("url ====", url)

        // On passe un objet de chargement
        const loadingTask = pdfjsLib.getDocument({
            url: url,
            // Si vous avez un mot de passe connu, mettez-le ici :
            password: pwd
        });

        loadingTask.promise.then((pdf: any) => {
            pdf.getPage(1).then((page: any) => {
                const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
                if (!canvas) {
                    console.error("Canvas 'pdf-canvas' introuvable dans le DOM");
                    return;
                }
                const context = canvas.getContext('2d');
                const viewport = page.getViewport({scale: 1.5});

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                page.render({canvasContext: context!, viewport: viewport}).promise
                    .then(() => setTimeout(() => {
                        this.isLoadingPreview = false;
                        this.cdr.detectChanges();
                    }, 0))
                    .catch(() => setTimeout(() => {
                        this.isLoadingPreview = false;
                    }, 0));
            });
        }).catch((error: any) => {
            if (error.name === 'PasswordException') {
                // Optionnel : demander le mot de passe dynamiquement
                const pass = prompt('Ce PDF est protégé. Veuillez saisir le mot de passe :');
                if (pass) {
                    this.renderPdfWithPassword(url, pass);
                }
            } else {
                console.error('Erreur de chargement du PDF:', error);
            }
        });
    }

// Fonction utilitaire pour retenter avec mot de passe
    renderPdfWithPassword(url: string, password: string) {
        pdfjsLib.getDocument({url, password}).promise.then((pdf: any) => {
            // ... recopier la logique de rendu ici ...
        });
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


    showTypeDoc(idsociete: string = '', idtypedocuments: string = '') {
        this.dataTypeDocument = [];
        this.loadingType = true;
        this.httService.getData(`${environment.api_url}api/:savetypedocuments?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                console.log("Type doc ====", res.body)
                this.loadingType = false;
                if (res.body.status) {
                    this.dataTypeDocument = res.body.data.map((d: any) => {
                        return {
                            ...d,
                            label: d.libelle_type_docs,
                            value: d.uid
                        }
                    });
                    console.log(res.body.data)
                }
            })
            .catch((err) => {
                this.loadingType = false;
            });

    }

    changeType(event: any) {
        this.ligneTypeOfDoc = [];
        console.log("event===", event.value)

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

        console.log("pour les meta donnees ", this.ligneTypeOfDoc.dataPro)
    }

    capitalize(str: string | null | undefined): string {
        if (!str) return '';
        str = str.trim().toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    resetAfterSave(): void {
        this.validationForm.reset({
            typeArchivage: 'courante',
            publishe: '',
        });
        this.validationForm.markAsPristine();
        this.validationForm.markAsUntouched();

        this.ligneTypeOfDoc = [];
        this.dynamicValues = {};
        this.archiveStatus = 'courante';
        this.documentStatus = 'privee';
        this.applyOCR = false;
        this.notifyBeneficiary = false;
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

        console.log("ligneTypeOfDoc?.dataPro =====", this.ligneTypeOfDoc?.dataPro);

        const payload = {
            "action": 1,
            "iddocuments": "",
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
            "statut_docs": 0,
            "publishe": true,
            "fulltexts_docs": "",
            "idproprietaire": 0,
            "sendmail": this.validationForm.value.sendmail || false
        }
        console.log("payload =====", payload);
        this.isloading = true;
        this.httService.postData(`${environment.api_url}api/:savedocuments`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("res.body ===", res.body)
                if (res.body.status || res.body.success) {
                    this.resetAfterSave();
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
                this.isloading = false;
                console.log("err", err)
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
        this.dataSource.setData([]);
        this.selectedFile = null;
        this.isLoadingPreview = false;
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

        const url = `${environment.api_url}api/save-categorie-plan-classement?${params.toString()}`;
        this.httService.getData(url, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                console.log("Plan de classement ====", res.body)
                if (res.body.status || res.body.success) {
                    const mapped = this.mapApiToTree(res.body.data);
                    if (!mapped?.length) {
                        this.resetTree();
                        return;
                    }
                    this.treeData = mapped;
                    this.injectFilesIntoLastNode();
                    this.dataSource.setData([...this.treeData]);
                    setTimeout(() => this.treeControl.expandAll(), 300);
                    console.log("dataSource ===", this.dataSource)
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
                    console.log('service===', res.body.data)
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
        console.log($event);
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


    setArchive(value: 'courante' | 'definitive'): void {
        this.validationForm.get('typeArchivage')?.setValue(value);
    }

    disableFutureDates = (date: Date): boolean => {
        return date > new Date();
    };

    generateDocumentNumber(): void {
        const now = new Date();
        const pad = (n: number) => n.toString().padStart(2, '0');
        const datePart = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
        const randPart = Math.random().toString(36).substring(2, 7).toUpperCase();
        const code = `DOC-${datePart}-${randPart}`;
        this.validationForm.get('code_docs')?.setValue(code);
        this.validationForm.get('code_docs')?.markAsTouched();
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
}
