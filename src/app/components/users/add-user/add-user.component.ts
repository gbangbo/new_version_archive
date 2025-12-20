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
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzIconModule} from "ng-zorro-antd/icon";


@Component({
    selector: 'app-add-user',
    imports: [
        CommonModule,
        CardComponent,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzToolTipModule,
        NzSelectModule,
        Select2Module,
        NzTabsModule,
        NzIconModule,
        NzTableModule],
    providers: [],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
    societeDepartement!: FormGroup;
    dataSociete: any = [];
    dataDirection: any = [];
    dataDepartement: any = [];


    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    isLoad: boolean = false;
    dataPersonnel: any=[];

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService,
                private toast: ToastrService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.societeDepartement = this.fb.group({
            action: [''],
            iddirection: [''],
            idsociete: [''],
            iddepartement: [''],
            sigle_departement: ['', Validators.required],
            libelle_departement: ['', Validators.required]
        });

        this.direction(this.users?.dataSociete?.uid, '');
        this.departement(this.users?.dataSociete?.uid, '', '');
        this.personnel(this.users?.dataSociete?.uid, '', '');
        console.log(this.users)
    }

    submitForm(): void {
        this.errorTexte = ''

        if (this.societeDepartement.valid) {
            this.isLoad = true;
            this.societeDepartement.value.action = this.societeDepartement.value.action ? this.societeDepartement.value.action : 1;
            this.societeDepartement.value.idsociete = this.societeDepartement.value.idsociete ? this.societeDepartement.value.idsociete : this.users?.dataSociete?.uid
            console.log(this.societeDepartement.value)
            this.httService.postData(`${environment.api_url}auth/:savepersonnel`, this.societeDepartement.value, this.users?.access_token)
                .toPromise()
                .then((res: any) => {
                    this.isLoad = false;
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    if (res.body.status) {

                        this.societeDepartement.reset({});
                        this.departement(this.users?.dataSociete?.uid, '', '');
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
            Object.values(this.societeDepartement.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    resetForm(): void {
        this.errorTexte = '';
        this.societeDepartement.reset({});
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
                    this.dataDepartement = res.body.data;
                    console.log(res.body.data)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }
    personnel(idsociete: string = '', iddirection: string = '', iddepartement: string = '') {
        this.isloading = true;
        this.dataPersonnel = [];
        this.httService.getData(`${environment.api_url}auth/:savepersonnel?idsociete=${idsociete}&iddirection=${iddirection}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataPersonnel = res.body.data;
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
            iddepartement: data.uid,
            iddirection: data.datadirection.uid,
            idsociete: data.datadirection.datasociete.uid,
            sigle_departement: data.sigle_departement,
            libelle_departement: data.libelle_departement
        }
        console.log(data)


        this.societeDepartement.setValue(payload);
    }
}
