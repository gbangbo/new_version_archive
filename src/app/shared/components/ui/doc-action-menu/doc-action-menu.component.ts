import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {cryptSession, decode64} from '../../../../config/config';
import {environment} from '../../../../../environments/environment';
import {SendMailModalComponent} from './send-mail-modal/send-mail-modal.component';
import {DetailModalComponent} from './detail-modal/detail-modal.component';
import {Authorization} from '../../../../protect/authorization.service';
import {HttpService} from '../../../../core/http.service';
import {HistoLogService} from '../../../services/histo-log.service';
import Swal from 'sweetalert2';

/* ── Identifiants des actions disponibles sur un document ── */
export type DocActionType =
    | 'consulter'
    | 'detail'
    | 'modifier'
    | 'mail'
    | 'workflow'
    | 'classer'
    | 'imprimer'
    | 'preter'
    | 'imputer'
    | 'situation'
    | 'demande-suppression'
    | 'supprimer';

/* ── Événement émis vers le composant hôte ── */
export interface DocActionEvent {
    type: DocActionType;
    doc: any;
}

interface DocActionItem {
    type: DocActionType;
    icon: string;
    label: string;
    danger?: boolean;
}

@Component({
    selector: 'app-doc-action-menu',
    imports: [CommonModule, NzDropDownModule, SendMailModalComponent, DetailModalComponent],
    templateUrl: './doc-action-menu.component.html',
    styleUrl: './doc-action-menu.component.scss',
})
export class DocActionMenuComponent {

    @ViewChild('mailModal') mailModal!: SendMailModalComponent;
    @ViewChild('detailModal') detailModal!: DetailModalComponent;

    /* Le document concerné, renvoyé tel quel dans l'événement */
    @Input() doc: any;

    /* Actions à masquer selon le contexte de la page hôte */
    @Input() exclude: DocActionType[] = [];

    /* Mettre à false si la page hôte veut gérer elle-même la
       navigation des actions par défaut (consulter, classer…) */
    @Input() autoNavigate: boolean = true;

    /* Émis pour toute action cliquée — utile pour les actions
       non gérées en interne ou un comportement personnalisé */
    @Output() action = new EventEmitter<DocActionEvent>();

    /* Émis après une suppression réussie — la page hôte rafraîchit sa liste */
    @Output() deleted = new EventEmitter<any>();

    private users: any;

    constructor(
        private router: Router,
        private autor: Authorization,
        private httService: HttpService,
        private histoLog: HistoLogService
    ) {
        this.users = this.autor.getInfosUsers();
    }

    readonly allActions: DocActionItem[] = [
        {type: 'consulter', icon: 'fa-regular fa-eye', label: 'Consulter'},
        {type: 'detail', icon: 'far fa-file-alt', label: 'Voir le détail'},
        {type: 'modifier', icon: 'fa-regular fa-pen-to-square', label: 'Modifier le document'},
        {type: 'mail', icon: 'far fa-paper-plane', label: 'Envoyer par mail'},
        // {type: 'workflow', icon: 'fa-solid fa-recycle', label: 'Ajouter dans un workflow'},
        {type: 'classer', icon: 'fa-regular fa-folder-open', label: 'Classer les fichiers'},
        {type: 'imprimer', icon: 'fa-solid fa-print', label: 'Imprimer le document'},
        // {type: 'preter', icon: 'fa-solid fa-exchange', label: 'Prêter le document'},
        {type: 'imputer', icon: 'fa-solid fa-tasks', label: 'Imputer'},
        // {type: 'situation', icon: 'fas fa-file-text', label: 'Voir la situation'},
        // {type: 'demande-suppression', icon: 'fas fa-trash-alt', label: 'Demande de suppression'},
        {type: 'supprimer', icon: 'fa-regular fa-trash-can', label: 'Supprimer', danger: true},
    ];

    get visibleActions(): DocActionItem[] {
        return this.allActions.filter(a => !a.danger && !this.exclude.includes(a.type));
    }

    get visibleDangerActions(): DocActionItem[] {
        return this.allActions.filter(a => a.danger && !this.exclude.includes(a.type));
    }

    onItemClick(type: DocActionType): void {
        this.action.emit({type, doc: this.doc});
        if (this.autoNavigate) this.handleDefaultAction(type);
    }

    /* ── Comportement par défaut, commun à toutes les pages ── */
    private handleDefaultAction(type: DocActionType): void {
        console.log("doc ===", this.doc)
        switch (type) {
            case 'consulter':
                this.persistDoc();
                this.router.navigate(['/recherche/previsualisation']);
                break;
            case 'classer':
                this.persistDoc();
                this.router.navigate(['/documents/classer-document']);
                break;
            case 'modifier':
                this.persistEditDoc();
                this.router.navigate(['/documents/creer-un-document']);
                break;
            case 'detail':
                this.detailModal.open(this.doc);
                break;
            case 'mail':
                this.mailModal.open(this.doc);
                break;
            case 'supprimer':
                this.confirmDelete();
                break;
            // Les autres actions seront branchées au fur et à mesure
        }
    }

    /* ── Suppression d'un document (avec confirmation personnalisée) ── */
    private confirmDelete(): void {
        const nom = this.doc?.lib_document || this.doc?.lib_docs || '';
        Swal.fire({
            width: 460,
            padding: 0,
            background: 'transparent',
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false,
            html: `
                <div style="position:relative;background:#fff;border-radius:14px;overflow:hidden;
                    box-shadow:0 24px 64px rgba(0,0,0,.22);text-align:center;">

                    <button id="dq-close" type="button" aria-label="Fermer"
                        style="position:absolute;top:14px;right:14px;width:34px;height:34px;padding:0;
                        box-sizing:border-box;border:none;background:#f1f3f5;color:#64748b;border-radius:50%;
                        cursor:pointer;font-size:15px;line-height:1;display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div style="padding:38px 40px 26px;">
                        <div style="width:92px;height:92px;margin:0 auto 22px;border-radius:50%;
                            background:#fde8e6;display:flex;align-items:center;justify-content:center;">
                            <i class="fa-regular fa-trash-can" style="font-size:34px;color:#d9432f;"></i>
                        </div>
                        <h3 style="margin:0 0 12px;font-size:21px;font-weight:700;color:#2f4858;">
                            Êtes-Vous Sûr ?
                        </h3>
                        <p style="margin:0;font-size:14px;line-height:1.7;color:#5b7a8c;">
                            Vous êtes sur le point de supprimer ce document.
                            La suppression est irréversible et il n'est pas possible de récupérer ce document.
                        </p>
                        ${nom ? `<p style="margin:12px 0 0;font-size:13px;font-weight:700;color:#2f4858;
                            display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                            ${nom}</p>` : ''}
                    </div>

                    <div style="display:flex;justify-content:center;gap:16px;padding:18px 24px;background:#eef1f4;">
                        <button id="dq-cancel" type="button"
                            style="min-width:150px;padding:13px 24px;border:none;border-radius:5px;cursor:pointer;
                            background:#8ba7b5;color:#fff;font-size:13.5px;font-weight:600;letter-spacing:.06em;">
                            ANNULER
                        </button>
                        <button id="dq-confirm" type="button"
                            style="min-width:150px;padding:13px 24px;border:none;border-radius:5px;cursor:pointer;
                            background:#c0392b;color:#fff;font-size:13.5px;font-weight:600;letter-spacing:.06em;">
                            SUPPRIMER
                        </button>
                    </div>
                </div>
            `,
            didOpen: () => {
                const popup = Swal.getPopup();
                if (!popup) return;
                popup.querySelector('#dq-cancel')?.addEventListener('click', () => Swal.close());
                popup.querySelector('#dq-close')?.addEventListener('click', () => Swal.close());
                popup.querySelector('#dq-confirm')?.addEventListener('click', () => {
                    Swal.close();
                    this.deleteDocument();
                });
            }
        });
    }

    private deleteDocument(): void {
        const payload = {
            idsociete: this.users?.datasociete?.uid || '',
            iddocuments: this.doc?.uid || ''
        };

        Swal.fire({title: 'Suppression en cours...', didOpen: () => Swal.showLoading(), allowOutsideClick: false});

        this.httService
            .deleteData(`${environment.api_url}api/:savedocuments`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    // Log : suppression du dossier
                    const nameCategories = this.doc?.datacategories?.name_categories || this.doc?.categorie || '';
                    const codeDocs = this.doc?.code_docs || this.doc?.numero || '';
                    this.histoLog.log(`A supprimé le dossier (${nameCategories}) numéro (${codeDocs})`);
                    Swal.fire({
                        title: res?.body?.message || 'Document supprimé avec succès.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    this.deleted.emit(this.doc);
                } else {
                    Swal.fire({
                        title: res?.body?.message || 'La suppression a échoué.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch((err: any) => {
                Swal.fire({
                    title: err?.error?.err?.message || err?.error?.message || 'La suppression a échoué.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    /* Dépose le document chiffré en session pour la page cible */
    private persistDoc(): void {
        const mapSessionTemp = cryptSession(JSON.stringify(this.doc), decode64(environment.CONFIG.APP_PASS));
        localStorage.setItem('_eye_', mapSessionTemp);
    }

    /* Dépose le document à modifier sous une clé dédiée (évite toute
       collision avec 'consulter'/'classer' qui utilisent _eye_) */
    private persistEditDoc(): void {
        const mapSessionTemp = cryptSession(JSON.stringify(this.doc), decode64(environment.CONFIG.APP_PASS));
        localStorage.setItem('_edit_doc_', mapSessionTemp);
    }
}
