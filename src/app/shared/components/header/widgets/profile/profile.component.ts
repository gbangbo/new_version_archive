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

    public profile = profile;
    public users: any = [];

    constructor(private autor: Authorization, private router: Router) {
        this.users = this.autor.getInfosUsers();
    }

    logOut() {
        localStorage.clear();
        this.router.navigate(['/auth/login'])
    }

}
