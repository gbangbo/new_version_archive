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
        const idsociete = this.users?.datasociete?.uid || '';
        const iduser = this.users?.uid || '';

        this.httService.getData(
            `${environment.api_url}api/:saveimputation?idimputation=&idsociete=${idsociete}&idsender=${iduser}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log('saveimputation ===', res.body);
                if (res.body.status || res.body.success) {
                    this.allRows = (res.body.data || []).map((e: any) => this.mapRow(e));
                    this.applyFilter();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private mapRow(e: any): ImputationRow {
        const doc = e?.datadocuments || e?.datadocument || {};
        const dateVal = e?.created_at || e?.date_imputation || '';

        return {
            uid: e?.uid || e?.idimputation || '',
            document: doc?.lib_docs || doc?.lib_document || '',
            code_docs: doc?.code_docs || '',
            expediteur: this.personName(e?.datasender || e?.datauser_save),
            destinataires: (e?.datapersonnels || e?.personnels || [])
                .map((p: any) => this.personName(p?.datauser || p))
                .filter((n: string) => n),
            priorite: e?.datapriorite?.lib_priorites || e?.datapriorite?.libelle || '',
            consigne: e?.dataconsigne?.lib_consigne || e?.dataconsigne?.libelle || '',
            description: e?.desc_impute || '',
            statut: e?.statut_imputation || e?.statut || '',
            date: dateVal ? moment(dateVal).format('DD/MM/YYYY HH:mm') : '',
            dateEcheance: e?.date_end_traitement
                ? moment(e.date_end_traitement).format('DD/MM/YYYY')
                : '',
            ts: dateVal ? moment(dateVal).valueOf() : 0,
            raw: e,
        };
    }

    private personName(u: any): string {
        if (!u) return '';
        const p = u?.datapersonnel || u;
        const nom = `${p?.nom || ''} ${p?.prenom || ''}`.trim();
        return nom || u?.email || u?.login || '';
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
