import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {ToastrService} from 'ngx-toastr';
import moment from 'moment';

import {environment} from '../../../../../../environments/environment';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {Imputation, IMPUTATION_TRANSFERT_URL} from '../../imputation-api';
import {FeatherIconComponent} from '../../../../../shared/components/ui/feather-icon/feather-icon.component';

/**
 * Transfert d'une imputation vers un autre destinataire
 * (POST api/:imputations/transfert).
 *
 * Le contrat reprend celui de la création : `destinataires` porte la liste
 * ordonnée dont le premier élément est le destinataire principal et les
 * suivants sont en copie. L'écran sépare donc les deux rôles, comme le modal
 * « Imputer ».
 */
@Component({
    selector: 'app-transfert-modal',
    imports: [CommonModule, FormsModule, NzSelectModule, NzDatePickerModule, FeatherIconComponent],
    templateUrl: './transfert-modal.component.html',
    styleUrl: './transfert-modal.component.scss',
})
export class TransfertModalComponent implements OnInit {

    @Input() imputation: Imputation | null = null;

    @Output() modalOpen = new EventEmitter<boolean>();
    @Output() transfere = new EventEmitter<void>();

    private users: any = null;

    dataPersonnels: any[] = [];
    loadingPersonnels = false;

    selectedPrincipal = '';
    selectedCopies: string[] = [];
    instruction = '';
    commentaire = '';
    dateEnd: Date | null = null;
    notifier = true;

    isSaving = false;
    errorTexte = '';

    disabledPastDate = (current: Date): boolean => {
        if (!current) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return current < today;
    };

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        // L'instruction reste vide : transférer, c'est confier une nouvelle
        // consigne au destinataire suivant. Reprendre celle de l'expéditeur
        // d'origine risquerait d'être validée sans être relue.
        this.loadPersonnels();
    }

    @HostListener('document:keydown.escape')
    handleEscKey(): void {
        this.closeModal();
    }

    closeModal(): void {
        if (this.isSaving) return;
        this.modalOpen.emit(false);
    }

    /** Le destinataire principal ne doit pas être proposé aussi en copie. */
    get personnelsEnCopie(): any[] {
        return this.dataPersonnels.filter(p => p.value !== this.selectedPrincipal);
    }

    private loadPersonnels(): void {
        const id = this.users?.datasociete?.uid || '';
        this.loadingPersonnels = true;
        this.httService.getData(
            `${environment.api_url}auth/:liste-des-comptes?idsociete=${id}&idpersonnel=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingPersonnels = false;
                if (res?.body?.status || res?.body?.success) {
                    this.dataPersonnels = (res.body.data || [])
                        .map((e: any) => {
                            const p = e?.datapersonnel || e || {};
                            const nom = `${p?.nom || ''} ${p?.prenom || ''}`.trim();
                            const email = p?.emailAgent || p?.email || e?.email || e?.login || '';
                            return {label: nom || email || '—', value: e?.uid || e?.id};
                        })
                        // On ne se propose pas soi-même comme destinataire du transfert.
                        .filter((x: any) => x.value && x.value !== this.users?.uid);
                }
            })
            .catch(() => {
                this.loadingPersonnels = false;
            });
    }

    submit(): void {
        this.errorTexte = '';
        if (!this.imputation) return;

        if (!this.selectedPrincipal) {
            this.errorTexte = 'Veuillez sélectionner le nouveau destinataire.';
            return;
        }
        if (!this.instruction.trim()) {
            this.errorTexte = "Veuillez saisir l'instruction du transfert.";
            return;
        }

        const copies = this.selectedCopies.filter(uid => uid && uid !== this.selectedPrincipal);
        const destinataires = [this.selectedPrincipal, ...copies];

        const payload: any = {
            imputation: this.imputation.uid,
            destinataire: this.selectedPrincipal,
            instruction: this.instruction.trim(),
            notify: this.notifier,
        };
        if (destinataires.length > 1) {
            payload.destinataires = destinataires;
        }
        if (this.commentaire.trim()) {
            payload.commentaire = this.commentaire.trim();
        }
        if (this.dateEnd) {
            payload.date_limite = moment(this.dateEnd).format('YYYY-MM-DD HH:mm:ss');
        }

        this.isSaving = true;
        this.httService.postData(IMPUTATION_TRANSFERT_URL, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isSaving = false;
                if (res?.body?.status || res?.body?.success) {
                    this.toast.success(res?.body?.message || 'Imputation transférée.', 'Succès');
                    this.transfere.emit();
                    this.modalOpen.emit(false);
                } else {
                    this.errorTexte = res?.body?.message || 'Échec du transfert.';
                }
            })
            .catch((err: any) => {
                this.isSaving = false;
                this.errorTexte = err?.error?.err?.message || err?.error?.message
                    || 'Une erreur est survenue.';
            });
    }
}
