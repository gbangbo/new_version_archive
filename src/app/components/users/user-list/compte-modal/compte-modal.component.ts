import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from 'sweetalert2';
import {Select2Module} from "ng-select2-component";
import {passwordMatchValidator, passwordPolicyValidator} from "../../../../core/password.validator";

@Component({
    selector: 'app-compte-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, Select2Module],
    templateUrl: './compte-modal.component.html',
    styleUrl: './compte-modal.component.scss',
})
export class CompteModalComponent implements OnChanges {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    validationForm = new FormGroup({
        idpersonnel: new FormControl('', Validators.required),
        idroles: new FormControl('', Validators.required),
        password: new FormControl('', [passwordPolicyValidator()]),
        confirmPassword: new FormControl(''),
        uid: new FormControl(''),
    }, {
        validators: passwordMatchValidator()
    });


    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    errorTexte: string = "";
    dataUser: any = [];
    dataRole: any = [];
    loadingUser: boolean = false;
    loadingRole: boolean = false;
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
        this.savepersonnel(this.users?.dataSociete?.uid, '', '')
        this.saveroles(this.users?.dataSociete?.uid, '')
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            this.validationForm.patchValue(changes['dataLigne']?.currentValue);
        }
    }

    savepersonnel(idsociete: string = '', idservice: string = '', idpersonnel: string = '') {
        this.loadingUser = true;
        this.dataUser = [];
        this.httService.getData(`${environment.api_url}auth/:savepersonnel?idsociete=${idsociete}&idservice=${idservice}&idpersonnel=${idpersonnel}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingUser = false;
                if (res.body.status) {
                    this.dataUser = res.body.data.map((d: any) => {
                        return {
                            label: `${d.nom} ${d.prenom}`,
                            emailAgent: d.emailAgent,
                            value: d.uid
                        }
                    });
                    console.log("user ====", res.body.data)
                }
            })
            .catch((err) => {
                this.loadingUser = false;
            });
    }

    saveroles(idsociete: string = '', idrole: string = '') {
        this.loadingRole = true;
        this.dataRole = [];
        this.httService.getData(`${environment.api_url}auth/:saveroles?idsociete=${idsociete}&idrole=${idrole}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingRole = false;
                if (res.body.status) {
                    this.dataRole = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_role,
                            value: d.uid
                        }
                    });
                    console.log("user ====", res.body.data)
                }
            })
            .catch((err) => {
                this.loadingRole = false;
            });
    }

    submitForm() {
        this.errorTexte = '';
        this.validationForm.markAllAsTouched();
        console.log()
        if (!this.validationForm.valid) {
            return;
        }

        this.isloading = true;
        let payload = {
            "action": this.validationForm.value.uid ? 2 : 1,
            "idsociete": this.users?.dataSociete?.uid,
            "idpersonnel": this.validationForm.value.idpersonnel || '',
            "idroles": this.validationForm.value.idroles,
            "password": this.validationForm.value.password,
            "email": this.dataUser.find((d: any) => d.value == this.validationForm.value.idpersonnel)?.emailAgent,
        }
        // {
//     "action": 1,
//     "idpersonnel": "cc93b1b8-0681-4d98-9da1-c3495bee4420",
//     "idroles": "84136d11-0698-4da6-bae1-96a498885c19",
//     "password": "admin@0101",
//     "idsociete": "ef86db85-d939-4574-a36e-42ff5143d94d",
//     "email": "gbangbojb@gmail.com"
// }
        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}auth/:register`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataLigne = {};
                    this.validationForm.reset({});
                    this.closeModal(true);
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })

                    console.log("res.body  ======", res.body)
                }
            })
            .catch((err) => {
                console.log("err", err)
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !"
                this.isloading = false;
            });
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
}