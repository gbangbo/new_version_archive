import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from 'sweetalert2';
import {Select2Module} from "ng-select2-component";

@Component({
    selector: 'app-rayon-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, Select2Module],
    templateUrl: './rayon-modal.component.html',
    styleUrl: './rayon-modal.component.scss',
})
export class RayonModalComponent implements OnChanges {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        idsite: new FormControl('', Validators.required),
        libelle_rayon: new FormControl('', Validators.required),
        uid: new FormControl(''),
        value: new FormControl('')
    })

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    dataSite: any = [];
    dataService: any = [];
    errorTexte: string = "";
    loadingSites: boolean = false;
    loadingService: boolean = false;

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
        this.savesites(this.users?.dataSociete?.uid)
        this.saveservice(this.users?.dataSociete?.uid)
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            setTimeout(() => {
                this.validationForm.patchValue({
                    idsite: String(changes['dataLigne']?.currentValue.datasite.uid),
                    uid: changes['dataLigne']?.currentValue.uid,
                    libelle_rayon: changes['dataLigne']?.currentValue.libelle_rayon,
                });
            }, 1000)

        }
    }

    savesites(idsociete: string = '', idsite: string = '') {
        this.dataSite = [];
        this.loadingSites = true;
        this.httService.getData(`${environment.api_url}api/:savesites?idsociete=${idsociete}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingSites = false;
                if (res.body.status) {
                    this.dataSite = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_sites,
                            value: String(d.uid),
                        }
                    });
                }
            })
            .catch((err) => {
                this.loadingSites = false;
            });
    }

    saveservice(idsociete: string = '', idservice: string = '', iddepartement: string = '') {
        this.dataService = [];
        this.loadingService = true;
        this.httService.getData(`${environment.api_url}auth/:saveservice?idsociete=${idsociete}&idservice=${idservice}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingService = false;
                if (res.body.status) {
                    this.dataService = res.body.data.map((d: any) => {
                        return {
                            ...d,
                            label: d.sigle_service,
                            value: d.sigle_service,
                        }
                    });
                }
            })
            .catch((err) => {
                this.loadingService = false;
            });
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
            "idsociete": this.users?.dataSociete?.uid,
            "idrayon": this.validationForm.value.uid || '',
            "idsite": this.validationForm.value.idsite,
            "libelle_rayon": this.validationForm.value.libelle_rayon,
            "code_rayon": this.validationForm.value.libelle_rayon
        }
        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}api/:saverayons`, payload, this.users?.access_token || '')
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
}

