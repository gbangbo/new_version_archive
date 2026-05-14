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
    selector: 'app-departement-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule, Select2Module],
    templateUrl: './departement-modal.component.html',
    styleUrl: './departement-modal.component.scss',
})
export class DepartementModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        sigle_departement: new FormControl('', Validators.required),
        libelle_departement: new FormControl('', Validators.required),
        iddirection: new FormControl('', Validators.required),
        uid: new FormControl('',)
    })
    errorTexte: string = '';
    loadingDir: boolean = false;

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    dataDirection: any = {};

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
        this.showDirection(this.users?.datasociete?.uid, '');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            setTimeout(() => {
                this.validationForm.patchValue({
                    ...changes['dataLigne']?.currentValue,
                    iddirection: changes['dataLigne']?.currentValue?.datadirection?.uid
                });

            }, 1000)
        }
    }

    submitForm() {
        this.errorTexte = '';
        console.log("this.validationForm ===", this.validationForm.value)
        this.validationForm.markAllAsTouched();
        if (!this.validationForm.valid) {
            return;
        }

        this.isloading = true;
        let payload = {
            "action": this.validationForm.value.uid ? 2 : 1,
            "iddepartement": this.validationForm.value.uid || '',
            "idsociete": this.users?.datasociete?.uid,
            ...this.validationForm.value
        }

        this.httService.postData(`${environment.api_url}auth/:savedepartement`, payload, this.users?.access_token || '')
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

    showDirection(idsociete: string = '', iddirection: string = '') {
        this.loadingDir = true;
        this.dataDirection = [];
        this.httService.getData(`${environment.api_url}auth/:savedirection?idsociete=${idsociete}&iddirection=${iddirection}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingDir = false;
                if (res.body.status) {
                    this.dataDirection = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_direction,
                            value: d.uid
                        }
                    });
                    console.log("user ====", res.body.data)
                }
            })
            .catch((err) => {
                this.loadingDir = false;
            });
    }
}
