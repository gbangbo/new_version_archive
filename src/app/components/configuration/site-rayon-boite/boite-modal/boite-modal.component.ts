import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from 'sweetalert2';
import {Select2Module} from "ng-select2-component";

@Component({
    selector: 'app-boite-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, Select2Module],
    templateUrl: './boite-modal.component.html',
    styleUrl: './boite-modal.component.scss',
})
export class BoiteModalComponent implements OnChanges {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        idrayon: new FormControl('', Validators.required),
        code_boites: new FormControl('', Validators.required),
        libelle_boites: new FormControl('', Validators.required),
        uid: new FormControl('')
    })

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    dataRayon: any = [];
    dataService: any = [];
    errorTexte: string = "";
    loadingSites: boolean = false;
    loadingService: boolean = false;

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
        this.saverayons(this.users?.dataSociete?.uid)
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            setTimeout(() => {
                this.validationForm.patchValue({
                    idrayon: String(changes['dataLigne']?.currentValue?.datarayon?.uid),
                    uid: changes['dataLigne']?.currentValue?.uid,
                    libelle_boites: changes['dataLigne']?.currentValue.libelle_boites,
                    code_boites: changes['dataLigne']?.currentValue.code_boites,
                });

                console.log("POur Boite", changes['dataLigne']?.currentValue)
            }, 1000)

        }
    }

    saverayons(idsociete: string = '', idsite: string = '') {
        this.dataRayon = [];
        this.loadingSites = true;
        this.httService.getData(`${environment.api_url}api/:saverayons?idsociete=${idsociete}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingSites = false;
                if (res.body.status) {
                    this.dataRayon = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_rayon,
                            value: String(d.uid),
                        }
                    });
                }
            })
            .catch((err) => {
                this.loadingSites = false;
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
            "idboites": this.validationForm.value.uid || '',
            "idrayon": this.validationForm.value.idrayon,
            "code_boites": this.validationForm.value.code_boites,
            "libelle_boites": this.validationForm.value.libelle_boites
        }

        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}api/:saveboites`, payload, this.users?.access_token || '')
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

