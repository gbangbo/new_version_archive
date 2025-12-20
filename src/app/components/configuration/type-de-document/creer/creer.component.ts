import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import {environment} from "../../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {Select2Module} from "ng-select2-component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzInputModule, NzInputSearchEvent} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";

@Component({
    selector: 'app-creer',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzToolTipModule,
        NzSelectModule,
        Select2Module,
        NzTableModule, NzInputModule, NzIconModule, NzButtonModule, NzPopconfirmModule,],
    providers: [],
    templateUrl: './creer.component.html',
    styleUrl: './creer.component.scss',
})
export class CreerComponent implements OnInit {
    formDataTypeDoc!: FormGroup;
    dataTypeDocument: any = [];


    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    isLoad: boolean = false;
    i = 3;
    dataLigneFields: any = [
        {
            id: `1`,
            lib_proprietes_docs: 'numéro du document',
            type_proprietes_docs: 'text',
            default_proprietes_docs: false,  // clé 1-unique/ 0-null
            ligneDisabled: true,
            "active_proprietes_docs": 1,
            "define_proprietes_docs": 0,
        },
        {
            id: `2`,
            lib_proprietes_docs: 'Objet du document',
            type_proprietes_docs: 'textarea',
            default_proprietes_docs: false,
            ligneDisabled: true,
            "active_proprietes_docs": 1,
            "define_proprietes_docs": 0,
        },
        {
            id: `3`,
            lib_proprietes_docs: 'Date du document',
            type_proprietes_docs: 'date',
            default_proprietes_docs: false,
            ligneDisabled: true,
            "active_proprietes_docs": 1,
            "define_proprietes_docs": 0,
        }
    ]
    dataFields: any = [
        {
            label: 'Texte multi-ligne',
            value: 'textarea'
        },
        {
            label: 'Texte',
            value: 'text'
        },
        {
            label: 'Date',
            value: 'date'
        },
        {
            label: 'Numeric',
            value: 'number'
        },
        {
            label: 'Fichier',
            value: 'file'
        }
    ];

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService,
                private toast: ToastrService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.formDataTypeDoc = this.fb.group({
            action: [''],
            idtype_documents: [''],
            idsociete: [''],
            code_type_docs: [''],
            active_type_docs: ['1'], //1: actif, 0:Inactif
            etat_type_docs: [''], //1:publie, 0:Brouillon
            etat_localite: [''],
            etat_personnel: [''],
            etat_engagement: [''],
            libelle_type_docs: ['', Validators.required],
            dure_prearchive: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1), Validators.max(999)]],
            dure_conservatoire: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1), Validators.max(999)]],
        });

        this.typedocuments(this.users?.dataSociete?.uid, '');
    }

    submitForm(): void {
        this.errorTexte = ''
        console.log(this.dataLigneFields)


        let payload = {
            "action": 1,
            "idtype_documents": "",
            "idsociete": this.users?.dataSociete?.uid,
            "code_type_docs": this.dataLigneFields[0].lib_proprietes_docs,
            "libelle_type_docs": this.formDataTypeDoc.value.libelle_type_docs,
            "dure_prearchive": this.formDataTypeDoc.value.dure_prearchive,
            "dure_conservatoire": this.formDataTypeDoc.value.dure_conservatoire,
            "active_type_docs": 1,
            "etat_type_docs": this.formDataTypeDoc.value.etat_type_docs ? 1 : 0,
            "etat_localite": this.formDataTypeDoc.value.etat_localite ? 1 : 0,
            "etat_personnel": this.formDataTypeDoc.value.etat_personnel ? 1 : 0,
            "proprietes_docs": this.dataLigneFields.map((d: any) => {
                return {
                    ...d,
                    proprietes_select: d?.proprietes_select || []
                }
            })
        }
        console.log("payload ====", payload)

        // {
        //     "action": 0,
        //     "idtype_documents": "string",
        //     "idsociete": "string",
        //     "code_type_docs": "string",
        //     "libelle_type_docs": "string",
        //     "dure_prearchive": 0,
        //     "dure_conservatoire": 0,
        //     "active_type_docs": 0,
        //     "etat_type_docs": 0,
        //     "etat_localite": 0,
        //     "etat_personnel": 0,
        //     "proprietes_docs": [
        //     {
        //         "lib_proprietes_docs": "string",
        //         "type_proprietes_docs": "string",
        //         "default_proprietes_docs": "string",
        //         "active_proprietes_docs": 0,
        //         "define_proprietes_docs": 0,
        //         "proprietes_select": [
        //             {
        //                 "idvalues_select_pro": "string",
        //                 "value_proprietes_docs": "string"
        //             }
        //         ]
        //     }
        // ]
        // }


        if (this.formDataTypeDoc.valid) {
            this.isLoad = true;
            this.httService.postData(`${environment.api_url}api/:savetypedocuments`, payload, this.users?.access_token)
                .toPromise()
                .then((res: any) => {
                    this.isLoad = false;
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    if (res.body.status) {
                        this.formDataTypeDoc.reset({});
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
            Object.values(this.formDataTypeDoc.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    resetForm(): void {
        this.errorTexte = '';
        this.formDataTypeDoc.reset({});
    }

    typedocuments(idsociete: string = '', idtypedocuments: string = '') {
        this.isloading = true;
        this.dataTypeDocument = [];
        this.httService.getData(`${environment.api_url}api/:savetypedocuments?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataTypeDocument = res.body.data;
                    console.log(res.body.data)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }


    addRow(): void {
        this.i++;
        this.dataLigneFields = [
            ...this.dataLigneFields,
            {
                id: `${this.i}`,
                lib_proprietes_docs: '',
                type_proprietes_docs: '',
                "default_proprietes_docs": false,
                "active_proprietes_docs": 1,
                "define_proprietes_docs": 0,
                ligneDisabled: false
            }
        ];
    }

    deleteRow(data: any): void {
        this.dataLigneFields = this.dataLigneFields.filter((d: any) => d.id !== data.id);
    }

    addSubFields($event: any, i: number) {
        if (!Array.isArray(this.dataLigneFields[i].proprietes_select)) {
            this.dataLigneFields[i].proprietes_select = [];
        }

        // Ajouter un nouvel élément à sousTableData
        this.dataLigneFields[i].proprietes_select = [
            ...this.dataLigneFields[i].proprietes_select,
            {
                idvalues_select_pro: '',
                value_proprietes_docs: ''
            }
        ];


        console.log("this.dataLigneFields[i] ===", this.dataLigneFields[i])
    }
}
