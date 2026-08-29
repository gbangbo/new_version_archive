import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';

import {FeatherIconComponent} from "../../../ui/feather-icon/feather-icon.component";
import {profile} from '../../../../data/header';
import {Authorization} from "../../../../../protect/authorization.service";

@Component({
    selector: 'app-profile',
    imports: [RouterModule, FeatherIconComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})

export class ProfileComponent {

    /** Avatar générique servi quand l'utilisateur n'a pas de photo. */
    readonly avatarParDefaut = 'assets/images/avatar/avatar.jpg';

    profile = profile;
    users: any = [];
    nameUser: string;
    photo: string;

    constructor(private autor: Authorization, private router: Router) {
        this.users = this.autor.getInfosUsers();
        this.nameUser = `${this.users?.datapersonnel?.nom || 'Inconnu'} ${this.users?.datapersonnel?.prenom || ''}`
        this.photo = this.resoudrePhoto(this.users?.datapersonnel?.photo);
    }

    /**
     * L'API renvoie tantôt null, tantôt une chaîne vide, tantôt les chaînes
     * "null"/"undefined" (les autres écrans concatènent la valeur dans un
     * template literal). On ne garde donc que ce qui ressemble à un chemin.
     */
    private resoudrePhoto(photo: any): string {
        const valeur = typeof photo === 'string' ? photo.trim() : '';
        return (valeur && valeur !== 'null' && valeur !== 'undefined')
            ? valeur
            : this.avatarParDefaut;
    }

    /**
     * Le chemin stocké peut pointer vers un fichier supprimé côté serveur :
     * sans ce garde-fou, l'en-tête affiche l'icône « image cassée ».
     */
    surErreurPhoto(): void {
        if (this.photo !== this.avatarParDefaut) {
            this.photo = this.avatarParDefaut;
        }
    }

    logOut() {
        localStorage.clear();
        this.router.navigate(['/auth/connexion'])
    }

}
