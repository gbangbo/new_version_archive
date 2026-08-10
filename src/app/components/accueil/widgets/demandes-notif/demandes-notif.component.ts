import {Component, OnInit, HostBinding} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {Authorization} from '../../../../protect/authorization.service';
import {HttpService} from '../../../../core/http.service';

@Component({
    selector: 'app-demandes-notif',
    imports: [CommonModule],
    templateUrl: './demandes-notif.component.html',
    styleUrl: './demandes-notif.component.scss',
})
export class DemandesNotifComponent implements OnInit {

    isloading = true;
    pendingCount = 0;

    // La bande est retirée du flux tant qu'il n'y a aucune demande en attente
    @HostBinding('class.dn-hidden')
    get hidden(): boolean {
        return this.isloading || this.pendingCount === 0;
    }

    private users: any = [];

    constructor(
        private router: Router,
        private autor: Authorization,
        private httService: HttpService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadPending();
    }

    // ── Chargement du nombre de demandes en attente ──────────────────
    loadPending(): void {
        const id = this.users?.datasociete?.uid || '';
        const idservice = this.users?.dataservice?.uid || '';
        this.isloading = true;
        this.httService.getData(
            `${environment.api_url}api/:save-demande-authorisation?idsociete=${id}&idservice=${idservice}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    const rows = res.body.data || [];
                    this.pendingCount = rows.filter((e: any) =>
                        this.isPending(e?.statut_demande)).length;
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private isPending(s: string): boolean {
        const v = (s || '').toLowerCase();
        return v.includes('attente') || v.includes('cours') || v.includes('pending');
    }

    get hasPending(): boolean {
        return this.pendingCount > 0;
    }

    get badgeLabel(): string {
        return this.pendingCount > 99 ? '99+' : String(this.pendingCount);
    }

    get ariaLabel(): string {
        const s = this.pendingCount > 1 ? 's' : '';
        return `${this.pendingCount} demande${s} d'autorisation en attente — cliquez pour les traiter`;
    }

    voirDemandes(): void {
        this.router.navigate(['/documents/demandes-autorisation']);
    }
}
