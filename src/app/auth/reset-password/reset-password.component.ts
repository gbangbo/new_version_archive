import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule, ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpService} from "../../core/http.service";
import {environment} from "../../../environments/environment";
import {cryptSession, decode64, decryptData, postDataCrypte} from "../../config/config";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export const passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('cfpassword')?.value;

    if (!password || !confirmPassword) {
        return null;
    }

    return password === confirmPassword
        ? null
        : {passwordMismatch: true};
};

@Component({
    selector: 'app-reset-password',
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss',
})

export class ResetPasswordComponent {

    show: boolean = false;
    showCf: boolean = false;
    loginForm: FormGroup;
    validate: boolean = false;
    loading: boolean = false;
    errorTexte: string = "";

    constructor(public router: Router,
                private toast: ToastrService,
                private httService: HttpService,
                private route: ActivatedRoute, private http: HttpClient) {
        localStorage.clear();
        sessionStorage.clear();
        this.loginForm = new FormGroup(
            {
                email: new FormControl("", [Validators.required, Validators.email]),
                userId: new FormControl("", Validators.required),
                password: new FormControl("", [Validators.required, Validators.minLength(4)]),
                cfpassword: new FormControl("", Validators.required)
            },
            {validators: passwordMatchValidator}
        );
        const token = this.route.snapshot.paramMap.get('token');
        if (!token) {

            return
        }
        this.showInfo(token)
    }




    showPassword() {
        this.show = !this.show;
    }

    showPasswordCF() {
        this.showCf = !this.showCf;
    }

    async login() {
        this.validate = true;
        this.errorTexte = "";
        if (this.loginForm.valid) {
            this.loading = true;
            try {
                let res: any = await this.newPostData(`${environment.api_url}auth/:modification-du-mot-de-passe`, {
                    data: postDataCrypte({
                        userId: this.loginForm.value.userId,
                        mot_de_passe: this.loginForm.value.password,
                        confirm_mot_de_passe: this.loginForm.value.password,
                    })
                }, '');
                let rPons = decryptData(res.data);
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
                } else {
                    this.toast.success(`${rPons.message} `, '',
                        {
                            positionClass: 'toast-top-right',
                            closeButton: true,
                            timeOut: 3000
                        })
                }
            } catch (e: any) {
                this.loading = false;
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

            let user = {
                email: "Test@gmail.com",
                password: "test123"
            };


            this.httService.postData(`${environment.api_url}auth/:login`, {
                "email": this.loginForm.value.email,
                "password": this.loginForm.value.password,

            }, '')
                .toPromise()
                .then((res: any) => {
                    this.loading = false;
                    if (res.body.status) {
                        const respons = res.body.data;
                        const mapData = {
                            ...respons,
                            _menu: [],
                            dataUsers: []
                        };
                        const mapSession = cryptSession(JSON.stringify(mapData), decode64(environment.CONFIG.APP_PASS));
                        sessionStorage.setItem(environment.CONFIG.APP_TOKEN_NAME, mapSession);

                        localStorage.setItem("user", JSON.stringify(user));

                        if (!localStorage.getItem(environment.CONFIG.layout_name)) {
                            localStorage.setItem(environment.CONFIG.layout_name, 'dark-sidebar');
                        }
                        this.router.navigate(["/dashboard/default"]);
                    }
                })
                .catch((err) => {
                    this.loading = false;
                    this.toast.error(`${err?.error?.err?.non_field_errors[0] || 'Une erreur est survenue.'} `, '',
                        {
                            positionClass: 'toast-top-right',
                            closeButton: true,
                            timeOut: 3000
                        })
                    setTimeout(() => {
                        this.errorTexte = `${err?.error?.err?.non_field_errors[0] || 'Une erreur est survenue.'} `;
                    }, 3000)
                });


        }
    }


    showInfo(uid: string = '') {
        if (!uid) return;
        this.httService.getData(`${environment.api_url}auth/:modification-du-mot-de-passe?uid=${uid}`, false, '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status) {
                    console.log(" res.body=== ",)
                    this.loginForm.patchValue({
                        email: res.body.data[0].email,
                        userId: uid,
                        password: '',
                        cfpassword: ''
                    })
                }
            })
            .catch((err) => {
            });

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
