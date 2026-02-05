import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {Select2Module} from "ng-select2-component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {SvgIconComponent} from "../../../shared/components/ui/svg-icon/svg-icon.component";
import {TypeDocModalComponent} from "./type-doc-modal/type-doc-modal.component";
import {TableClickedAction, TableConfigs} from "../../../shared/interface/common";
import {SupportDB} from "../../../shared/interface/support-ticket";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import moment from "moment";
import Swal from "sweetalert2";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-type-de-document',
    imports: [
        CommonModule,
        CardComponent,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzToolTipModule,
        NzSelectModule,
        Select2Module,
        NzTableModule,
        NgxSpinnerModule,
        TypeDocModalComponent, TableComponent],
    providers: [],
    templateUrl: './type-de-document.component.html',
    styleUrl: './type-de-document.component.scss',
})

//SvgIconComponent,
export class TypeDeDocumentComponent implements OnInit {
    societeDirection!: FormGroup;
    dataTypeDocument: any = [];
    dataOneLigne: any = [];
    modalOpen: boolean = false;

    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    isLoad: boolean = false;
    public activeTab = 'type_doc';
    tableConfig: TableConfigs = {
        columns: [
            {title: 'Type de document', field_value: 'libelle_type_docs', sort: true},
            {title: 'Délais au service (ans)', field_value: 'dure_prearchive', sort: true},
            {title: 'Délais de conservation aux archives (ans)', field_value: 'dure_conservatoire', sort: true},
            {title: 'Créé le', field_value: 'created_at', sort: true},
        ],
        data: [] as SupportDB[],
        row_action: [
            {
                label: "Edit",
                action_to_perform: "edit",
                icon: "edit-content",
                class: "btn-sm"
            },
            {
                label: "Consult",
                action_to_perform: "consult",
                icon: "download-files",
                class: "btn-sm"
            },
            {
                label: "Delete",
                action_to_perform: "delete",
                icon: "trash1",
                modal: true,
                model_text: 'Voulez-vous vraiment supprimer le type de document ?'
            }
        ],

    };
    titleCarde: string = 'TYPE DE DOCUMENT';
    actionLoad: string = "Chargement";


    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService,
                private spinner: NgxSpinnerService,
                private toast: ToastrService) {

    }


    ngOnInit(): void {

        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.societeDirection = this.fb.group({
            action: [''],
            iddirection: [''],
            idsociete: [''],
            active: [''],
            sigle_direction: ['', Validators.required],
            libelle_direction: ['', Validators.required]
        });
        this.typedocuments(this.users?.dataSociete?.uid, '');
    }

    handleTab(value: string) {
        this.activeTab = value;
        switch (value) {
            case 'type_doc':
                this.titleCarde = 'TYPE DE DOCUMENT';
                break;
            case 'plan_class':
                this.titleCarde = 'PLAN DE CLASSEMENT';
                break;
        }
    }

    submitForm(): void {
        this.errorTexte = ''

        if (this.societeDirection.valid) {
            this.isLoad = true;
            this.societeDirection.value.action = this.societeDirection.value.action ? this.societeDirection.value.action : 1;
            this.societeDirection.value.idsociete = this.societeDirection.value.idsociete ? this.societeDirection.value.idsociete : this.users?.dataSociete?.uid
            console.log(this.societeDirection.value)
            this.httService.postData(`${environment.api_url}auth/:savedirection`, this.societeDirection.value, this.users?.access_token)
                .toPromise()
                .then((res: any) => {
                    this.isLoad = false;
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    if (res.body.status) {
                        this.societeDirection.reset({});
                        this.typedocuments(this.users?.dataSociete?.uid, '');
                        this.toast.success(`${res.body.message}`, '',
                            {
                                positionClass: 'toast-top-right',
                                closeButton: true,
                                timeOut: 3000
                            })
                    }
                })
                .catch((err) => {
                    this.isLoad = false;
                    console.log(err?.error)
                    this.toast.error(`${err?.error?.err?.message || 'Une erreur est survenue.'} `, '',
                        {
                            positionClass: 'toast-top-right',
                            closeButton: true,
                            timeOut: 3000
                        })
                    setTimeout(() => {
                        this.errorTexte = `${err?.error?.err?.message || 'Une erreur est survenue.'} `;
                    }, 3000)
                });
        } else {
            Object.values(this.societeDirection.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    resetForm(): void {
        this.errorTexte = '';
        this.societeDirection.reset({});
    }

    typedocuments(idsociete: string = '', idtypedocuments: string = '') {
        this.isloading = true;
        this.tableConfig.data = [];
        this.httService.getData(`${environment.api_url}api/:savetypedocuments?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.tableConfig = {
                        ...this.tableConfig,
                        data: res.body.data.map((e: any) => {
                            return {...e, created_at: moment(e.created_at).format('DD/MM/YYYY')}
                        })
                    };
                    console.log("Les types de docs ==========", res.body.data)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    handleAction(value: TableClickedAction) {
        switch (value.action_to_perform) {
            case 'edit':
                this.modalOpen = true;
                this.dataOneLigne = value.data;
                break;

            case 'consult':
                this.exportModel(value.data);
                break;

            case 'delete':
                console.log("Je suis l'option de suppression : ", value.data)

                let payload = {
                    "idtype_documents": value.data.uid,
                    "idsociete": this.users?.dataSociete?.uid,
                }
                this.actionLoad = `Suppression de ${value.data.libelle_type_docs} encours`
                this.spinner.show();
                console.log("payload ======", payload)
                this.httService.deleteData(`${environment.api_url}api/:savetypedocuments`, payload, this.users?.access_token)
                    .toPromise()
                    .then((res: any) => {
                        this.spinner.hide();
                        if (res.body.status) {
                            this.typedocuments(this.users?.dataSociete?.uid, '');
                            Swal.fire({
                                title: res?.body?.message,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                        }
                    })
                    .catch((err) => {
                        this.spinner.hide();
                        Swal.fire({
                            title: err?.error?.err?.message || "Une erreur est survenue !",
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    });

                break;

            default:
            //console.warn('⚠️ Action non gérée:', event.action);
        }
    }

    actionBtn(data: any) {
        this.errorTexte = ''
        let payload = {
            action: 2,
            iddirection: data.uid,
            idsociete: data.datasociete.uid,
            sigle_direction: data.sigle_direction,
            libelle_direction: data.libelle_direction
        }
        console.log(data)
        this.societeDirection.setValue(payload);
    }

    handleModal(value: boolean) {
        if (value) {
            this.typedocuments(this.users?.dataSociete?.uid, '');
        }
        this.modalOpen = false;
    }

    handleExport(event: { type: string, data: any[] }) {
        console.log('Type d\'export:', event.type);
        console.log('Données:', event.data);

        // Logique personnalisée selon le type
        if (event.type === 'csv') {
            // Traitement personnalisé pour CSV
            console.log('Export CSV personnalisé');
        }

        if (event.type === 'pdf') {
            // Traitement personnalisé pour PDF
            console.log('Export PDF personnalisé');
        }
    }

    openModal() {
        this.modalOpen = true;
        this.dataOneLigne = {};
    }

    exportModel(data: any) {
        console.log("Data a telecharger ====", data)
        let dataExcele: any = [
            {
                'code_docs': '',
                'date_docs': '',
                'lib_docs': ''
            }
        ];
        data.dataPro.forEach((event: any) => {
            if (
                event?.lib_proprietes_docs &&
                ![
                    'numéro du document',
                    'objet du document',
                    'date du document'
                ].includes(event.lib_proprietes_docs.toLowerCase())
            ) {
                dataExcele.push({
                    [event.lib_proprietes_docs]: ''
                });
            }
        });

        console.log("dataExcele ====", dataExcele)
        // Si vous avez installé xlsx: npm install xlsx
        import('xlsx').then(XLSX => {
            const worksheet = XLSX.utils.json_to_sheet(dataExcele);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            XLSX.writeFile(workbook, `model_${data.libelle_type_docs}_${new Date().getTime()}.xlsx`);
        }).catch(() => {
            console.error('xlsx library not found. Install it with: npm install xlsx');
        });
    }
}
