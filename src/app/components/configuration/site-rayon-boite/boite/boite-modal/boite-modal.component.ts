import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../../environments/environment";
import {Authorization} from "../../../../../protect/authorization.service";
import {HttpService} from "../../../../../core/http.service";
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
        idsite: new FormControl('', Validators.required),
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
    dataSite: any = [];
    dataRayon: any = [];
    dataService: any = [];
    errorTexte: string = "";
    loadingSites: boolean = false;
    loadingRayons: boolean = false;
    loadingService: boolean = false;

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
        // Les rayons ne sont chargés qu'une fois le site choisi : l'API les
        // filtre par `idsite`, et proposer tous les rayons de la société
        // reviendrait à laisser ranger une boîte dans un autre site.
        this.savesites(this.users?.datasociete?.uid || this.users?.uidsociete)
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            const ligne = changes['dataLigne'].currentValue;
            // le site n'est pas porté directement par la boîte : il vient de son rayon
            const idsite = ligne?.datasite?.uid
                || ligne?.datarayon?.datasite?.uid
                || ligne?.datarayon?.idsite
                || '';

            if (idsite) {
                this.saverayons(this.users?.datasociete?.uid || this.users?.uidsociete, String(idsite));
            }

            setTimeout(() => {
                this.validationForm.patchValue({
                    idsite: idsite ? String(idsite) : '',
                    idrayon: String(ligne?.datarayon?.uid || ''),
                    uid: ligne?.uid,
                    libelle_boites: ligne.libelle_boites,
                    code_boites: ligne.code_boites,
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
                    this.dataSite = res.body.data.map((d: any) => ({
                        label: d.libelle_sites,
                        value: String(d.uid),
                    }));
                }
            })
            .catch(() => {
                this.loadingSites = false;
            });
    }

    /** Changement de site : on repart de zéro sur le rayon. */
    changeSite(event: any) {
        const idsite = event?.value || '';
        this.validationForm.patchValue({idrayon: ''});
        this.dataRayon = [];
        if (idsite) {
            this.saverayons(this.users?.datasociete?.uid || this.users?.uidsociete, idsite);
        }
    }

    saverayons(idsociete: string = '', idsite: string = '') {
        this.dataRayon = [];
        this.loadingRayons = true;
        this.httService.getData(`${environment.api_url}api/:saverayons?idsociete=${idsociete}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingRayons = false;
                if (res.body.status) {
                    this.dataRayon = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_rayon,
                            value: String(d.uid),
                        }
                    });
                }
            })
            .catch(() => {
                this.loadingRayons = false;
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
            "idsociete": this.users?.datasociete?.uid  || this.users?.uidsociete,
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

