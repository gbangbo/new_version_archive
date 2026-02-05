import {CommonModule} from '@angular/common';
import {AfterViewInit, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpService} from "../../core/http.service";
import {environment} from "../../../environments/environment";
import {cryptSession, decode64} from "../../config/config";

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

        this.isPasting = true; // Activer le flag

        // Récupérer le texte collé
        const pastedText = event.clipboardData?.getData('text') || '';

        // Extraire uniquement les chiffres
        const digits = pastedText.replace(/\D/g, '').slice(0, 6);

        console.log('Texte collé:', pastedText);
        console.log('Chiffres extraits:', digits);

        if (digits.length === 0) {
            this.isPasting = false;
            return;
        }

        const inputs = this.otpInputs.toArray();

        // Vider tous les champs d'abord
        inputs.forEach(input => {
            input.nativeElement.value = '';
        });

        // Remplir les champs avec les chiffres
        setTimeout(() => {
            for (let i = 0; i < Math.min(digits.length, 6); i++) {
                if (inputs[i]) {
                    console.log("digits[i] ===", digits[i])
                    inputs[i].nativeElement.value = digits[i];
                }
            }

            // Focus sur le dernier champ rempli
            const lastIndex = Math.min(digits.length, 6) - 1;
            if (inputs[lastIndex]) {
                inputs[lastIndex].nativeElement.focus();
            }

            this.updateOtpCode();

            // Désactiver le flag après un court délai
            setTimeout(() => {
                this.isPasting = false;
            }, 100);
        }, 10);
    }

    updateOtpCode(): void {
        const inputs = this.otpInputs.toArray();
        this.otpCode = inputs.map(input => input.nativeElement.value).join('');

        console.log('Code OTP actuel:', this.otpCode);

        // Si le code est complet (6 chiffres)
        if (this.otpCode.length === 6 && !this.isPasting) {
            console.log('✅ Code OTP complet:', this.otpCode);
            this.verifyOtp(this.otpCode);
        }
    }

    verifyOtp(code: string): void {
        console.log('Vérification du code:', code);
        // Votre logique de vérification ici
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

}
