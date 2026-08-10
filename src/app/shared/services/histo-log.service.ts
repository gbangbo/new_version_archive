import {Injectable} from '@angular/core';
import moment from 'moment';
import {HttpService} from '../../core/http.service';
import {Authorization} from '../../protect/authorization.service';
import {environment} from '../../../environments/environment';

/*
 * Historisation des actions sur les pièces/documents.
 * API : POST api/:save-historisation-pieces-docs
 * Appel « fire-and-forget » : ne bloque jamais le flux appelant, erreurs silencieuses.
 */
@Injectable({providedIn: 'root'})
export class HistoLogService {

    constructor(private httService: HttpService, private autor: Authorization) {
    }

    log(actionLogs: string, opts: { idpiece_docs?: string; idservice?: string; code_action?: string } = {}): void {
        const users: any = this.autor.getInfosUsers();
        const nom = `${users?.datapersonnel?.nom || ''} ${users?.datapersonnel?.prenom || ''}`.trim();

        const payload = {
            action: 1,
            idsociete: users?.datasociete?.uid || '',
            iduser_save: users?.uid || '',
            idservice: opts.idservice || users?.dataservice?.uid || '',
            idpiece_docs: opts.idpiece_docs || '',
            action_logs: actionLogs,
            code_action: opts.code_action || this.randomCode(),
            user_auth: users?.uid || '',
            date_en: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        console.log("payload ===Log ::", payload)
        this.httService
            .postData(`${environment.api_url}api/:save-historisation-pieces-docs`, payload, users?.access_token || '')
            .toPromise()
            .catch(() => { /* log silencieux */
            });
    }

    /* Code action : nombre aléatoire à 6 chiffres (100000–999999) */
    private randomCode(): string {
        return String(Math.floor(100000 + Math.random() * 900000));
    }
}
