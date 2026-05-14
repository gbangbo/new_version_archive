import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {LayoutService} from '../services/layout.service';
import {environment} from "../../../environments/environment";
import {Authorization} from "../../protect/authorization.service";

@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate {

    constructor(private router: Router, private layoutService: LayoutService, private autor: Authorization,) {
    }

    canActivate(): boolean {
        const user = this.autor.getInfosUsers();// JSON.parse(localStorage.getItem(environment.CONFIG.APP_TOKEN_NAME) || 'null');

        if (!user || !Object.keys(user).length) {
            this.router.navigate(['/auth/connexion']);
            return false;
        }

        return true;
    }

}
