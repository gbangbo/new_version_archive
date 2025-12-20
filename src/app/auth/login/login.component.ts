import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpService} from "../../core/http.service";
import {environment} from "../../../environments/environment";
import {cryptSession, decode64} from "../../config/config";

@Component({
    selector: 'app-login',
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class LoginComponent {

    public show: boolean = false;
    public loginForm: FormGroup;
    public validate: boolean = false;
    loading: boolean = false;
    errorTexte: string = "";

    constructor(public router: Router, private toast: ToastrService, private httService: HttpService) {

        const userDetails = localStorage.getItem('user');
        if (userDetails?.length != null) {
            router.navigate(['/dashboard/default'])
        }

        this.loginForm = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", Validators.required)
        })
    }

    showPassword() {
        this.show = !this.show;
    }

    login() {
        this.validate = true;
        this.errorTexte = "";
        if (this.loginForm.valid) {


            let user = {
                email: "Test@gmail.com",
                password: "test123"
            };

            this.loading = true;
            this.httService.postData(`${environment.api_url}auth/:login`, {
                "email": this.loginForm.value.email,
                "password": this.loginForm.value.password
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

}
