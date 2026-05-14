import {CommonModule} from '@angular/common';
import {AfterViewInit, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpService} from "../../core/http.service";
import {environment} from "../../../environments/environment";
import {cryptSession, decode64, decryptData, postDataCrypte} from "../../config/config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import Swal from "sweetalert2";
import {Authorization} from "../../protect/authorization.service";

@Component({
    selector: 'app-confirme-auth-otp',
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './confirme-auth-otp.component.html',
    styleUrl: './confirme-auth-otp.component.scss',
})

export class ConfirmeAuthOtpComponent implements AfterViewInit {

    public show: boolean = false;
    public loginForm: FormGroup;
    public validate: boolean = false;
    loading: boolean = false;
    errorTexte: string = "Nous vous avons envoyé un code de verification par mail, Veuillez le renseigner svp.";
    @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
    otpCode: string = '';
    private isPasting: boolean = false; // Flag pour éviter les conflits
    users: any = []
    typeAlerte: string = 'info';
    current: number;
    isDisabled: boolean = true;

    constructor(public router: Router, private toast: ToastrService, private httService: HttpService,
                private http: HttpClient, private autor: Authorization,) {

        // const userDetails = localStorage.getItem('user');
        // if (userDetails?.length != null) {
        //     router.navigate(['/dashboard/accueil'])
        // }
        this.countdown(30);
        this.users = this.autor.getInfosTemp();
        this.loginForm = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", Validators.required)
        })
    }

    showPassword() {
        this.show = !this.show;
    }

    async login(otp: string) {
        this.validate = true;
        this.loading = true;
        this.errorTexte = "";


        let user = {
            email: "Test@gmail.com",
            password: "test123"
        };

        let rStatut: any = {}

        try {
            let payloadStatut = {
                "iduser": this.users?.uid,
                "code_otp": otp,
            }
            console.log("this.users ====", this.users);

            console.log("payloadStatut =====", payloadStatut)
            let responseForStatut: any = await this.newPostData(`${environment.api_url}auth/:verification-code-opt`, {data: postDataCrypte(payloadStatut)}, '')
            rStatut = decryptData(responseForStatut.data);
            console.log("retour de l'ajout statut ====", rStatut)
            if (rStatut.status) {
                // this.typeAlerte = 'success';
                // this.errorTexte = `${rStatut?.message || 'Une erreur est survenue.'}`;
                // Swal.fire({
                //     title: rStatut?.message,
                //     icon: 'success',
                //     confirmButtonText: 'OK'
                // })
            } else {
                this.loading = false;
            }

        } catch (e: any) {
            this.errorTexte = `${e?.error?.message || 'Une erreur est survenue.'}`;
            this.typeAlerte = 'danger';
            console.log("=======e", e)
            this.loading = false;
            return
        }

        this.httService.postData(`${environment.api_url}auth/:login`, {
            "email": this.users.email,
            "password": this.users.err
        }, '')
            .toPromise()
            .then((res: any) => {
                this.loading = false;
                if (res.body.status) {

                    sessionStorage.removeItem(`_temp_`);

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


    ngAfterViewInit() {
        setTimeout(() => {
            const inputs = this.otpInputs.toArray();
            if (inputs.length > 0) {
                inputs[0].nativeElement.focus();
            }
        }, 100);
    }

    handleInput(event: Event, index: number): void {
        // Ne rien faire si on est en train de coller
        if (this.isPasting) {
            return;
        }

        const input = event.target as HTMLInputElement;
        let value = input.value;

        // Si plusieurs caractères ont été saisis (copier-coller rapide)
        if (value.length > 1) {
            value = value.charAt(value.length - 1); // Garder le dernier caractère
        }

        // Supprimer tout ce qui n'est pas un chiffre
        const cleanValue = value.replace(/\D/g, '');
        input.value = cleanValue;

        // Si un chiffre a été saisi, passer au champ suivant
        if (cleanValue.length > 0 && index < 5) {
            const inputs = this.otpInputs.toArray();
            setTimeout(() => {
                inputs[index + 1].nativeElement.focus();
            }, 10);
        }

        this.updateOtpCode();
    }

    handleKeydown(event: KeyboardEvent, index: number): void {
        const input = event.target as HTMLInputElement;

        // Backspace : revenir au champ précédent si vide
        if (event.key === 'Backspace') {
            if (input.value === '' && index > 0) {
                event.preventDefault();
                const inputs = this.otpInputs.toArray();
                setTimeout(() => {
                    inputs[index - 1].nativeElement.focus();
                    inputs[index - 1].nativeElement.select();
                }, 10);
            }
        }

        // Delete : effacer et rester sur place
        if (event.key === 'Delete') {
            input.value = '';
            this.updateOtpCode();
        }

        // Flèche gauche
        if (event.key === 'ArrowLeft' && index > 0) {
            event.preventDefault();
            const inputs = this.otpInputs.toArray();
            inputs[index - 1].nativeElement.focus();
        }

        // Flèche droite
        if (event.key === 'ArrowRight' && index < 5) {
            event.preventDefault();
            const inputs = this.otpInputs.toArray();
            inputs[index + 1].nativeElement.focus();
        }
    }

    handlePaste(event: ClipboardEvent): void {
        event.preventDefault();
        event.stopPropagation();

        this.isPasting = true;

        const pastedText = event.clipboardData?.getData('text') || '';
        const digits = pastedText.replace(/\D/g, '').slice(0, 6);

        if (digits.length === 0) {
            this.isPasting = false;
            return;
        }

        const inputs = this.otpInputs.toArray();

        inputs.forEach(input => {
            input.nativeElement.value = '';
        });

        setTimeout(() => {
            for (let i = 0; i < Math.min(digits.length, 6); i++) {
                if (inputs[i]) {
                    inputs[i].nativeElement.value = digits[i];
                }
            }

            const lastIndex = Math.min(digits.length, 6) - 1;
            if (inputs[lastIndex]) {
                inputs[lastIndex].nativeElement.focus();
            }

            // ← Désactiver isPasting AVANT d'appeler updateOtpCode
            this.isPasting = false;
            this.updateOtpCode();

        }, 10);
    }

    updateOtpCode(): void {
        const inputs = this.otpInputs.toArray();
        this.otpCode = inputs.map(input => input.nativeElement.value).join('');

        console.log('Code OTP actuel:', this.otpCode);

        // Si le code est complet (6 chiffres)
        if (this.otpCode.length === 6 && !this.isPasting) {

            console.log('✅ Code OTP complet:', this.otpCode);
            this.login(this.otpCode);
        }
    }

    resetOtp(): void {
        const inputs = this.otpInputs.toArray();
        inputs.forEach(input => {
            input.nativeElement.value = '';
        });
        this.otpCode = '';
        if (inputs[0]) {
            inputs[0].nativeElement.focus();
        }
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

    renvoyerOtp() {
        console.log("Re-envoi de OTP")
    }

    countdown(start: number = 30) {
        this.current = start;
        const interval = setInterval(() => {
            if (this.current === 0) {
                clearInterval(interval);
                this.isDisabled = false;
                console.log("Terminé !");
                return
            }
            this.current--;
        }, 1000);
    }
}
