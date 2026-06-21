import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {CardComponent} from "../../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import {environment} from "../../../../../environments/environment";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {Select2Module} from "ng-select2-component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzIconModule} from "ng-zorro-antd/icon";
import {TableClickedAction} from "../../../../shared/interface/common";
import {TableComponent} from "../../../../shared/components/ui/table/table.component";
import {FeatherIconComponent} from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import moment from "moment";
import {AddModalComponent} from "./add-modal/add-modal.component";
import {NzTagModule} from "ng-zorro-antd/tag";
import {ViewDocCondComponent} from "./view-doc-cond/view-doc-cond.component";

interface RowData {
    name: string;
    emailAgent: string;
    sexe: string;
    telBureau: string;
    telDomicile: string;
    adressePostale: string;
    lieuHabitation: string;
    lieuNaissance: string;
    dateNaissance: string;

    photo: string;
    created_at: string;
    nbreJourRestant: string;
    date_debut_contrat: string;
    date_fin_contrat: string;
    numero_badge: string;
    libelle_site: string;
    libelle_fonction: string;
    libelle_service: string;
    color: string;
    periode: string;
}

@Component({
    selector: 'app-car-perso',
    imports: [
        CommonModule,
        CardComponent,
        NzSwitchModule,
        NzTooltipDirective,
        NzSelectModule,
        Select2Module,
        NzTabsModule,
        NzIconModule,
        NzTagModule,
        NzTableModule, TableComponent, FeatherIconComponent, AddModalComponent, ViewDocCondComponent],
    providers: [],
    templateUrl: './car-perso.component.html',
    styleUrl: './car-perso.component.scss',
})
export class CarPersoComponent implements OnInit {
    dataSociete: any = [];

    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;
    modalOpenDoc: boolean = false;
    dataOneLigne: any = {};

    searchValue = '';

    // ── Données ──────────────────────────────────────────────

    filteredData: RowData[] = [];

    // ── Fonctions de tri ──────────────────────────────────────
    sortFns = {
        created_at: (a: RowData, b: RowData) =>
            (a.created_at ?? '').localeCompare(b.created_at ?? ''),
        emailAgent: (a: RowData, b: RowData) =>
            (a.emailAgent ?? '').localeCompare(b.emailAgent ?? ''),
        name: (a: RowData, b: RowData) =>
            (a.name ?? '').localeCompare(b.name ?? ''),
        numero_badge: (a: RowData, b: RowData) =>
            (a.numero_badge ?? '').localeCompare(b.numero_badge ?? ''),
        libelle_service: (a: RowData, b: RowData) =>
            (a.libelle_service ?? '').localeCompare(b.libelle_service ?? ''),
        libelle_fonction: (a: RowData, b: RowData) =>
            (a.libelle_fonction ?? '').localeCompare(b.libelle_fonction ?? ''),
        libelle_site: (a: RowData, b: RowData) =>
            (a.libelle_site ?? '').localeCompare(b.libelle_site ?? '')
    };

    // ── Filtres ───────────────────────────────────────────────
    filters: {
        created_at: { text: string; value: string }[];
        emailAgent: { text: string; value: string }[];
        name: { text: string; value: string }[];
        numero_badge: { text: string; value: string }[];
        libelle_service: { text: string; value: string }[];
        libelle_fonction: { text: string; value: string }[];
        libelle_site: { text: string; value: string }[];
    } = {
        created_at: [],
        emailAgent: [],
        name: [],
        numero_badge: [],
        libelle_service: [],
        libelle_fonction: [],
        libelle_site: [],
    };

    filterFns = {
        // Filtre sur nom_beneficiaire
        created_at: (list: string[], item: RowData) =>
            list.some(val =>
                (item.created_at ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        emailAgent: (list: string[], item: RowData) =>
            list.some(val =>
                (item.emailAgent ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        name: (list: string[], item: RowData) =>
            list.some(val =>
                (item.name ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        numero_badge: (list: string[], item: RowData) =>
            list.some(val =>
                (item.numero_badge ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_service: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_service ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_fonction: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_fonction ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_site: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_site ?? '').toLowerCase().includes(val.toLowerCase())
            )
    };
    private dataBenef: any = [];


    activeTab = 'carriere_personnel';

    constructor(private autor: Authorization,
                private httService: HttpService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showStatutPersonnel(this.users?.datasociete?.uid || this.users?.uidsociete, '', '');
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

    showStatutPersonnel(idsociete: string = '', idservice: string = '', idstatutpersonnel: string = '', idpersonnel: string = '', idposte: string = '', idfonction: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}auth/:save-statut-personnel?idsociete=${idsociete}&idservice=${idservice}&idstatutpersonnel=${idstatutpersonnel}&idpersonnel=${idpersonnel}&idposte=${idposte}&idfonction=${idfonction}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    console.log("res.body.data ===", res.body.data)
                    this.dataBenef = res.body.data.map((e: any) => {
                        const debut = moment(e?.date_debut_contrat);
                        const fin = moment(e?.date_fin_contrat);
                        const diffJours = fin.diff(debut, 'days') + 1;
                        return {
                            ...e,
                            name: `${e?.datapersonnel?.nom} ${e.datapersonnel?.prenom}`,
                            libelle_site: `${e?.datasitespersonnel ? e?.datasitespersonnel[0]?.libelle_sites : ''}`,
                            libelle_fonction: `${e?.datafonction?.libelle_fonction}`,
                            libelle_service: e?.dataservice?.libelle || '',
                            created_at: moment(e?.created_at).format('DD/MM/YYYY'),
                            date_debut_contrat: moment(e?.date_debut_contrat).format('DD-MM-YYYY'),
                            date_fin_contrat: moment(e?.date_fin_contrat).format('DD-MM-YYYY'),
                            periode: `${moment(e?.date_debut_contrat).format('DD-MM-YYYY')} au ${moment(e?.date_fin_contrat).format('DD-MM-YYYY')}`,
                            nbreJourRestant: `${diffJours <= 0 ? 'Terminé' : `${diffJours.toLocaleString('fr-FR')} jour${diffJours > 1 ? 's' : ''} restant`}`,
                            color: diffJours <= 0 ? '#f50' : '#87d068',
                            isEnable: diffJours <= 0
                        }
                    });
                    this.filters = {
                        ...this.filters,
                        emailAgent: [...new Set(this.dataBenef?.map((e: any) => e.emailAgent))]
                            .filter((v: any) => v)
                            .map((v: any) => ({
                                text: v,
                                value: v
                            })),
                        name: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.name)
                                .map((e: any) => e.name)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        numero_badge: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.numero_badge)
                                .map((e: any) => e.numero_badge)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        libelle_service: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.libelle_service)
                                .map((e: any) => e.libelle_service)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        libelle_fonction: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.libelle_fonction)
                                .map((e: any) => e.libelle_fonction)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        libelle_site: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.libelle_site)
                                .map((e: any) => e.libelle_site)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || []
                    }
                    this.filteredData = [...this.dataBenef];
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    handleModal(value: boolean) {
        if (value) {
            this.showStatutPersonnel(this.users?.datasociete?.uid || this.users?.uidsociete, '', '');
        }
        this.modalOpen = false;
    }

    handleModalDoc(value: boolean) {
        this.modalOpenDoc = false;
    }

    openModal(row?: any, e?: string) {
        if (e) {
            this.modalOpenDoc = true;
        } else {
            this.modalOpen = true;
        }

        this.dataOneLigne = row || {};
    }


    handleAction(value: TableClickedAction) {
        switch (value.action_to_perform) {
            case 'edit':
                this.modalOpen = true;
                this.dataOneLigne = value.data;
                break;
            default:
        }
    }

    exportToExcel(filteredData: any) {
        const rows = filteredData.map((row: any) => ({
            'Nom & Prénoms': row.name || '',
            'Email': row?.datapersonnel?.emailAgent || '',
            'Sexe': row?.datapersonnel?.sexe || '',
            'Site': row.libelle_site || '',
            'Service': row.libelle_service || '',
            'Fonction': row.libelle_fonction || '',
            'Période': row.periode || '',
            'Jours restants': row.nbreJourRestant || '',
            'Contact': row.telDomicile || '',
            'Date création': row.created_at || '',
        }));

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Liste du personnel');

        const colWidths = Object.keys(rows[0] || {}).map(key => ({
            wch: Math.max(key.length, ...rows.map((r: any) => String(r[key] || '').length)) + 2
        }));
        ws['!cols'] = colWidths;

        const fileName = `personnel_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
        XLSX.writeFile(wb, fileName);
    }
}
