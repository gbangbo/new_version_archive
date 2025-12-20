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
    selector: 'app-direction',
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
    templateUrl: './direction.component.html',
    styleUrl: './direction.component.scss',
})
export class DirectionComponent implements OnInit {
    societeDirection!: FormGroup;
    dataDirection: any = [];


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
        this.societeDirection = this.fb.group({
            action: [''],
            iddirection: [''],
            idsociete: [''],
            sigle_direction: ['', Validators.required],
            libelle_direction: ['', Validators.required]
        });
        this.direction(this.users?.dataSociete?.uid, '');
    }

    submitForm(): void {
        this.errorTexte = ''

        if (this.societeDirection.valid) {
            this.isLoad = true;
            this.societeDirection.value.action = this.societeDirection.value.action ? this.societeDirection.value.action : 1;
            this.societeDirection.value.idsociete = this.societeDirection.value.idsociete ? this.societeDirection.value.idsociete : this.users?.dataSociete?.uid
            console.log(this.societeDirection.value)
            this.httService.postData(`${environment.api_url}auth/:savedirection`, this.societeDirection.value, this.users?.access_token)
                .toPromise()
                .then((res: any) => {
                    this.isLoad = false;
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    if (res.body.status) {
                        this.societeDirection.reset({});
                        this.direction(this.users?.dataSociete?.uid, '');
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
            Object.values(this.societeDirection.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    resetForm(): void {
        this.errorTexte = '';
        this.societeDirection.reset({});
    }

    direction(idsociete: string = '', iddirection: string = '') {
        this.isloading = true;
        this.dataDirection = [];
        this.httService.getData(`${environment.api_url}auth/:savedirection?idsociete=${idsociete}&iddirection=${iddirection}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataDirection = res.body.data;
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
            iddirection: data.uid,
            idsociete: data.datasociete.uid,
            sigle_direction: data.sigle_direction,
            libelle_direction: data.libelle_direction
        }
        console.log(data)
        this.societeDirection.setValue(payload);
    }
}
