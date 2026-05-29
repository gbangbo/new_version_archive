import {Injectable} from '@angular/core';
import {Configapp, decode64} from '../config/config';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Authorization {
    constructor(private Conf: Configapp) {
    }

    public isLoggedIn() {
        return this.getInfosUsers();
    }

    getInfosUsers() {
        const userSession = sessionStorage.getItem(environment.CONFIG.APP_TOKEN_NAME)
        if (userSession) {
            return JSON.parse(this.Conf.getDecrypt(userSession, decode64(environment.CONFIG.APP_PASS)));
        }
        return undefined;
    }

    getInfosTemp() {
        const userSession = sessionStorage.getItem(`_temp_`);
        if (userSession) {
            return JSON.parse(this.Conf.getDecrypt(userSession, decode64(environment.CONFIG.APP_PASS)));
        }
        return undefined;
    }

    getInfosPreview() {
        const userSession = localStorage.getItem(`_eye_`);
        if (userSession) {
            return JSON.parse(this.Conf.getDecrypt(userSession, decode64(environment.CONFIG.APP_PASS)));
        }
        return undefined;
    }
}
