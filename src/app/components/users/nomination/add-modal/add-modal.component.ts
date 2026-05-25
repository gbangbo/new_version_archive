import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";
import {SvgNominationComponent} from "./svg-nomination/svg-nomination.component";
import moment from "moment";
import {Select2Module} from "ng-select2-component";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "@danielmoncada/angular-datetime-picker";

@Component({
    selector: 'app-add-modal',
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzTreeSelectModule,
        SvgNominationComponent,
        Select2Module, OwlDateTimeModule,
        OwlNativeDateTimeModule],
    templateUrl: './add-modal.component.html',
    styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        idagent: new FormControl('', Validators.required),
        idservice: new FormControl('',),
        date_nommination: new FormControl('', Validators.required)

    })
    errorTexte: string = '';
    imageUrl: string = '';
    dataUser: any[];

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    isloadService: boolean = false;
    users: any = [];
    dataSociete: any = [];
    typeAlerte: string = '';
    title: string = '';

    is: boolean = false;

    constructor(private autor: Authorization, private httService: HttpService, private http: HttpClient) {
        this.users = this.autor.getInfosUsers();
        this.viewCompte(this.users?.datasociete?.uid, '');
    }

    ngOnChanges(changes: SimpleChanges) {

        const data = changes['dataLigne']?.currentValue;
        this.is = data?.is || false;
        console.log("data ====", data)
        setTimeout(() => {
            if (data && Object.keys(data).length > 0) {

                this.validationForm.patchValue({
                    idagent: data?.idagent,
                    idservice: data?.key,
                    date_nommination: data?.date_nommination
                });

                console.log("this.validationForm ===", this.validationForm.value)
                this.title = `NOMINATION`
                this.errorTexte = `Vous êtes sur le point de nommer le responsable au poste de  « ${changes['dataLigne']?.currentValue?.name} ».`;
                this.typeAlerte = 'prim';
            }
        }, 10)

    }

    viewCompte(idsociete: string = '', idpersonnel: string = '') {
        this.isloadService = true;
        this.dataUser = []
        this.httService.getData(`${environment.api_url}auth/:liste-des-comptes?idsociete=${idsociete}&idpersonnel=${idpersonnel}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloadService = false;
                console.log("Liste des comptes ===", res.body.data)
                if (res.body.status) {

                    this.dataUser = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            value: e.uid || e.id,
                            label: `${e.datapersonnel.nom} ${e.datapersonnel.prenom}`,
                            photo: `${e.datapersonnel.photo}`,
                            created_at: moment(e?.created_at).format('DD/MM/YYYY')
                        }
                    });
                }
            })
            .catch((err) => {
                this.isloadService = false;
            });

    }

    formatNode(node: any): any {
        return {
            title: node.raison_sociale,
            key: node.uid,

            isLeaf: !node.children || node.children.length === 0,

            children: node.children?.map((child: any) => {
                return this.formatNode(child);
            }) || []
        };
    }

    submitForm(): void {
        this.errorTexte = ''
        let payload = {
            ...this.validationForm.value,
            "action": 1,
            "idsociete": this.users?.datasociete?.uid,
            "idservice": this.validationForm.value.idservice,
            "idagent": this.validationForm.value.idagent,
            "date_nommination": moment(this.validationForm.value.date_nommination).format('YYYY-MM-DD'),
        }

        this.isloading = true;
        console.log("payload ======", payload)

        this.httService.postData(`${environment.api_url}auth/:save-nommination-responsable-service`, payload, this.users?.access_token)
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("res.body ===", res.body)
                if (res.body.status || res.body.success) {
                    this.closeModal(true);
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                } else {
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            })
            .catch((err) => {
                this.isloading = false;
                this.typeAlerte = 'danger';
                this.errorTexte = `${err?.error?.err?.message || 'Une erreur est survenue.'} `;
            });
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }


    onChange($event: string): void {
        console.log($event);
    }
}
