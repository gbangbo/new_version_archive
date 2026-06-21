import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {Select2Module} from "ng-select2-component";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import {environment} from "../../../../../environments/environment";
import Swal from "sweetalert2";
import {ImageUploadComponent} from "../../widgets/image-upload/image-upload.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {cryptSession, decode64, decryptData, postDataCrypte} from "../../../../config/config";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-info-perso',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule, Select2Module, ImageUploadComponent],
    templateUrl: './info-perso.component.html',
    styleUrl: './info-perso.component.scss',
})
export class InfoPersoComponent implements OnInit {

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
    dataGenre: any = [
        {label: 'M', value: 'M'},
        {label: 'F', value: 'F'},
    ]

    errorTexte: string = '';
    isloading: boolean = false
    users: any = []

    dataService: any = [];
    loadingPoste: boolean = false;
    selectedFile: File | null = null;
    private isChange: boolean = false;

    constructor(private toast: ToastrService, private autor: Authorization, private httService: HttpService, private http: HttpClient) {

    }

    ngOnInit() {
        this.isChange = false;
        this.users = this.autor.getInfosUsers();
        this.showPersonal(this.users?.datasociete?.uid, this.users.datapersonnel.uid)
    }

    showPersonal(idsociete: string, idpersonnel: string) {

        this.httService.getData(`${environment.api_url}auth/:savepersonnel?idsociete=${idsociete}&idpersonnel=${idpersonnel}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status) {

                    this.validationForm.patchValue({
                        ...res.body.data[0]
                    });
                    if (this.isChange) {
                        /**
                         * Changement des donnes de la session
                         */
                        this.users.datapersonnel = res.body.data[0];
                        const mapSession = cryptSession(JSON.stringify(this.users), decode64(environment.CONFIG.APP_PASS));
                        sessionStorage.setItem(environment.CONFIG.APP_TOKEN_NAME, mapSession);
                        this.isChange = false;
                    }
                }
            })
            .catch((err: any) => {
            });

    }

    async submitForm() {
        this.errorTexte = '';
        this.validationForm.markAllAsTouched();
        if (!this.validationForm.valid) {
            return;
        }
        this.isloading = true;
        let payload = {
            "action": 2,
            "idpersonnel": this.users.datapersonnel.uid,
            "emailAgent": this.users.email,
            "idsociete": this.users?.datasociete?.uid,
            "nom": this.validationForm.value.nom,
            "prenom": this.validationForm.value.prenom,
            "telMobile": this.validationForm.value.telMobile,
            "telDomicile": this.validationForm.value.telMobile,
            "sexe": this.validationForm.value.sexe,
        }
        console.log("payload de savepersonnel", payload)
        let rPons: any = {};
        try {
            let res: any = await this.newPostData(`${environment.api_url}auth/:savepersonnel`,
                {
                    data: postDataCrypte(payload)
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

        if (!this.selectedFile) {
            this.isChange = true;
            this.showPersonal(this.users?.datasociete?.uid, this.users.datapersonnel.uid);

            Swal.fire({
                title: "Mise à jour réussie !",
                html: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <p style="margin: 0; font-size: 15px; color: #374151;">
                Vos données ont été mises à jour avec succès.
            </p>
            <div style="
                display: flex;
                align-items: center;
                gap: 8px;
                background: #f0fdf4;
                border: 1px solid #bbf7d0;
                border-radius: 8px;
                padding: 10px 16px;
                margin-top: 6px;
            ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style="font-size: 13px; color: #16a34a;">
                    Au prochain rechargement, vos données seront actualisées.
                </span>
            </div>
        </div>
    `,
                icon: 'success',
                confirmButtonText: '✓ OK',
                confirmButtonColor: 'hsl(208, 67%, 24%)',
                customClass: {
                    title: 'swal-title-custom',
                    confirmButton: 'swal-btn-custom'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            this.isloading = false;
            return
        }


        const formData = new FormData();
        formData.append('personnel_uid ', this.users.datapersonnel.uid);
        if (this.selectedFile) {
            formData.append('photo', this.selectedFile);
        }

        this.isloading = true;
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.users?.access_token}`
        });
        this.http.post(`${environment.URL_API}auth/save-photo-personnel`, formData, {headers}).subscribe({
            next: (res: any) => {
                this.isloading = false;
                // succès
                console.log(res)
                this.isloading = false;
                if (res.success) {
                    this.isChange = true;
                    this.showPersonal(this.users?.datasociete?.uid, this.users.datapersonnel.uid)
                    Swal.fire({
                        title: "Mise à jour réussie !",
                        html: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <p style="margin: 0; font-size: 15px; color: #374151;">
                Vos données ont été mises à jour avec succès.
            </p>
            <div style="
                display: flex;
                align-items: center;
                gap: 8px;
                background: #f0fdf4;
                border: 1px solid #bbf7d0;
                border-radius: 8px;
                padding: 10px 16px;
                margin-top: 6px;
            ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style="font-size: 13px; color: #16a34a;">
                    Au prochain rechargement, vos données seront actualisées.
                </span>
            </div>
        </div>
    `,
                        icon: 'success',
                        confirmButtonText: '✓ OK',
                        confirmButtonColor: 'hsl(208, 67%, 24%)',
                        customClass: {
                            title: 'swal-title-custom',
                            confirmButton: 'swal-btn-custom'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }
            },
            error: (err) => {
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !"
            }
        });

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
