import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {Select2Module} from "ng-select2-component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzIconModule} from "ng-zorro-antd/icon";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import moment from "moment";
import {NzTagModule} from "ng-zorro-antd/tag";
import {Router} from "@angular/router";
import {DocActionMenuComponent} from "../../../shared/components/ui/doc-action-menu/doc-action-menu.component";

interface RowData {
    libelle_type_docs: string;
    code_docs: string;
    lib_docs: string;
    date_docs: string;
    code_boites: string;
    color: string;
}

@Component({
    selector: 'app-mes-documents',
    imports: [
        CommonModule,
        CardComponent,
        NzTooltipDirective,
        NzSelectModule,
        Select2Module,
        NzTabsModule,
        NzIconModule,
        NzTagModule,
        NzTableModule, TableComponent, FeatherIconComponent, DocActionMenuComponent],
    providers: [],
    templateUrl: './mes-documents.component.html',
    styleUrl: './mes-documents.component.scss',
})
export class MesDocumentsComponent implements OnInit {
    dataSociete: any = [];

    private users: any = [];
    isloading: boolean = false;
    modalOpen: boolean = false;
    dataOneLigne: any = {};

    searchValue = '';

    // ── Données ──────────────────────────────────────────────

    filteredData: RowData[] = [];

    // ── Fonctions de tri ──────────────────────────────────────
    sortFns = {
        libelle_type_docs: (a: RowData, b: RowData) =>
            (a.libelle_type_docs ?? '').localeCompare(b.libelle_type_docs ?? ''),
        code_docs: (a: RowData, b: RowData) =>
            (a.code_docs ?? '').localeCompare(b.code_docs ?? ''),
        lib_docs: (a: RowData, b: RowData) =>
            (a.lib_docs ?? '').localeCompare(b.lib_docs ?? '')
    };

    // ── Filtres ───────────────────────────────────────────────
    filters: {
        lib_docs: { text: string; value: string }[];
        code_docs: { text: string; value: string }[];
        libelle_type_docs: { text: string; value: string }[];
    } = {
        lib_docs: [],
        code_docs: [],
        libelle_type_docs: [],
    };

    filterFns = {
        // Filtre sur nom_beneficiaire
        libelle_type_docs: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_type_docs ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        code_docs: (list: string[], item: RowData) =>
            list.some(val =>
                (item.code_docs ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        lib_docs: (list: string[], item: RowData) =>
            list.some(val =>
                (item.lib_docs ?? '').toLowerCase().includes(val.toLowerCase())
            )
    };
    private dataBenef: any = [];

    constructor(private autor: Authorization,
                private httService: HttpService, private router: Router) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showDocument(this.users?.datasociete?.uid, this.users.uid);
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

    // ── Rechargement après suppression d'un document ──────────
    onDocDeleted(): void {
        this.showDocument(this.users?.datasociete?.uid, this.users?.uid);
    }

    showDocument(idsociete: string = '', iduser_save: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}api/:savedocuments?idsociete=${idsociete}&iduser_save=${iduser_save}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    console.log("res.body.data ===", res.body.data)
                    this.dataBenef = res.body.data.map((e: any) => {

                        return {
                            ...e,
                            libelle_type_docs: `${e?.datatype_document ? e?.datatype_document[0]?.libelle_type_docs : ''}`,
                            code_boites: `${e?.databoites?.code_boites}`,
                            libelle_service: e?.dataservice?.libelle || '',
                            date_docs: moment(e?.date_docs).format('DD/MM/YYYY')
                        }
                    });
                    this.filters = {
                        ...this.filters,
                        libelle_type_docs: [...new Set(this.dataBenef?.map((e: any) => e.libelle_type_docs))]
                            .filter((v: any) => v)
                            .map((v: any) => ({
                                text: v,
                                value: v
                            })),
                        code_docs: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.code_docs)
                                .map((e: any) => e.code_docs)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        lib_docs: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.lib_docs)
                                .map((e: any) => e.lib_docs)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                    }
                    this.filteredData = [...this.dataBenef];
                }

            })
            .catch((err) => {
                this.isloading = false;
            });

    }


    openModal(row?: any) {
        this.router.navigate(['/documents/creer-un-document']);
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
