import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";
import {ImageUploadComponent} from "../../../users/widgets/image-upload/image-upload.component";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {decryptData, postDataCrypte} from "../../../../config/config";

@Component({
    selector: 'app-societe-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ImageUploadComponent, NzSwitchModule],
    templateUrl: './societe-modal.component.html',
    styleUrl: './societe-modal.component.scss',
})
export class SocieteModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        raison_sociale: new FormControl('', Validators.required),
        uid: new FormControl('',),
        telephone: new FormControl('',),
        email: new FormControl('',),
        localisation: new FormControl('',),
        double_auth: new FormControl('',),
        actif: new FormControl(true,),
        position: new FormControl('',),
        parent: new FormControl('',)

    })
    errorTexte: string = '';
    imageUrl: string = '';

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    selectedFile: File | null = null;
    typeAlerte: string = '';
    title: string = 'AJOUTER UNE SOCIETE';

    constructor(private autor: Authorization, private httService: HttpService, private http: HttpClient) {
        this.users = this.autor.getInfosUsers();
    }

    ngOnChanges(changes: SimpleChanges) {
        // if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
        //     this.imageUrl = changes['dataLigne']?.currentValue?.logo || '';
        //     console.log(changes['dataLigne']?.currentValue)
        //     this.validationForm.patchValue({
        //         ...changes['dataLigne']?.currentValue,
        //         parent: changes['dataLigne']?.currentValue?.parent
        //     });
        //     if (changes['dataLigne']?.currentValue?.parent) {
        //         this.title = `AJOUT DE SOUS SOCIETE`
        //         this.errorTexte = `Vous êtes sur le point d'ajouter une sous société à la société ${changes['dataLigne']?.currentValue?.r}`;
        //         this.typeAlerte = 'prim';
        //     }
        //     if (changes['dataLigne']?.currentValue?.uid) {
        //         this.title = `MODIFICATION DE LA SOCIETE`;
        //     }
        // }


        const data = changes['dataLigne']?.currentValue;
        console.log("data ====", data)
        if (data && Object.keys(data).length > 0) {
            this.validationForm.patchValue({
                raison_sociale: data.sens == 'a' ? '' : data?.name,
                telephone: data.sens == 'a' ? '' : data?.telephone,
                email: data.sens == 'a' ? '' : data?.email,
                localisation: data.sens == 'a' ? '' : data?.localisation,
                double_auth: data.sens == 'a' ? '' : data?.double_auth,
                position: data?.position || '',
                actif: data?.actif || true,
                parent: data?.parent,
            });

            // {
            //     raison_sociale: new FormControl('', Validators.required),
            //         uid: new FormControl('',),
            //     telephone: new FormControl('',),
            //     email: new FormControl('',),
            //     localisation: new FormControl('',),
            //     double_auth: new FormControl('',),
            //     actif: new FormControl(true,),
            //     position: new FormControl('',),
            //     parent: new FormControl('',)
            //
            // }

            console.log("this.validationForm ===", this.validationForm.value)
            this.title = data?.sens == 'a' ? `AJOUT DE SOUS-SOCIETE` : `MODIFICATION DE  SOUS-SOCIETE`
            this.errorTexte = `Vous êtes sur le point ${data?.sens == 'a' ? `d’ajouter un` : `de modifier le`} sous-société  ${data?.sens == 'a' ? `à la société` : ``} « ${changes['dataLigne']?.currentValue?.name} ».`;
            this.typeAlerte = 'prim';
        }
    }

    async submitForm() {
        this.errorTexte = '';
        this.validationForm.markAllAsTouched();
        if (!this.validationForm.valid) {
            return;
        }

        this.isloading = true;
        let payload = {
            ...this.validationForm.value,
            "action": this.validationForm.value.uid ? 2 : 1,
            "double_auth": this.validationForm.value.double_auth ? 1 : 0,
            "parent": this.validationForm.value.parent || '',
            "idsociete": this.users?.datasociete?.uid,
        }
        console.log("payload ====", payload)
        let rPons: any = {};
        try {
            let res: any = await this.newPostData(`${environment.api_url}auth/:savesociete`,
                {
                    data: postDataCrypte(payload)
                }, this.users?.access_token);
            rPons = decryptData(res.data);
            if (!rPons.status) {
                this.errorTexte = `${rPons.message || 'Une erreur est survenue.'}`;
                this.typeAlerte = 'danger';
                return
            }
        } catch (e: any) {
            this.isloading = false;
            this.errorTexte = e?.error?.message || "Une erreur est survenue !";
            this.typeAlerte = 'danger';
            return
        }

        if (!this.selectedFile) {
            this.closeModal(true);
            Swal.fire({
                title: rPons?.message,
                icon: 'success',
                confirmButtonText: 'OK'
            })
            return
        }

        const formData = new FormData();
        formData.append('societe_uid', rPons.data.uid);
        if (this.selectedFile) {
            formData.append('logo', this.selectedFile);
        }

        this.isloading = true;
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.users?.access_token}`
        });
        this.http.post(`${environment.URL_API}auth/save-logo-societe`, formData, {headers}).subscribe({
            next: (res: any) => {
                console.log(res)
                this.isloading = false;
                if (res.success) {
                    this.closeModal(true);
                    Swal.fire({
                        title: rPons?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            },
            error: (err) => {
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !";
                this.typeAlerte = 'danger';
            }
        });

    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }


    onImageSelected(file: File): void {
        this.selectedFile = file;
    }

    onImageRemoved(): void {
        this.selectedFile = null;
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
