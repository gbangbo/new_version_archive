import {Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../environments/environment";
import {Authorization} from "../../protect/authorization.service";
import {HttpService} from "../../core/http.service";
import {cryptSession, decode64} from "../../config/config";
import {ToastrService} from "ngx-toastr";
import {Router, RouterModule} from "@angular/router";

@Component({
    selector: 'app-session-expired-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './session-expired-modal.component.html',
    styleUrl: './session-expired-modal.component.scss',
})
export class SessionExpiredModalComponent implements OnInit {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() msgCnx: any;
    public show: boolean = false;
    public loginForm: FormGroup;
    public validate: boolean = false;
    loading: boolean = false;
    errorTexte: string = "";

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey(event: KeyboardEvent) {
        // Reconnexion obligatoire : Échap ne doit pas fermer le modal
        event.preventDefault();
        event.stopPropagation();
    }

    isloading: boolean = false;
    users: any = [];

    constructor(private autor: Authorization, private httService: HttpService, private toast: ToastrService, private router: Router,) {
        this.users = this.autor.getInfosUsers();
        this.loginForm = new FormGroup({
            email: new FormControl(
                {value: this.users.email.trim(), disabled: true},
                [Validators.required, Validators.email]
            ),
            password: new FormControl("", Validators.required)
        });

    }

    ngOnInit() {
        this.errorTexte = this.msgCnx;
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne']?.currentValue) {
            console.log("data ====retour session", changes['dataLigne']?.currentValue)
        }
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
            this.loginForm.get('email')?.enable();
            this.loading = true;
            this.httService.postDataForLogin(`${environment.api_url}auth/:login`, {
                "email": this.loginForm.value.email,
                "password": this.loginForm.value.password
            }, '')
                .toPromise()
                .then((res: any) => {
                    this.loading = false;

                    if (res.body.status) {

                        let response: any = {...res.body.data, ...res.body.data.datas_users};
                        delete response.datas_users;
                        const mapData = {
                            ...response,
                            _menu: [],
                            dataUsers: []
                        };

                        const mapSession = cryptSession(JSON.stringify(mapData), decode64(environment.CONFIG.APP_PASS));
                        sessionStorage.setItem(environment.CONFIG.APP_TOKEN_NAME, mapSession);
                        localStorage.setItem("user", JSON.stringify(user));

                        if (!localStorage.getItem(environment.CONFIG.layout_name)) {
                            localStorage.setItem(environment.CONFIG.layout_name, 'dark-sidebar');
                        }

                        window.location.reload();

                    } else {
                        this.loginForm.get('email')?.disable();
                    }
                })
                .catch((err) => {
                    this.loginForm.get('email')?.disable();
                    console.log("err? =====", err)
                    this.loading = false;
                    let texteErro: string = '';
                    if (err?.error?.err?.non_field_errors) {
                        texteErro = err?.error?.err?.non_field_errors[0]
                    } else {
                        texteErro = err?.error?.err?.message
                    }
                    this.toast.error(`${texteErro || 'Une erreur est survenue.'} `, '',
                        {
                            positionClass: 'toast-top-right',
                            closeButton: true,
                            timeOut: 3000
                        })
                    setTimeout(() => {
                        this.errorTexte = `${texteErro || 'Une erreur est survenue.'} `;
                    }, 3000)
                });
        }
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }
}
