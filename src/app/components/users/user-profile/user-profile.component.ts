import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {UserActivityComponent} from "../widgets/user-activity/user-activity.component";
import {UserPersonalDetailsComponent} from "../widgets/user-personal-details/user-personal-details.component";
import {UserTaskComponent} from "../widgets/user-task/user-task.component";
import {UserNotificationComponent} from "../widgets/user-notification/user-notification.component";
import {UserSettingComponent} from "../widgets/user-setting/user-setting.component";
import {userDetailsTab, users} from '../../../shared/data/user';
import {Users} from '../../../shared/interface/user';
import {InfoPersoComponent} from "./info-perso/info-perso.component";
import {MaFicheComponent} from "./ma-fiche/ma-fiche.component";
import {MesDocComponent} from "./mes-doc/mes-doc.component";
import {MotDePasseComponent} from "./mot-de-passe/mot-de-passe.component";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-user-profile',
    imports: [CommonModule,
        UserPersonalDetailsComponent, CardComponent,
        UserActivityComponent, UserTaskComponent,
        UserNotificationComponent, UserSettingComponent,
        InfoPersoComponent, MaFicheComponent, MesDocComponent, MotDePasseComponent],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {

    public currentUserId: number;
    public currentUser: Users;
    public users = users;
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

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (!isNaN(id)) {
                this.currentUserId = id;
                const user = this.users.find(user => user.id === this.currentUserId);
                if (user) {
                    this.currentUser = user;
                }
            }
        });
    }

    handleTab(value: string) {
        this.activeTab = value;
    }


}
