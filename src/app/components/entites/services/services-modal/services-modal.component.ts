import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {Select2Module} from "ng-select2-component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {decryptData} from "../../../../config/config";

@Component({
    selector: 'app-services-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule, Select2Module],
    templateUrl: './services-modal.component.html',
    styleUrl: './services-modal.component.scss',
})
export class ServicesModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        sigle_service: new FormControl('', Validators.required),
        libelle_service: new FormControl('', Validators.required),
        iddepartement: new FormControl('', Validators.required),
        iddirection: new FormControl('',),
        iddep: new FormControl('',),
        uid: new FormControl('',)
    })
    errorTexte: string = '';
    loadingDir: boolean = false;
    loadingDep: boolean = false;

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    dataDirection: any = [];
    dataDepartement: any = [];
    private isEditing = false;

    constructor(private autor: Authorization, private httService: HttpService, private http: HttpClient) {
        this.users = this.autor.getInfosUsers();
        this.showDirection(this.users?.datasociete?.uid, '');
    }


    async ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne']?.currentValue) {
            this.isEditing = true; // ← Marquer qu'on est en édition

            const dataLigne = changes['dataLigne'].currentValue;
            const uidDepartement = dataLigne?.datadepartement?.uid;
            const uidDirection = dataLigne?.datadepartement?.datadirection?.uid;

            try {
                this.loadingDep = true;
                let dDep: any = await this.getData(`${environment.api_url}auth/:savedepartement?idsociete=${this.users?.datasociete?.uid}&iddirection=${uidDirection}&iddepartement=${uidDepartement}`, `${this.users.access_token}`)
                this.loadingDep = false;
                let rDep = decryptData(dDep.data)?.data;
                if (Array.isArray(rDep)) {
                    this.dataDepartement = rDep?.map((d: any) => {
                        return {
                            label: d.libelle_departement,
                            value: d.uid
                        }
                    });
                } else {
                    this.dataDepartement = [rDep]?.map((d: any) => {
                        return {
                            label: d.libelle_departement,
                            value: d.uid
                        }
                    });
                }
            } catch (e) {
                this.loadingDep = false;
            }

            setTimeout(() => {
                this.validationForm.patchValue({
                    iddirection: uidDirection,
                    iddep: uidDepartement,
                    iddepartement: uidDepartement,
                    sigle_service: dataLigne?.sigle_service,
                    libelle_service: dataLigne?.libelle_service,
                    uid: dataLigne?.uid,
                });
                console.log("this.validationForm ===", this.validationForm)
                setTimeout(() => {
                    this.isEditing = false;
                }, 100);
            }, 1000);
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
            "idservice": this.validationForm.value.uid || '',
            "idsociete": this.users?.datasociete?.uid,
            "iddepartement": this.validationForm.value.iddepartement,
            "sigle_service": this.validationForm.value.sigle_service,
            "libelle_service": this.validationForm.value.libelle_service,
        }
        console.log("payload  SERVICE ===", payload)

        this.httService.postData(`${environment.api_url}auth/:saveservice`, payload, this.users?.access_token || '')
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
                }
            })
            .catch((err) => {
                this.loadingDir = false;
            });
    }

    showDepartement(idsociete: string = '', iddirection: string = '', iddepartement: string = '') {
        this.loadingDep = true;
        this.dataDepartement = []
        this.httService.getData(`${environment.api_url}auth/:savedepartement?idsociete=${idsociete}&iddirection=${iddirection}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingDep = false;
                if (res.body.status) {
                    this.dataDepartement = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_departement,
                            value: d.uid
                        }
                    })
                }
            })
            .catch((err) => {
                this.loadingDep = false;
            });

    }

    onChange(event: any) {
        // this.validationForm.get('iddepartement')?.setValue(null);
        if (this.isEditing) return;

        this.dataDepartement = [];
        if (!event.value) return;
        this.showDepartement(this.users?.datasociete?.uid, event.value);
    }

    getData(url: string, token: any) {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return new Promise((resolve, reject) => {
            this.http.get(url, {headers})
                .subscribe(
                    (data) => {
                        resolve(data)
                    },
                    (err) => {
                        reject(err)
                    }
                )
        })
    }

}
