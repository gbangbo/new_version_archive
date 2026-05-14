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
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule} from "@danielmoncada/angular-datetime-picker";
import {FeatherIconComponent} from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import moment from "moment";

@Component({
    selector: 'app-carriere',
    imports: [CommonModule, FormsModule,
        ReactiveFormsModule, NzSwitchModule,
        Select2Module, CardComponent, OwlDateTimeModule,
        FeatherIconComponent],
    providers: [
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'}
    ],
    templateUrl: './carriere.component.html',
    styleUrl: './carriere.component.scss',
})
export class CarriereComponent {
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
    statutForm = new FormGroup({
        idservice: new FormControl('', Validators.required),
        idposte: new FormControl('', Validators.required),
        // idtypeposte: new FormControl('', Validators.required),
        idfonction: new FormControl('', Validators.required),
        numero_badge: new FormControl('', Validators.required),
        date_debut_contrat: new FormControl('', Validators.required),
        date_fin_contrat: new FormControl('', Validators.required),
        idstatutpersonnel: new FormControl('',),
        idpersonnel: new FormControl('',),
    }, {validators: this.dateRangeValidator})
    dataGenre: any = [
        {label: 'M', value: 'M'},
        {label: 'F', value: 'F'},
    ]

    errorTexte: string = '';
    ligneUser: any = {};

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

    constructor(private toast: ToastrService, private autor: Authorization, private httService: HttpService, private http: HttpClient) {
        this.users = this.autor.getInfosUsers();
        this.direction(this.users?.datasociete?.uid, '');
        this.departement(this.users?.datasociete?.uid, '', '');
        this.showFonction(this.users?.datasociete?.uid, '');
        this.savepostes(this.users?.datasociete?.uid, '');
        this.saveservice(this.users?.datasociete?.uid, '');
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
            console.log("Update user ", changes['dataLigne']?.currentValue)
            this.ligneUser = changes['dataLigne']?.currentValue

        }
    }

    async submitForm() {
        this.errorTexte = '';
        this.isloading = true;

        let payloadStatut = {
            ...this.statutForm.value,
            "action": this.statutForm.value.idstatutpersonnel ? 2 : 1,
            "idstatutpersonnel": this.statutForm.value.idstatutpersonnel || '',
            "date_debut_contrat": moment(this.statutForm.value.date_debut_contrat).format('YYYY-MM-DD'),
            "date_fin_contrat": moment(this.statutForm.value.date_fin_contrat).format('YYYY-MM-DD'),
            "idpersonnel": this.ligneUser.uid,
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
            console.log(this.statutForm)
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
                res = this.dataService.find((d: any) => d.value == e).label;
                break;
            case 'f':
                res = this.dataTypePoste.find((d: any) => d.value == e).label;
                break;
            case 'p':
                res = this.dataPoste.find((d: any) => d.value == e).label;
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
}
