import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {ImageUploadComponent} from "../../users/widgets/image-upload/image-upload.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";


@Component({
    selector: 'app-societe',
    imports: [
        CommonModule,
        CardComponent,
        ImageUploadComponent,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzToolTipModule,
        NzTableModule],
    providers: [],
    templateUrl: './societe.component.html',
    styleUrl: './societe.component.scss',
})
export class SocieteComponent implements OnInit {
    societeForm!: FormGroup;
    dataSociete: any = [];


    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    isLoad: boolean = false;

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService,
                private toast: ToastrService) {

    }

    onImageSelected(file: File): void {
        console.log('Fichier sélectionné:', file);

        // Exemple: Upload vers votre API
        const formData = new FormData();
        formData.append('image', file);

        // this.http.post('votre-api/upload', formData).subscribe(...);
    }

    onImageRemoved(): void {
        console.log('Image supprimée');
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.societeForm = this.fb.group({
            action: [''],
            idsociete: [''],
            raison_sociale: ['', Validators.required],
            telephone: [''],
            email: [''],
            localisation: [''],
            active: [''],
        });
        this.societe();
    }

    submitForm(): void {
        this.errorTexte = ''
        if (this.societeForm.valid) {
            this.isLoad = true;
            this.societeForm.value.action = this.societeForm.value.action ? this.societeForm.value.action : 1;
            console.log(this.societeForm.value)
            this.httService.postData(`${environment.api_url}auth/:savesociete`, this.societeForm.value, this.users?.access_token)
                .toPromise()
                .then((res: any) => {
                    this.isLoad = false;
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    if (res.body.status) {
                        this.societeForm.reset({});
                        this.societe();
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
            Object.values(this.societeForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    resetForm(): void {
        this.societeForm.reset({});
    }

    societe() {
        this.isloading = true;
        this.dataSociete = [];
        this.httService.getData(`${environment.api_url}auth/:savesociete`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataSociete = res.body.data;
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
            idsociete: data?.uid,
            raison_sociale: data.raison_sociale,
            telephone: data.telephone,
            email: data.email,
            localisation: data.localisation,
            active: 1,
        }
        this.societeForm.setValue(payload);
    }
}
