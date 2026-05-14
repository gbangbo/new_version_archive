import {Component, ViewChild, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {Select2Data, Select2Module} from "ng-select2-component";
import {DropzoneConfigInterface, DropzoneModule, DropzoneDirective} from "ngx-dropzone-wrapper";
import {Editor, NgxEditorModule} from "ngx-editor";
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {addBlogCategory, blogType} from '../../../shared/data/blog';
import {DropzoneComponent} from 'ngx-dropzone-wrapper';
import {environment} from "../../../../environments/environment";
import {Authorization} from "../../../protect/authorization.service";
import {FormBuilder} from "@angular/forms";
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
    disabled?: boolean;
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
    level: number;
    disabled: boolean;
}

@Component({
    selector: 'app-creer-un-document',
    imports: [Select2Module,
        DropzoneModule,
        NgxEditorModule,
        CardComponent,
        NzSplitterModule,
        NzIconModule,
        NzTreeViewModule,
        FormsModule,
        NzSelectModule,
        NzDatePickerModule
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

    private transformer = (node: FoodNode, level: number): ExampleFlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        extension: node?.extension || '',
        url_file: node?.url_file || '',
        desc_ocr_text: node?.desc_ocr_text || '',
        nombre_page: node?.nombre_page || '',
        uid: node?.uid || '',
        iduser_save: node?.iduser_save || '',
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
    uidTypeDocument: string = ''
    devis: string = ''
    ndate: string = ''

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
        this.typedocuments(this.users?.dataSociete?.uid, '');
        console.log(this.users)

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
                console.log(res.body)
                if (res.body.status) {
                    this.dataFileTemps = res.body.data;
                    TREE_DATA[0] = {
                        ...TREE_DATA[0],
                        children: res.body.data.map((d: any) => ({
                            ...d,
                            name: d.name_file_docs,
                            extension: this.getFileExtension(d?.url_file)
                        }))
                    };
                    this.dataSource.setData(TREE_DATA);
                    console.log(res.body.data)
                    setTimeout(() => {
                        this.treeControl.expand(this.getNode('Fichiers')!);
                    }, 300);
                    this.cdr.detectChanges();
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    onSending(event: any) {
        const [file, xhr, formData] = event;
        console.log("Envoi du fichier:", file.name);
        // Démarrer le loader
        this.isUploading = true;
        this.currentFileName = file.name;
        this.uploadProgress = 0;
        // Vérifier si les données utilisateur sont disponibles
        if (this.users && this.users.dataSociete && this.users.uid) {

            // Ajouter des données supplémentaires au formData
            formData.append("action", 1);
            formData.append("idsociete", this.users.dataSociete.uid);
            formData.append("idfile_temp", "");
            formData.append("iduser_file_temp", this.users.uid);
            formData.append("statut_ocr", 1);
            formData.append("lib_file_temp", file);

            // Ajouter un en-tête Authorization à la requête XHR
            xhr.setRequestHeader("Authorization", `Bearer ${this.users?.access_token}`);
            // xhr.setRequestHeader("Content-Type", "multipart/form-data");
            // Optionnel : Si tu veux afficher les données ajoutées au formData pour vérifier
            console.log(" file:=========", file);
            console.log("Form Data ajouté:", formData);
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
        console.log("Upload réussi:", file.name, response);

        this.uploadedFiles++;

        // Cacher le loader après un court délai
        setTimeout(() => {
            this.isUploading = false;
            this.uploadProgress = 0;
            this.currentFileName = '';
            this.loadFileTemps(this.users?.dataSociete?.uid, this.users?.uid);
        }, 500);
    }

    onError(event: any) {
        const [file, errorMessage] = event;
        console.error("Erreur d'upload:", errorMessage);

        // Cacher le loader en cas d'erreur
        this.isUploading = false;
        this.uploadProgress = 0;
        console.error("Erreur d'upload:", errorMessage);
    }

    onDropzoneInit(dropzone: any) {
        console.log('Dropzone initialisé', dropzone);
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
        // Ne sélectionner que les fichiers (pas les dossiers)
        if (!node.children) {
            this.selectListSelection.toggle(node);
            this.selectedFile = node;
            this.getSafeUrl(node.url_file)
        } else {
            // Pour les dossiers, juste toggle l'expansion
            this.selectListSelection.toggle(node);
            this.selectedFile = null;
        }
    }

    // Sécuriser l'URL pour l'iframe (pour PDF et images locales)
    getSafeUrl(url: string) {

        // On remplace l'adresse absolue par le chemin relatif du proxy
        // Si vous avez choisi l'Option A (intercepter /medias) :
        const proxyUrl = environment.production ? url : url.replace('http://api-ged.archivepro.ci', '');

        console.log('URL via Proxy:', proxyUrl);

        const extension = proxyUrl.split('.').pop()?.toLowerCase();

        if (extension === 'pdf') {
            this.renderPdf(proxyUrl); // On passe l'URL proxifiée
        } else if (['jpg', 'jpeg', 'png'].includes(extension!)) {
            this.renderImage(proxyUrl);
        }
    }

    renderPdf(url: string) {
        // On passe un objet de chargement
        const loadingTask = pdfjsLib.getDocument({
            url: url,
            // Si vous avez un mot de passe connu, mettez-le ici :
            password: 'archive2025'
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

                page.render({canvasContext: context!, viewport: viewport});
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

    typedocuments(idsociete: string = '', idtypedocuments: string = '') {
        this.dataTypeDocument = [];
        this.httService.getData(`${environment.api_url}api/:savetypedocuments?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                console.log("res.body ====", res.body)
                if (res.body.status) {
                    this.dataTypeDocument = res.body.data;
                    console.log(res.body.data)
                }
            })
            .catch((err) => {
            });

    }

    changeType(event: any) {
        this.ligneTypeOfDoc = [];
        if (!event) return;
        this.ligneTypeOfDoc = this.dataTypeDocument.find((d: any) => d.uid == event);
        this.ligneTypeOfDoc.dataPro = this.ligneTypeOfDoc.dataPro.map((d: any) => {
            return {
                ...d,
                lib_proprietes_docs: this.capitalize(d.lib_proprietes_docs)
            }
        })
        console.log("event===", event)
        console.log(this.ligneTypeOfDoc)
    }

    capitalize(str: string | null | undefined): string {
        if (!str) return '';
        str = str.trim().toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

}
