import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {Select2Module} from "ng-select2-component";

@Component({
    selector: 'app-add-user-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule, Select2Module],
    templateUrl: './add-user-modal.component.html',
    styleUrl: './add-user-modal.component.scss',
})
export class AddUserModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        idservice: new FormControl('', Validators.required),
        idposte: new FormControl('', Validators.required),
        idtypeposte: new FormControl('', Validators.required),
        nom: new FormControl('', Validators.required),
        prenom: new FormControl('', Validators.required),
        emailAgent: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        uid: new FormControl('',),
        sexe: new FormControl('',),
        // dateNaissance: new FormControl('',),
        nationalite: new FormControl('',),
        adressePostale: new FormControl('',),
        telMobile: new FormControl('', [
            Validators.pattern(/^[0-9]{10}$/)  // Format: +225XXXXXXXXXX ou 0XXXXXXXXXX
        ]),
        telBureau: new FormControl('',),
        telDomicile: new FormControl('',),
        situationMatrimoniale: new FormControl('',),
        lieuHabitation: new FormControl('',),

    })
    dataGenre: any = [
        {label: 'M', value: 'M'},
        {label: 'F', value: 'F'},
    ]

    errorTexte: string = '';

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    dataService: any = [];
    dataDirection: any = [];
    dataDepartement: any = [];
    dataTypePoste: any = [];
    dataPoste: any = [];
    loadingService: boolean = false;
    loadingTypePoste: boolean = false;
    loadingPoste: boolean = false;
    optionsTypePoste = {
        width: '100%',
        placeholder: 'Selectionnez le site',
        allowClear: true,
        minimumResultsForSearch: 0  // IMPORTANT
    };

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
        this.direction(this.users?.dataSociete?.uid, '');
        this.departement(this.users?.dataSociete?.uid, '', '');
        this.savetypepostes(this.users?.dataSociete?.uid, '');
        this.savepostes(this.users?.dataSociete?.uid, '');
        this.saveservice(this.users?.dataSociete?.uid, '');
    }

    direction(idsociete: string = '', iddirection: string = '') {
        this.dataDirection = [];
        this.httService.getData(`${environment.api_url}auth/:savedirection?idsociete=${idsociete}&iddirection=${iddirection}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status) {
                    this.dataDirection = res.body.data;
                }
            })
            .catch((err) => {
            });

    }

    departement(idsociete: string = '', iddirection: string = '', iddepartement: string = '') {
        this.isloading = true;
        this.dataDepartement = [];
        this.httService.getData(`${environment.api_url}auth/:savedepartement?idsociete=${idsociete}&iddirection=${iddirection}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataDepartement = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_departement,
                            value: d.uid
                        }
                    });
                    console.log(res.body.data)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    saveservice(idsociete: string = '', idservice: string = '', iddepartement: string = '') {
        this.isloading = true;
        this.dataService = [];
        this.httService.getData(`${environment.api_url}auth/:saveservice?idsociete=${idsociete}&idservice=${idservice}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataService = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_service,
                            value: d.uid
                        }
                    });
                    console.log("Service ====", res.body.data)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    savetypepostes(idsociete: string = '', idtypeposte: string = '') {
        this.loadingTypePoste = true;
        this.dataTypePoste = [];
        this.httService.getData(`${environment.api_url}auth/:savetypepostes?idsociete=${idsociete}&idtypeposte=${idtypeposte}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingTypePoste = false;
                if (res.body.status) {
                    this.dataTypePoste = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_typeposte,
                            value: d.uid
                        }
                    });
                    console.log("tYPE POSTE", res.body.data)
                }
            })
            .catch((err) => {
                this.loadingTypePoste = false;
            });

    }

    savepostes(idsociete: string = '', idposte: string = '') {
        this.loadingPoste = true;
        this.dataPoste = [];
        this.httService.getData(`${environment.api_url}auth/:savepostes?idsociete=${idsociete}&idposte=${idposte}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingPoste = false;
                if (res.body.status) {
                    this.dataPoste = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_poste,
                            value: d.uid
                        }
                    });
                    ;
                    console.log("Poste", res.body.data)
                }
            })
            .catch((err) => {
                this.loadingPoste = false;
            });

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            console.log("Update user ", changes['dataLigne']?.currentValue)
            setTimeout(() => {
                this.validationForm.patchValue({
                    ...changes['dataLigne']?.currentValue,
                    idposte: changes['dataLigne']?.currentValue.dataposte.uid,
                    idtypeposte: changes['dataLigne']?.currentValue.datatypeposte.uid,
                    idservice: changes['dataLigne']?.currentValue.dataservice.uid
                });

            }, 1000)
        }
    }

    submitForm() {
        this.errorTexte = '';
        this.validationForm.markAllAsTouched();
        if (!this.validationForm.valid) {
            return;
        }

        this.isloading = true;
        let payload = {
            "action": this.validationForm.value.uid ? 2 : 1,
            "idpersonnel": this.validationForm.value.uid || '',
            "idsociete": this.users?.dataSociete?.uid,
            ...this.validationForm.value
        }

        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}auth/:savepersonnel`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.closeModal(true);
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            })
            .catch((err) => {
                this.isloading = false;
                console.log("err", err)
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !"
                this.isloading = false;
            });
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
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

    onUpdate(event: any) {
        console.log(event)
    }
}
