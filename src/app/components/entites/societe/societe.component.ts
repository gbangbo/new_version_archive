import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {ImageUploadComponent} from "../../users/widgets/image-upload/image-upload.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {SocieteModalComponent} from "./societe-modal/societe-modal.component";
import {TableClickedAction, TableConfigs} from "../../../shared/interface/common";
import {SupportDB} from "../../../shared/interface/support-ticket";
import Swal from "sweetalert2";
import moment from "moment";
import {TableComponent} from "../../../shared/components/ui/table/table.component";


@Component({
    selector: 'app-societe',
    imports: [
        CommonModule,
        CardComponent,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzToolTipModule,
        SocieteModalComponent,
        TableComponent],
    providers: [],
    templateUrl: './societe.component.html',
    styleUrl: './societe.component.scss',
})
export class SocieteComponent implements OnInit {
    societeForm!: FormGroup;
    dataSociete: any = [];


    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    isLoad: boolean = false;
    modalOpen: boolean = false;
    dataOneLigne: any = {};
    tableConfig: TableConfigs = {
        columns: [
            {title: 'Raison sociale', field_value: 'raison_sociale', sort: true},
            {title: 'Telephone', field_value: 'telephone', sort: true},
            {title: 'Email', field_value: 'email', sort: true},
            {title: 'Adresse', field_value: 'adresse', sort: true},
            {title: 'Localisation', field_value: 'localisation', sort: true},
            {title: 'Double authentification ?', field_value: '', sort: true},
        ],
        data: [] as SupportDB[],
        row_action: [
            {
                label: "Edit",
                action_to_perform: "edit",
                icon: "edit-content",
                class: "btn-sm"
            }
        ],

    };

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService,
                private toast: ToastrService) {

    }

    onImageSelected(file: File): void {
        console.log('Fichier sélectionné:', file);

        // Exemple: Upload vers votre API
        const formData = new FormData();
        formData.append('image', file);

        // this.http.post('votre-api/upload', formData).subscribe(...);
    }

    onImageRemoved(): void {
        console.log('Image supprimée');
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.societeForm = this.fb.group({
            action: [''],
            idsociete: [''],
            raison_sociale: ['', Validators.required],
            telephone: [''],
            email: [''],
            localisation: [''],
            active: [''],
        });
        this.societe();
    }

    submitForm(): void {
        this.errorTexte = ''
        if (this.societeForm.valid) {
            this.isLoad = true;
            this.societeForm.value.action = this.societeForm.value.action ? this.societeForm.value.action : 1;
            console.log(this.societeForm.value)
            this.httService.postData(`${environment.api_url}auth/:savesociete`, this.societeForm.value, this.users?.access_token)
                .toPromise()
                .then((res: any) => {
                    this.isLoad = false;
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    if (res.body.status) {
                        this.societeForm.reset({});
                        this.societe();
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
            Object.values(this.societeForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    resetForm(): void {
        this.societeForm.reset({});
    }

    societe() {
        this.isloading = true;
        this.dataSociete = [];
        this.tableConfig.data = [];
        this.httService.getData(`${environment.api_url}auth/:savesociete`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataSociete = res.body.data;
                    this.tableConfig = {
                        ...this.tableConfig,
                        data: res.body.data.map((e: any) => {
                            return {...e, created_at: moment(e.created_at).format('DD/MM/YYYY')}
                        })
                    };
                    console.log("res.body.data ===", res.body.data)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    actionBtn(data: any) {
        this.errorTexte = ''
        let payload = {
            action: 2,
            idsociete: data?.uid,
            raison_sociale: data.raison_sociale,
            telephone: data.telephone,
            email: data.email,
            localisation: data.localisation,
            active: 1,
        }
        this.societeForm.setValue(payload);
    }

    handleModal(value: boolean) {
        if (value) {
            this.societe();
        }
        this.modalOpen = false;
    }

    openModal() {
        this.modalOpen = true;
        this.dataOneLigne = {};
    }

    handleAction(value: TableClickedAction) {

        console.log('🎯 Action reçue:', value);
        console.log('Données:', value.action_to_perform);

        switch (value.action_to_perform) {
            case 'edit':
                this.modalOpen = true;
                this.dataOneLigne = value.data;
                break;
            default:
            //console.warn('⚠️ Action non gérée:', event.action);
        }
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
}
