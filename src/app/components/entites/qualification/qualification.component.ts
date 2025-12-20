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
    selector: 'app-qualification',
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
    templateUrl: './qualification.component.html',
    styleUrl: './qualification.component.scss',
})
export class QualificationComponent implements OnInit {
    posteForm!: FormGroup;
    dataDirection: any = [];
    dataPostes: any = [];


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
        this.posteForm = this.fb.group({
            action: [''],
            idposte: [''],
            idsociete: [''],
            sigle_poste: ['', Validators.required],
            libelle_poste: ['', Validators.required]
        });
        this.postes(this.users?.dataSociete?.uid);
    }

    submitForm(): void {
        this.errorTexte = ''

        if (this.posteForm.valid) {
            this.isLoad = true;
            this.posteForm.value.action = this.posteForm.value.action ? this.posteForm.value.action : 1;
            this.posteForm.value.idsociete = this.posteForm.value.idsociete ? this.posteForm.value.idsociete : this.users?.dataSociete?.uid
            console.log(this.posteForm.value)
            this.httService.postData(`${environment.api_url}auth/:savepostes`, this.posteForm.value, this.users?.access_token)
                .toPromise()
                .then((res: any) => {
                    this.isLoad = false;
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    if (res.body.status) {
                        this.posteForm.reset({});
                        this.postes(this.users?.dataSociete?.uid);
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
            Object.values(this.posteForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    resetForm(): void {
        this.errorTexte = '';
        this.posteForm.reset({});
    }

    postes(idsociete: string = '') {
        this.isloading = true;
        this.dataPostes = [];
        this.httService.getData(`${environment.api_url}auth/:savepostes?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataPostes = res.body.data;
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
            idposte: data.uid,
            idsociete: data.datasociete.uid,
            sigle_poste: data.sigle_poste,
            libelle_poste: data.libelle_poste
        }
        console.log(data)
        this.posteForm.setValue(payload);
    }
}
