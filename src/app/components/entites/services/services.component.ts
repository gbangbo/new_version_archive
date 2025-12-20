import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {Select2Module} from "ng-select2-component";
import {NzSelectModule} from "ng-zorro-antd/select";


@Component({
    selector: 'app-services',
    imports: [
        CommonModule,
        CardComponent,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzToolTipModule,
        NzSelectModule,
        Select2Module,
        NzTableModule],
    providers: [],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
    societeService!: FormGroup;
    dataSociete: any = [];
    dataDirection: any = [];
    dataDepartement: any = [];
    dataServices: any = [];


    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    isLoad: boolean = false;

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService,
                private toast: ToastrService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.societeService = this.fb.group({
            action: [''],
            idservice: [''],
            iddirection: [''],
            idsociete: [''],
            iddepartement: [''],
            sigle_service: ['', Validators.required],
            libelle_service: ['', Validators.required]
        });

        this.direction(this.users?.dataSociete?.uid, '');
        this.services(this.users?.dataSociete?.uid, '', '');
        console.log(this.users)
    }

    submitForm(): void {
        this.errorTexte = ''

        if (this.societeService.valid) {
            this.isLoad = true;
            this.societeService.value.action = this.societeService.value.action ? this.societeService.value.action : 1;
            this.societeService.value.idsociete = this.societeService.value.idsociete ? this.societeService.value.idsociete : this.users?.dataSociete?.uid
            console.log(this.societeService.value)
            this.httService.postData(`${environment.api_url}auth/:saveservice`, this.societeService.value, this.users?.access_token)
                .toPromise()
                .then((res: any) => {
                    this.isLoad = false;
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    if (res.body.status) {

                        this.societeService.reset({});
                        this.services(this.users?.dataSociete?.uid, '', '');
                        this.toast.success(`${res.body.message}`, '',
                            {
                                positionClass: 'toast-top-right',
                                closeButton: true,
                                timeOut: 3000
                            })
                    }
                })
                .catch((err) => {
                    this.isLoad = false;
                    console.log(err?.error)
                    this.toast.error(`${err?.error?.err?.message || 'Une erreur est survenue.'} `, '',
                        {
                            positionClass: 'toast-top-right',
                            closeButton: true,
                            timeOut: 3000
                        })
                    setTimeout(() => {
                        this.errorTexte = `${err?.error?.err?.message || 'Une erreur est survenue.'} `;
                    }, 3000)
                });
        } else {
            Object.values(this.societeService.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    resetForm(): void {
        this.errorTexte = '';
        this.societeService.reset({});
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

        this.dataDepartement = [];
        this.httService.getData(`${environment.api_url}auth/:savedepartement?idsociete=${idsociete}&iddirection=${iddirection}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status) {
                    this.dataDepartement = res.body.data;
                    console.log(res.body.data)
                }
            })
            .catch((err) => {
            });

    }

    services(idsociete: string = '', idservice: string = '', iddepartement: string = '') {
        this.isloading = true;
        this.dataServices = [];
        this.httService.getData(`${environment.api_url}auth/:saveservice?idsociete=${idsociete}&idservice=${idservice}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataServices = res.body.data;
                    console.log(res.body.data)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    actionBtn(data: any) {
        this.errorTexte = ''
        let payload = {
            action: 2,
            iddepartement: data?.datadepartement?.uid,
            iddirection: data?.datadepartement?.datadirection?.uid,
            idservice: data.uid,
            idsociete: data.datadepartement?.datadirection?.datasociete?.uid,
            sigle_service: data.sigle_service,
            libelle_service: data.libelle_service
        }
        console.log(data)

        this.societeService.setValue(payload);
    }

    changeDirection(uid: string) {
        this.dataDepartement = [];
        if (!uid) return;
        this.departement(this.users?.dataSociete?.uid, uid, '');
    }
}

