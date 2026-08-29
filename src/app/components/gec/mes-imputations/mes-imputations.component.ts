import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import moment from 'moment';
import 'moment/locale/fr';

import {CardComponent} from '../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {environment} from '../../../../environments/environment';
import {
    Imputation,
    construireAnnuaire,
    listeImputationsUrl,
    mapImputation,
} from '../imputation/imputation-api';

interface ImputationRow {
    uid: string;
    document: string;
    code_docs: string;
    expediteur: string;
    destinataires: string[];
    priorite: string;
    consigne: string;
    description: string;
    statut: string;
    date: string;
    dateEcheance: string;
    ts: number;
    raw: any;
}

@Component({
    selector: 'app-mes-imputations',
    imports: [
        CommonModule, FormsModule, NzTableModule, NzTagModule, NzToolTipModule,
        NzDatePickerModule, CardComponent, FeatherIconComponent,
    ],
    templateUrl: './mes-imputations.component.html',
    styleUrl: './mes-imputations.component.scss',
})
export class MesImputationsComponent implements OnInit {

    private users: any = [];
    isloading: boolean = false;
    searchValue: string = '';

    private allRows: ImputationRow[] = [];
    rows: ImputationRow[] = [];

    // Détail
    showDetail: boolean = false;
    detailRow: ImputationRow | null = null;

    constructor(private autor: Authorization, private httService: HttpService) {
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.loadImputations();
    }

    // ── Chargement ────────────────────────────────────────────────────
    loadImputations(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];
        const iduser = this.users?.uid || '';
        const token = this.users?.access_token || '';

        // L'annuaire d'abord : l'API d'imputation ne renvoie que l'e-mail des
        // personnes, le nom vient de la liste des comptes.
        this.chargerAnnuaire(token)
            .then(annuaire => this.httService.getData(
                listeImputationsUrl({expediteur: iduser}),
                false,
                token
            ).toPromise().then((res: any) => ({res, annuaire})))
            .then(({res, annuaire}: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    this.allRows = (res.body.data || [])
                        .map((e: any) => this.mapRow(mapImputation(e, annuaire)));
                    this.applyFilter();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private chargerAnnuaire(token: string): Promise<Map<string, string>> {
        const idsociete = this.users?.datasociete?.uid || '';
        return this.httService.getData(
            `${environment.api_url}auth/:liste-des-comptes?idsociete=${idsociete}&idpersonnel=`,
            false, token
        ).toPromise()
            .then((res: any) => {
                if (!(res?.body?.status || res?.body?.success)) return new Map<string, string>();
                return construireAnnuaire(res.body.data || []);
            })
            .catch(() => new Map<string, string>());
    }

    private mapRow(i: Imputation): ImputationRow {
        return {
            uid: i.uid,
            // L'API renvoie une référence unique (« 00000020/…/gj INTITULÉ »),
            // il n'y a plus de code séparé du libellé.
            document: i.documentLabel,
            code_docs: '',
            expediteur: i.expediteur.nom,
            destinataires: i.destinataire.nom ? [i.destinataire.nom] : [],
            priorite: this.libelleLie(i.priorite),
            consigne: this.libelleLie(i.consigne),
            description: i.instruction,
            statut: i.statutLibelle,
            date: i.date,
            dateEcheance: i.dateLimite,
            ts: i.ts,
            raw: i.raw,
        };
    }

    /** Priorité et consigne arrivent en objet lié (ou null tant qu'absentes). */
    private libelleLie(o: any): string {
        if (!o) return '';
        if (typeof o === 'string') return o;
        return o.label || o.libelle || o.lib_priorite || o.libconsigne || '';
    }

    // ── Tri (nz-table) ────────────────────────────────────────────────
    sortFns = {
        document: (a: ImputationRow, b: ImputationRow) => (a.document || '').localeCompare(b.document || ''),
        priorite: (a: ImputationRow, b: ImputationRow) => (a.priorite || '').localeCompare(b.priorite || ''),
        date: (a: ImputationRow, b: ImputationRow) => a.ts - b.ts,
    };

    // ── Recherche ─────────────────────────────────────────────────────
    onSearch(value: string): void {
        this.searchValue = value;
        this.applyFilter();
    }

    private applyFilter(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.rows = q
            ? this.allRows.filter(r =>
                r.document.toLowerCase().includes(q) ||
                r.code_docs.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q) ||
                r.priorite.toLowerCase().includes(q) ||
                r.consigne.toLowerCase().includes(q) ||
                r.destinataires.join(' ').toLowerCase().includes(q))
            : [...this.allRows];
    }

    // ── Helpers d'affichage ───────────────────────────────────────────
    prioriteColor(p: string): string {
        const v = (p || '').toLowerCase();
        if (v.includes('urgent') || v.includes('haut')) return 'red';
        if (v.includes('moyen') || v.includes('normal')) return 'gold';
        if (v.includes('bas') || v.includes('faible')) return 'green';
        return 'blue';
    }

    statutColor(s: string): string {
        const v = (s || '').toLowerCase();
        if (v.includes('trait') || v.includes('termin')) return 'green';
        if (v.includes('attente') || v.includes('cours')) return 'gold';
        return 'default';
    }

    statutLabel(s: string): string {
        return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'En attente';
    }

    initials(name: string): string {
        const parts = (name || '').trim().split(/\s+/).filter(Boolean);
        if (!parts.length) return '?';
        return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
    }

    // ── Détail ────────────────────────────────────────────────────────
    openDetail(row: ImputationRow): void {
        this.detailRow = row;
        this.showDetail = true;
    }

    closeDetail(): void {
        this.showDetail = false;
        this.detailRow = null;
    }
}
