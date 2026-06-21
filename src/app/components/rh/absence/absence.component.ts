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
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {AddModalComponent} from "./add-modal/add-modal.component";


interface RowData {
    type_absence: string;
    periode: string;
    motif_absence: string;
    libcolor: string;
    color: string;
    nbreJourRestant: string;
    lib_agent_absence: string;
    lib_agent_remplacant: string;
    isEnable: boolean
}


@Component({
    selector: 'app-absence',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        FormsModule, FeatherIconComponent, AddModalComponent],
    templateUrl: './absence.component.html',
    styleUrl: './absence.component.scss',
})
export class AbsenceComponent implements OnInit {
    dataSociete: any = [];
    dataLigne: any = [];
    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;


    searchValue = '';

    // ── Données ──────────────────────────────────────────────

    filteredData: RowData[] = [];

    // ── Fonctions de tri ──────────────────────────────────────
    sortFns = {
        created_at: (a: RowData, b: RowData) =>
            (a.type_absence ?? '').localeCompare(b.type_absence ?? ''),
        source_fin: (a: RowData, b: RowData) =>
            (a.type_absence ?? '').localeCompare(b.type_absence ?? ''),
        periode: (a: RowData, b: RowData) =>
            (a.periode ?? '').localeCompare(b.periode ?? ''),
        motif_absence: (a: RowData, b: RowData) =>
            (a.motif_absence ?? '').localeCompare(b.motif_absence ?? ''),
        lib_agent_absence: (a: RowData, b: RowData) =>
            (a.lib_agent_absence ?? '').localeCompare(b.lib_agent_absence ?? ''),
        lib_agent_remplacant: (a: RowData, b: RowData) =>
            (a.lib_agent_remplacant ?? '').localeCompare(b.lib_agent_remplacant ?? ''),
        type_absence: (a: RowData, b: RowData) =>
            (a.type_absence ?? '').localeCompare(b.type_absence ?? '')
    };



    // ── Filtres ───────────────────────────────────────────────
    filters: {
        type_absence: { text: string; value: string }[];
        periode: { text: string; value: string }[];
        motif_absence: { text: string; value: string }[];
        lib_agent_absence: { text: string; value: string }[];
        lib_agent_remplacant: { text: string; value: string }[];
    } = {
        type_absence: [],
        periode: [],
        motif_absence: [],
        lib_agent_absence: [],
        lib_agent_remplacant: [],
    };

    filterFns = {
        // Filtre sur nom_beneficiaire
        type_absence: (list: string[], item: RowData) =>
            list.some(val =>
                (item.type_absence ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        periode: (list: string[], item: RowData) =>
            list.some(val =>
                (item.periode ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        motif_absence: (list: string[], item: RowData) =>
            list.some(val =>
                (item.motif_absence ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        lib_agent_absence: (list: string[], item: RowData) =>
            list.some(val =>
                (item.lib_agent_absence ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        lib_agent_remplacant: (list: string[], item: RowData) =>
            list.some(val =>
                (item.lib_agent_remplacant ?? '').toLowerCase().includes(val.toLowerCase())
            ),
    };
    private dataBenef: any = [];


    constructor(private autor: Authorization, private httService: HttpService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showAutoAbs(this.users?.datasociete?.uid, '', '', '', '', '');
    }


    // ── Recherche globale ─────────────────────────────────────
    onSearch(value: string): void {
        const val = value.trim().toLowerCase();
        this.filteredData = val
            ? this.dataBenef.filter((row: any) =>
                Object.values(row).some(v => String(v).toLowerCase().includes(val))
            )
            : [...this.dataBenef];
    }


    showAutoAbs(idsociete: string = '', idautorisation_absence: string = '', idtype_absence: string = '', idagent_en_absence: string = '', statut_absence: string = '', actifs_only: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}auth/:save-autorisation-absence?idsociete=${idsociete}&idautorisation_absence=${idautorisation_absence}&idtype_absence=${idtype_absence}&idagent_en_absence=${idagent_en_absence}&statut_absence=${statut_absence}&actifs_only=${actifs_only}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("save-autorisation-absence ===", res.body);
                if (res.body.status) {

                    this.dataBenef = res.body.data.map((e: any) => {
                        const debut = moment(e?.date_debut);
                        const fin = moment(e?.date_fin);

                        const nbreJourRestant = fin.diff(debut, 'days') + 1;
                        return {
                            ...e,
                            type_absence: e?.datatype_absence?.type_absence,
                            lib_agent_absence: `${e?.data_agent_absence?.datapersonnel?.nom} ${e?.data_agent_absence?.datapersonnel?.prenom || ''}`,
                            lib_agent_remplacant: `${e?.data_remplacant_absence?.datapersonnel?.nom} ${e?.data_remplacant_absence?.datapersonnel?.prenom || ''}`,
                            date_debut: moment(e?.date_debut).format('DD-MM-YYYY'),
                            date_fin: moment(e?.date_fin).format('DD-MM-YYYY'),
                            periode: `${moment(e?.date_debut).format('DD-MM-YYYY')} au ${moment(e?.date_fin).format('DD-MM-YYYY')}`,
                            nbreJourRestant: `${nbreJourRestant < 0 ? 'Terminé' : nbreJourRestant} jour${nbreJourRestant > 1 ? 's' : ''} restant`,
                            color: nbreJourRestant <= 0 ? '#f50' : '#87d068',
                            isEnable: nbreJourRestant <= 0
                        }
                    });
                    this.filters = {
                        ...this.filters,
                        type_absence: [...new Set(this.dataBenef?.map((e: any) => e.type_absence))]
                            .filter((v: any) => v)
                            .map((v: any) => ({
                                text: v,
                                value: v
                            })),
                        periode: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.periode)
                                .map((e: any) => e.periode)
                        )].map((v: any) => ({
                          text: v,
                          value: v
                        })) || [],
                        motif_absence: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.motif_absence)
                                .map((e: any) => e.motif_absence)
                        )].map((v: any) => ({
                          text: v,
                          value: v
                        })) || [],
                        lib_agent_absence: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.lib_agent_absence)
                                .map((e: any) => e.lib_agent_absence)
                        )].map((v: any) => ({
                          text: v,
                          value: v
                        })) || [],
                        lib_agent_remplacant: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.lib_agent_remplacant)
                                .map((e: any) => e.lib_agent_remplacant)
                        )].map((v: any) => ({
                          text: v,
                          value: v
                        })) || []
                    }


                    this.filteredData = [...this.dataBenef];

                    console.log("this.filteredData=======", this.filteredData)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    getInitials(fullName: string): string {
        if (!fullName?.trim()) return '?';
        const parts = fullName.trim().split(/\s+/);
        return parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : parts[0][0].toUpperCase();
    }

    handleAction(value: any) {
    }

    openModal(e?: any) {
        this.modalOpen = true;
        this.dataLigne = e || {};
    }

    handleModal(value: boolean) {
        if (value) {
            this.showAutoAbs(this.users?.datasociete?.uid, '', '', '', '', '');
        }
        this.modalOpen = false;
    }
}