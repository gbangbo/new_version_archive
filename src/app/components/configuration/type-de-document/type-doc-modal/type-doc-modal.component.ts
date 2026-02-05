import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";
import {CardComponent} from "../../../../shared/components/ui/card/card.component";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {TooltipComponent} from "../../../../shared/components/ui/tooltip/tooltip.component";
import {audios} from '../../../../shared/data/search-result';
import {Select2Module} from "ng-select2-component";

@Component({
    selector: 'app-type-doc-modal',
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardComponent,
        NzToolTipModule,
        NzSwitchModule,
        TooltipComponent, Select2Module],
    templateUrl: './type-doc-modal.component.html',
    styleUrl: './type-doc-modal.component.scss',
})
export class TypeDocModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public numberingTabs = [
        {
            id: 1,
            title: 'Info. de base',
            value: 'Info. de base',
            class: 'one stepper step editing'
        },
        {
            id: 2,
            title: 'Formulaire',
            value: 'Formulaire',
            class: 'two step'
        },
        {
            id: 3,
            title: 'Feedback',
            value: 'feedback',
            class: 'three step'
        }
    ];
    public activeTab: number = 1;


    public validationForm = new FormGroup({
        libconsigne: new FormControl('', Validators.required),
        uid: new FormControl('',),

    })
    errorTexte: string = '';
    isLoad: boolean = false;

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    formDataTypeDoc!: FormGroup;
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
    audios = audios;

    constructor(private autor: Authorization, private fb: FormBuilder, private httService: HttpService) {
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
            uid: [''],
            libelle_type_docs: ['', Validators.required],
            dure_prearchive: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1), Validators.max(999)]],
            dure_conservatoire: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1), Validators.max(999)]],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            this.formDataTypeDoc.patchValue(changes['dataLigne']?.currentValue);
            this.dataLigneFields = changes['dataLigne']?.currentValue?.dataPro.map((d: any, index: number) => {
                return {
                    ...d,
                    proprietes_select: d?.dataValueSelectPro,
                    ligneDisabled: [0, 1, 2].includes(index),
                    default_proprietes_docs: d?.default_proprietes_docs.toString().toLowerCase() != 'false'
                }
            });

            console.log("this.dataLigneFields  :::", this.dataLigneFields)
            console.log("Les variables du type de document  :::", changes['dataLigne']?.currentValue)
        }
    }


    submitForm(): void {
        this.errorTexte = ''
        let payload = {
            "action": this.formDataTypeDoc.value.uid ? 2 : 1,
            "idtype_documents": this.formDataTypeDoc.value.uid || '',
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
        this.isLoad = true;
        console.log("payload ======", payload)
        this.httService.postData(`${environment.api_url}api/:savetypedocuments`, payload, this.users?.access_token)
            .toPromise()
            .then((res: any) => {
                this.isLoad = false;
                if (res.body.status) {
                    this.formDataTypeDoc.reset({});
                    this.closeModal(true);
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            })
            .catch((err) => {
                this.isLoad = false;
                // this.toast.error(`${err?.error?.err?.message || 'Une erreur est survenue.'} `, '',
                //     {
                //         positionClass: 'toast-top-right',
                //         closeButton: true,
                //         timeOut: 3000
                //     })
                setTimeout(() => {
                    this.errorTexte = `${err?.error?.err?.message || 'Une erreur est survenue.'} `;
                }, 3000)
            });

    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }

    handleStep(value: number) {
        if (value === -1) {
            this.activeTab--;
            return;
        }

        if (this.activeTab === 1) {
            this.formDataTypeDoc.markAllAsTouched();
            if (!this.formDataTypeDoc.valid) return;
        }
        if (this.activeTab === 2) {
            let erroForm = this.dataLigneFields.filter((d: any) => !d?.lib_proprietes_docs || !d?.type_proprietes_docs);
            const isValid = this.dataLigneFields.every((d: any) => {
                // pas de propriété → pas de contrôle
                if (!Array.isArray(d.proprietes_select) || !d?.proprietes_select?.length) {
                    return true;
                }

                // propriété existe → contrôle
                return (
                    d.proprietes_select.length > 0 &&
                    d.proprietes_select.every(
                        (p: any) => p.value_proprietes_docs?.toString().trim() !== ''
                    )
                );
            });

            if (erroForm.length) {
                Swal.fire({
                    title: `Veuillez renseigné toutes les informations du formulaire.`,
                    icon: 'info',
                    confirmButtonText: 'OK'
                })
                return;
            }
            if (!isValid) {
                Swal.fire({
                    title: `Veuillez renseigné les menus déroulant.`,
                    icon: 'info',
                    confirmButtonText: 'OK'
                })
                return;
            }
        }
        if (this.activeTab >= this.numberingTabs.length) {
            this.submitForm();
            return;
        }
        this.activeTab++;
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
        if (data.ligneDisabled) return;
        Swal.fire({
            title: 'Confirmation',
            text: 'Voulez-vous vraiment supprimer cette ligne ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {
                this.dataLigneFields = this.dataLigneFields.filter((d: any) => d.id !== data.id);
            }
        });

    }

    deleteSub(data: any, i: number, j: number): void {
        Swal.fire({
            title: 'Confirmation',
            text: 'Voulez-vous vraiment supprimer cette ligne ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {
                this.dataLigneFields[i].proprietes_select.splice(j, 1);
            }
        });

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

