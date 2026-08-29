import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
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
    /** Confirmation d'envoi : un succès ne doit pas s'afficher en rouge. */
    succesTexte: string = "";

    constructor(public router: Router, private httService: HttpService) {

        const userDetails = localStorage.getItem('user');
        if (userDetails?.length != null) {
            // router.navigate(['/accueil'])
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
        this.succesTexte = "";
        if (this.loading || !this.loginForm.valid) return;

        this.loading = true;
        this.httService.postData(`${environment.api_url}auth/:sendmail-reset-password`, {
            "email": this.loginForm.value.email
        }, '')
            .toPromise()
            .then((res: any) => {
                this.loading = false;
                const corps = res?.body || {};

                // Le message utile est tantôt à la racine, tantôt dans `data` :
                // le lire aux deux endroits évite un écran muet.
                const message = corps?.message || corps?.data?.message || '';

                if (corps.status || corps.success) {
                    this.succesTexte = message
                        || 'Un lien de réinitialisation vient de vous être envoyé par mail.';
                    // L'adresse est partie : la ressaisir à l'identique n'a plus
                    // d'objet, et un second envoi créerait un lien concurrent.
                    this.loginForm.reset();
                    this.validate = false;
                } else {
                    this.errorTexte = message || "L'envoi du mail a échoué.";
                }
            })
            .catch((err) => {
                this.loading = false;
                // Affiché tout de suite : l'utilisateur ne doit pas rester trois
                // secondes devant un écran qui ne dit rien.
                this.errorTexte = this.messageErreur(err);
            });
    }

    /** Le motif réel est emboîté à des profondeurs variables selon l'erreur. */
    private messageErreur(err: any): string {
        const candidats = [
            err?.error?.err?.message,
            err?.error?.err?.error,
            err?.error?.message,
            typeof err?.error === 'string' ? err.error : null,
        ];
        for (const candidat of candidats) {
            if (typeof candidat === 'string' && candidat.trim()) return candidat.trim();
        }
        return 'Une erreur est survenue.';
    }

}
