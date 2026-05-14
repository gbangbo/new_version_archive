import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../../environments/environment";
import {Authorization} from "../../../../../protect/authorization.service";
import {HttpService} from "../../../../../core/http.service";
import Swal from "sweetalert2";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {Select2Module} from "ng-select2-component";
import {CardComponent} from "../../../../../shared/components/ui/card/card.component";
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from "@danielmoncada/angular-datetime-picker";
import {FeatherIconComponent} from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {decryptData, postDataCrypte} from "../../../../../config/config";
import {ToastrService} from "ngx-toastr";
import moment from "moment";
import {DocUploadComponent} from "../../../widgets/doc-upload/doc-upload.component";

@Component({
    selector: 'app-add-modal',
    imports: [CommonModule, FormsModule,
        ReactiveFormsModule, NzSwitchModule,
        Select2Module, CardComponent, OwlDateTimeModule,
        OwlNativeDateTimeModule,
        FeatherIconComponent, DocUploadComponent],
    providers: [
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'}
    ],
    templateUrl: './add-modal.component.html',
    styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public numberingTabs = [
        {
            id: 1,
            title: 'Info. de base',
            value: 'Info. géné.',
            class: 'one stepper step editing'
        },
        {
            id: 2,
            title: 'Carrière',
            value: 'Formulaire',
            class: 'two step'
        },
        {
            id: 3,
            title: 'Résumé',
            value: 'feedback',
            class: 'three step'
        }
    ];
    public activeTab: number = 1;

    validationForm = new FormGroup({
        nom: new FormControl('', Validators.required),
        prenom: new FormControl('', Validators.required),
        emailAgent: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        uid: new FormControl('',),
        uid_filepersonnel: new FormControl('',),
        idpersonnel: new FormControl('',),
        sexe: new FormControl('', Validators.required),
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
    statutForm = new FormGroup({
        idservice: new FormControl('', Validators.required),
        idposte: new FormControl(''),
        // idtypeposte: new FormControl('', Validators.required),
        idfonction: new FormControl('', Validators.required),
        numero_badge: new FormControl(''),
        iddirection: new FormControl(''),
        iddepartement: new FormControl(''),
        date_debut_contrat: new FormControl<Date | string | null>(null, Validators.required),
        date_fin_contrat: new FormControl<Date | string | null>(null, Validators.required),
        idsites: new FormControl('', Validators.required),
        idstatutpersonnel: new FormControl('',),
        idpersonnel: new FormControl('',),
        idsitepersonnel: new FormControl('',),
    }, {validators: this.dateRangeValidator})
    dataGenre: any = [
        {label: 'M', value: 'M'},
        {label: 'F', value: 'F'},
    ]

    errorTexte: string = '';
    selectedDoc: File | null = null;
    viewDoc: any;

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
    dataSite: any = [];
    loadingService: boolean = false;
    loadingTypePoste: boolean = false;
    loadingPoste: boolean = false;
    loadingSite: boolean = false;
    loadingDir: boolean = false;
    isLodDep: boolean = false;
    isDirection: boolean = false;

    constructor(private toast: ToastrService, private autor: Authorization, private httService: HttpService, private http: HttpClient) {
        this.users = this.autor.getInfosUsers();

        this.showFonction(this.users?.datasociete?.uid, '');
        this.showDirection(this.users?.datasociete?.uid, '');
        this.showSite(this.users?.datasociete?.uid, '');
    }


    departement(idsociete: string = '', iddirection: string, iddepartement: string = '') {
        this.isLodDep = true;
        this.dataDepartement = [];
        if (!iddirection) {
            this.isLodDep = false;
            return
        }
        this.httService.getData(`${environment.api_url}auth/:savedepartement?idsociete=${idsociete}&iddirection=${iddirection}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isLodDep = false;
                if (res.body.status) {
                    this.dataDepartement = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_departement,
                            value: d.uid
                        }
                    });
                }
            })
            .catch((err) => {
                this.isLodDep = false;
            });

    }

    showService(idsociete: string = '', idservice: string = '', iddepartement: string) {
        this.loadingService = true;
        this.dataService = [];
        if (!iddepartement) {
            this.loadingService = false;
            return
        }
        this.httService.getData(`${environment.api_url}auth/:saveservice?idsociete=${idsociete}&idservice=${idservice}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingService = false;
                if (res.body.status) {
                    this.dataService = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_service,
                            value: d.uid
                        }
                    });
                }
            })
            .catch((err) => {
                this.loadingService = false;
            });

    }

    showFonction(idsociete: string = '', idfonction: string = '') {
        this.loadingTypePoste = true;
        this.dataTypePoste = [];
        this.httService.getData(`${environment.api_url}auth/:save-fonction?idsociete=${idsociete}&idfonction=${idfonction}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingTypePoste = false;
                if (res.body.status) {
                    this.dataTypePoste = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_fonction,
                            value: d.uid
                        }
                    });
                }
            })
            .catch((err) => {
                this.loadingTypePoste = false;
            });

    }

    showSite(idsociete: string = '', idsite: string = '') {
        this.loadingSite = true;
        this.dataSite = [];
        this.httService.getData(`${environment.api_url}api/:savesites?idsociete=${idsociete}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingSite = false;
                if (res.body.status) {
                    this.dataSite = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_sites,
                            value: d.uid
                        }
                    });
                }
            })
            .catch((err) => {
                this.loadingSite = false;
            });

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
                this.loadingSite = false;
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
                }
            })
            .catch((err) => {
                this.loadingPoste = false;
            });

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            let up = changes['dataLigne']?.currentValue;
            console.log("Update user ", up);
            if (Object.keys(up).length > 0) {
                this.isDirection = true;
                this.viewDoc = up?.data_fichiers ? up?.data_fichiers[0].piece_jointe : '';
                this.departement(this.users?.datasociete?.uid, up.datadirection.uid, '');
                this.showService(this.users?.datasociete?.uid, '', up.datadepartement.uid);


                setTimeout(() => {


                    this.validationForm.patchValue({
                        nom: up.datapersonnel.nom,
                        prenom: up.datapersonnel.prenom,
                        emailAgent: up.datapersonnel.emailAgent,
                        sexe: up.datapersonnel.sexe,
                        telMobile: up.datapersonnel.telMobile,
                        idpersonnel: up.datapersonnel.uid,
                        uid: up.datapersonnel.uid,
                        uid_filepersonnel: up?.data_fichiers ? up?.data_fichiers[0].uid_filepersonnel : '',
                    });

                    this.statutForm.patchValue({
                        // idposte: up.dataposte.uid,
                        idservice: up.dataservice.uid,
                        idfonction: up.datafonction.uid,
                        iddirection: up.datadirection.uid,
                        iddepartement: up.datadepartement.uid,
                        numero_badge: up.numero_badge,
                        date_debut_contrat: moment(up.date_debut_contrat, 'DD-MM-YYYY').toDate(),
                        date_fin_contrat: moment(up.date_fin_contrat, 'DD-MM-YYYY').toDate(),
                        idsites: up.datasite ? up.datasite[0]?.uid : '',
                        idstatutpersonnel: up.uid,
                        idsitepersonnel: up.datasite ? up.datasite[0]?.uid : '',
                    });
                    console.log("this.statutForm ====", this.statutForm.value)
                    setTimeout(() => {
                        this.isDirection = false;
                    }, 500)
                }, 1000)
            }


        }
    }

    async submitForm() {
        this.errorTexte = '';
        this.isloading = true;

        /**
         * Creation du personne
         */
        let payloadPersonnel = {
            ...this.validationForm.value,
            "action": this.validationForm.value.idpersonnel ? 2 : 1,
            "idpersonnel": this.validationForm.value.idpersonnel || '',
            "idsociete": this.users?.datasociete?.uid
        }
        let rPons: any = {};
        try {
            let res: any = await this.newPostData(`${environment.api_url}auth/:savepersonnel`, {
                data: postDataCrypte(payloadPersonnel)
            }, this.users?.access_token);
            rPons = decryptData(res.data);
            if (!rPons.status) {
                this.toast.error(`${rPons.message || 'Une erreur est survenue.'} `, '',
                    {
                        positionClass: 'toast-top-right',
                        closeButton: true,
                        timeOut: 3000
                    })
                setTimeout(() => {
                    this.errorTexte = `${rPons.message || 'Une erreur est survenue.'} `;
                }, 3000)
                return
            }
        } catch (e: any) {
            this.isloading = false;
            this.errorTexte = e?.error?.message || "Une erreur est survenue !"
            this.toast.error(`${e?.error?.message || 'Une erreur est survenue.'} `, '',
                {
                    positionClass: 'toast-top-right',
                    closeButton: true,
                    timeOut: 3000
                })
            setTimeout(() => {
                this.errorTexte = `${e?.error?.message || 'Une erreur est survenue.'} `;
            }, 3000)

            return
        }

        /**
         * Designation du site du personnel
         */

        let payloadSite = {
            "action": this.statutForm.value.idsitepersonnel ? 2 : 1,
            "idsitepersonnel": this.statutForm.value.idsitepersonnel,
            "idsites": this.statutForm.value.idsites,
            "idpersonnel": rPons?.data?.uid || this.validationForm.value.idpersonnel,
            "idsociete": this.users?.datasociete?.uid,
            "date_mouvement": moment(this.statutForm.value.date_debut_contrat).format('YYYY-MM-DD'),
        }
        let rPonsSite: any = {};
        console.log("payloadSite ===", payloadSite)
        try {
            let resSite: any = await this.newPostData(`${environment.api_url}api/:savesite-personnels`, {
                data: postDataCrypte(payloadSite)
            }, this.users?.access_token);
            rPonsSite = decryptData(resSite.data);
            if (!rPonsSite.status) {
                return
            }
        } catch (e: any) {
            this.isloading = false;
            this.errorTexte = e?.error?.message || "Une erreur est survenue !"
            this.toast.error(`${e?.error?.message || 'Une erreur est survenue.'} `, '',
                {
                    positionClass: 'toast-top-right',
                    closeButton: true,
                    timeOut: 3000
                })
            setTimeout(() => {
                this.errorTexte = `${e?.error?.message || 'Une erreur est survenue.'} `;
            }, 3000)

            return
        }


        /**
         * Sauvegarde du document des conditions d'utilisation
         */

        try {
            if (this.selectedDoc) {
                const formData = new FormData();
                formData.append('action ', this.validationForm.value.uid_filepersonnel ? '2' : '2');
                formData.append('uid_filepersonnel ', '');
                formData.append('personnel_uid ', (rPons?.data?.uid || this.validationForm.value.idpersonnel) ?? '');
                formData.append('nom_fichiers', this.selectedDoc.name ?? '');
                formData.append('piece_jointe', this.selectedDoc, this.selectedDoc.name);
                let resDoc: any = await this.newPostData(`${environment.URL_API}auth/save-fichier-personnel`, formData, this.users?.access_token);

            }

        } catch (e: any) {
            console.log('e?.error ===', e?.error)
        }


        /**
         * Sauvegarde d statut du personnel
         */
        let payloadStatut = {
            ...this.statutForm.value,
            "action": this.statutForm.value.idstatutpersonnel ? 2 : 1,
            "idstatutpersonnel": this.statutForm.value.idstatutpersonnel || '',
            "date_debut_contrat": moment(this.statutForm.value.date_debut_contrat).format('YYYY-MM-DD'),
            "date_fin_contrat": moment(this.statutForm.value.date_fin_contrat).format('YYYY-MM-DD'),
            "idpersonnel": rPons?.data?.uid || this.validationForm.value.idpersonnel || '',
            "idsociete": this.users?.datasociete?.uid,
        }
        console.log("payloadStatut ===", payloadStatut)
        this.httService.postData(`${environment.api_url}auth/:save-statut-personnel`, payloadStatut, this.users?.access_token || '')
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
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !"
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
            this.validationForm.markAllAsTouched();
            if (!this.validationForm.valid) return;
        }
        if (this.activeTab === 2) {
            console.log(this.statutForm.value)
            this.statutForm.markAllAsTouched();
            if (!this.statutForm.valid) return;
        }
        if (this.activeTab >= this.numberingTabs.length) {
            this.submitForm();
            return;
        }
        this.activeTab++;
    }

    dateRangeValidator(control: AbstractControl): ValidationErrors | null {
        const debut = control.get('date_debut_contrat')?.value;
        const fin = control.get('date_fin_contrat')?.value;

        if (debut && fin && new Date(debut) >= new Date(fin)) {
            return {dateInvalide: true};
        }
        return null;
    }

    getInfo(e: string, i: string) {
        if (!e) return '-';
        let res: string = '-'
        switch (i) {
            case 's':
                res = this.dataService?.find((d: any) => d.value == e)?.label;
                break;
            case 'f':
                res = this.dataTypePoste?.find((d: any) => d.value == e)?.label;
                break;
            case 'p':
                res = this.dataPoste?.find((d: any) => d.value == e)?.label;
                break;
            case 'si':
                res = this.dataSite?.find((d: any) => d.value == e)?.label;
                break;
            case 'dir':
                res = this.dataDirection?.find((d: any) => d.value == e)?.label;
                break;
            case 'dep':
                res = this.dataDepartement?.find((d: any) => d.value == e)?.label;
                break;
            default:
                res = '-'
        }
        return res;
    }

    newPostData(url: string, payload: any, token: any) {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return new Promise((resolve, reject) => {
            this.http.post(url, payload, {headers})
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

    convertDateForForm(date: string | Date | null | undefined): string {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR');
    }

    choixDirection(event: any) {
        if (this.isDirection) return;
        this.dataService = [];
        this.statutForm.get('idservice')?.setValue('');
        this.statutForm.get('iddepartement')?.setValue('');
        this.departement(this.users?.datasociete?.uid, event.value, '');
    }

    choixDep(event: any) {
        if (this.isDirection) return;
        this.statutForm.get('idservice')?.setValue('');
        this.showService(this.users?.datasociete?.uid, '', event.value);
    }

    onDocSelected(file: File): void {
        this.selectedDoc = file;
        console.log('Document sélectionné :', file.name);
    }

    onDocRemoved(): void {
        this.selectedDoc = null;
        console.log('Document supprimé');
    }

}
