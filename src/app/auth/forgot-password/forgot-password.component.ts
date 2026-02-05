import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpService} from "../../core/http.service";
import {environment} from "../../../environments/environment";
import {cryptSession, decode64} from "../../config/config";

@Component({
    selector: 'app-forgot-password',
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
})

export class ForgotPasswordComponent {

    public show: boolean = false;
    public loginForm: FormGroup;
    public validate: boolean = false;
    loading: boolean = false;
    errorTexte: string = "";

    constructor(public router: Router, private toast: ToastrService, private httService: HttpService) {

        const userDetails = localStorage.getItem('user');
        if (userDetails?.length != null) {
            // router.navigate(['/dashboard/default'])
        }

        this.loginForm = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email])
        })
    }

    showPassword() {
        this.show = !this.show;
    }

    login() {
        this.validate = true;
        this.errorTexte = "";
        if (this.loginForm.valid) {

            this.loading = true;
            this.httService.postData(`${environment.api_url}auth/:sendmail-reset-password`, {
                "email": this.loginForm.value.email
            }, '')
                .toPromise()
                .then((res: any) => {
                    this.loading = false;

                    debugger
                    if (res.body.status) {
                        const respons = res.body.data;
                        this.errorTexte = respons.message
                    }
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err)
                    this.toast.error(`${err?.error?.err?.message|| 'Une erreur est survenue.'} `, '',
                        {
                            positionClass: 'toast-top-right',
                            closeButton: true,
                            timeOut: 3000
                        })
                    setTimeout(() => {
                        this.errorTexte = `${err?.error?.err?.message || 'Une erreur est survenue.'} `;
                    }, 3000)
                });


        }
    }

}
