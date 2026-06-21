import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import moment from "moment";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzMessageService} from 'ng-zorro-antd/message';
import Swal from 'sweetalert2';
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";


interface RowData {
    uid: string;
    type_absence: string;
    periode: string;
    motif_absence: string;
    color: string;
    nbreJourRestant: string;
    lib_agent_absence: string;
    lib_agent_remplacant: string;
    isEnable: boolean;
    // champs bruts pour le payload API
    _date_debut: string;
    _date_fin: string;
    _idagent: string;
    _idremplacant: string;
    _idtype: string;
    // état UI
    _processing?: boolean;
}


@Component({
    selector: 'app-valider-absence',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        FormsModule,
        FeatherIconComponent,
    ],
    templateUrl: './valider-absence.component.html',
    styleUrl: './valider-absence.component.scss',
    providers: [NzMessageService],
})
export class ValiderAbsenceComponent implements OnInit {

    private users: any = [];
    isloading = false;
    searchValue = '';

    filteredData: RowData[] = [];
    private dataBenef: RowData[] = [];

    // ── Tri ───────────────────────────────────────────────────
    sortFns = {
        lib_agent_absence: (a: RowData, b: RowData) =>
            (a.lib_agent_absence ?? '').localeCompare(b.lib_agent_absence ?? ''),
        lib_agent_remplacant: (a: RowData, b: RowData) =>
            (a.lib_agent_remplacant ?? '').localeCompare(b.lib_agent_remplacant ?? ''),
        type_absence: (a: RowData, b: RowData) =>
            (a.type_absence ?? '').localeCompare(b.type_absence ?? ''),
    };

    // ── Filtres ───────────────────────────────────────────────
    filters: {
        lib_agent_absence: { text: string; value: string }[];
        lib_agent_remplacant: { text: string; value: string }[];
        type_absence: { text: string; value: string }[];
    } = {
        lib_agent_absence: [],
        lib_agent_remplacant: [],
        type_absence: [],
    };

    filterFns = {
        lib_agent_absence: (list: string[], item: RowData) =>
            list.some(val => (item.lib_agent_absence ?? '').toLowerCase().includes(val.toLowerCase())),
        lib_agent_remplacant: (list: string[], item: RowData) =>
            list.some(val => (item.lib_agent_remplacant ?? '').toLowerCase().includes(val.toLowerCase())),
        type_absence: (list: string[], item: RowData) =>
            list.some(val => (item.type_absence ?? '').toLowerCase().includes(val.toLowerCase())),
    };


    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private msg: NzMessageService,
    ) {
    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.loadData(this.users?.datasociete?.uid, '', '', '', '0', '');
    }


    // ── Chargement ────────────────────────────────────────────
    private loadData(idsociete: string = '', idautorisation_absence: string = '', idtype_absence: string = '', idagent_en_absence: string = '', statut_absence: string = '', actifs_only: string = ''): void {

        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];

        this.httService.getData(
            `${environment.api_url}auth/:save-autorisation-absence?idsociete=${idsociete}&idautorisation_absence=${idautorisation_absence}&idtype_absence=${idtype_absence}&idagent_en_absence=${idagent_en_absence}&statut_absence=${statut_absence}&actifs_only=${actifs_only}`,
            false,
            this.users?.access_token || ''
        )
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    console.log("res.body.data ==", res.body.data)
                    this.dataBenef = res.body.data.map((e: any) => {
                        const debut = moment(e?.date_debut);
                        const fin = moment(e?.date_fin);
                        const nbJ = fin.diff(debut, 'days') + 1;
                        return {
                            ...e,
                            // champs d'affichage
                            type_absence: e?.datatype_absence?.type_absence ?? '',
                            lib_agent_absence: `${e?.data_agent_absence?.datapersonnel?.nom ?? ''} ${e?.data_agent_absence?.datapersonnel?.prenom ?? ''}`.trim(),
                            lib_agent_remplacant: `${e?.data_remplacant_absence?.datapersonnel?.nom ?? ''} ${e?.data_remplacant_absence?.datapersonnel?.prenom ?? ''}`.trim(),
                            date_debut: debut.format('DD-MM-YYYY'),
                            date_fin: fin.format('DD-MM-YYYY'),
                            periode: `${debut.format('DD-MM-YYYY')} au ${fin.format('DD-MM-YYYY')}`,
                            nbreJourRestant: `${nbJ < 0 ? 'Terminé' : nbJ} jour${nbJ > 1 ? 's' : ''}`,
                            color: nbJ <= 0 ? '#f50' : '#87d068',
                            isEnable: nbJ <= 0,
                            // champs bruts pour le payload (avant écrasement)
                            _date_debut: e?.date_debut,
                            _date_fin: e?.date_fin,
                            _idagent: e?.data_agent_absence?.uid ?? e?.idagent_en_absence ?? '',
                            _idremplacant: e?.data_remplacant_absence?.uid ?? e?.idremplacant_absence ?? '',
                            _idtype: e?.datatype_absence?.uid ?? e?.idtype_absence ?? '',
                            _processing: false,
                            uid: e?.uid || e?.id,
                        } as RowData;
                    });

                    this.filters = {
                        lib_agent_absence: this.toFilterList(this.dataBenef, 'lib_agent_absence'),
                        lib_agent_remplacant: this.toFilterList(this.dataBenef, 'lib_agent_remplacant'),
                        type_absence: this.toFilterList(this.dataBenef, 'type_absence'),
                    };

                    this.filteredData = [...this.dataBenef];
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private toFilterList(data: any[], key: string): { text: string; value: string }[] {
        return [...new Set(data.filter(e => e?.[key]).map(e => e[key]))]
            .map(v => ({text: v, value: v}));
    }

    onSearch(value: string): void {
        const val = value.trim().toLowerCase();
        this.filteredData = val
            ? this.dataBenef.filter(row =>
                Object.values(row).some(v => String(v).toLowerCase().includes(val))
            )
            : [...this.dataBenef];
    }

    getInitials(fullName: string): string {
        if (!fullName?.trim()) return '?';
        const parts = fullName.trim().split(/\s+/);
        return parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : parts[0][0].toUpperCase();
    }


    // ── Actions API ───────────────────────────────────────────

    valider(row: RowData): void {
        Swal.fire({
            title: 'Confirmer la validation',
            html: `Voulez-vous valider l'absence de <strong>${row.lib_agent_absence}</strong> ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui, valider',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#94a3b8',
            reverseButtons: true,
        }).then(result => {
            if (result.isConfirmed) this.doAction(row, 4);
        });
    }

    rejeter(row: RowData): void {
        Swal.fire({
            title: 'Motif du rejet',
            html: `Saisissez le motif de rejet de l'absence de <strong>${row.lib_agent_absence}</strong>`,
            icon: 'warning',
            input: 'textarea',
            inputPlaceholder: 'Motif du rejet...',
            inputAttributes: {rows: '4', style: 'resize:none; font-size:13px;'},
            showCancelButton: true,
            confirmButtonText: 'Rejeter',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#94a3b8',
            reverseButtons: true,
            inputValidator: (value) => {
                if (!value?.trim()) return 'Le motif est obligatoire.';
                return null;
            },
        }).then(result => {
            if (result.isConfirmed) this.doAction(row, 5, result.value.trim());
        });
    }

    private doAction(row: RowData, action: 4 | 5, motifRejet?: string): void {
        if (row._processing) return;

        row._processing = true;

        const payload = {
            action,
            idsociete: this.users?.datasociete?.uid ?? '',
            idautorisation_absence: row.uid,
            agent_en_absence: row._idagent,
            remplacant_absence: row._idremplacant,
            type_absence: row._idtype,
            motif_absence: row.motif_absence ?? motifRejet,
            date_debut: row._date_debut,
            date_fin: row._date_fin,
        };
        console.log("payload 1 =   ", payload)
        this.httService
            .postData(
                `${environment.api_url}auth/:save-autorisation-absence`,
                payload,
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                row._processing = false;
                if (res?.body?.status) {
                    const label = action === 4 ? 'validée' : 'rejetée';
                    this.msg.success(`Absence ${label} avec succès.`);
                    this.loadData();
                } else {
                    this.msg.error(res?.body?.message || 'Une erreur est survenue.');
                }
            })
            .catch(() => {
                row._processing = false;
                this.msg.error('Erreur de connexion au serveur.');
            });
    }
}
