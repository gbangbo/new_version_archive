import {Component} from '@angular/core';

import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {InfoPersoComponent} from "./info-perso/info-perso.component";
import {MaFicheComponent} from "./ma-fiche/ma-fiche.component";
import {MesDocComponent} from "./mes-doc/mes-doc.component";
import {MotDePasseComponent} from "./mot-de-passe/mot-de-passe.component";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-user-profile',
    imports: [CommonModule, CardComponent,
        InfoPersoComponent, MaFicheComponent, MesDocComponent, MotDePasseComponent],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {

    userDetailsTab = [
        {
            id: 1,
            title: 'Mes Informations',
            value: 'info',
            icon: 'fa-solid fa-user'
        },
        {
            id: 3,
            title: 'Mot de passe',
            value: 'mdp',
            icon: 'fa-solid fa-lock'
        },
        {
            id: 4,
            title: 'Mes documents',
            value: 'doc',
            icon: 'fa-regular fa-folder-open'
        },
        {
            id: 5,
            title: 'Ma fiche',
            value: 'fiche',
            icon: 'fa-solid fa-tasks'
        }
    ];
    public activeTab: string = 'info';

    handleTab(value: string) {
        this.activeTab = value;
    }


}
