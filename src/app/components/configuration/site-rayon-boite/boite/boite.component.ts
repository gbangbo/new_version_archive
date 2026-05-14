import {Component, OnInit} from '@angular/core';
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
import {TableComponent} from "../../../../shared/components/ui/table/table.component";
import {FeatherIconComponent} from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import moment from "moment";
import {BoiteModalComponent} from "./boite-modal/boite-modal.component";

interface RowData {
    created_at: string;
    libelle_sites: string;
    libelle_rayon: string;
    code_boites: string;
    libelle_boites: string;
}

@Component({
    selector: 'app-boite',
    imports: [
        CommonModule,
        CardComponent,
        NzSwitchModule,
        NzTooltipDirective,
        NzSelectModule,
        Select2Module,
        NzTabsModule,
        NzIconModule,
        NzTableModule, TableComponent, FeatherIconComponent, BoiteModalComponent],
    providers: [],
    templateUrl: './boite.component.html',
    styleUrl: './boite.component.scss',
})
export class BoiteComponent implements OnInit {

    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;
    dataLigne: any = {};

    searchValue = '';

    // ── Données ──────────────────────────────────────────────

    filteredData: RowData[] = [];

    // ── Fonctions de tri ──────────────────────────────────────
    sortFns = {
        created_at: (a: RowData, b: RowData) =>
            (a.created_at ?? '').localeCompare(b.created_at ?? ''),
        libelle_sites: (a: RowData, b: RowData) =>
            (a.libelle_sites ?? '').localeCompare(b.libelle_sites ?? ''),
        libelle_rayon: (a: RowData, b: RowData) =>
            (a.libelle_rayon ?? '').localeCompare(b.libelle_rayon ?? ''),
        code_boites: (a: RowData, b: RowData) =>
            (a.code_boites ?? '').localeCompare(b.code_boites ?? ''),
        libelle_boites: (a: RowData, b: RowData) =>
            (a.libelle_boites ?? '').localeCompare(b.libelle_boites ?? '')
    };

    // ── Filtres ───────────────────────────────────────────────
    filters: {
        created_at: { text: string; value: string }[];
        libelle_sites: { text: string; value: string }[];
        libelle_rayon: { text: string; value: string }[];
        code_boites: { text: string; value: string }[];
        libelle_boites: { text: string; value: string }[];
    } = {
        created_at: [],
        libelle_sites: [],
        libelle_rayon: [],
        code_boites: [],
        libelle_boites: [],
    };

    filterFns = {
        // Filtre sur nom_beneficiaire
        created_at: (list: string[], item: RowData) =>
            list.some(val =>
                (item.created_at ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_sites: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_sites ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_rayon: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_rayon ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        code_boites: (list: string[], item: RowData) =>
            list.some(val =>
                (item.code_boites ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_boites: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_boites ?? '').toLowerCase().includes(val.toLowerCase())
            )
    };

    private dataBenef: any = [];

    constructor(private autor: Authorization,
                private httService: HttpService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showBoites(this.users?.dataSociete?.uid, '');
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

    showBoites(idsociete: string = '', idrayon: string = '', idsite: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}api/:saveboites?idsociete=${idsociete}&idrayon=${idrayon}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    console.log("res.body.data ===", res.body.data)
                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            libelle_sites: e.datasite.libelle_sites,
                            libelle_rayon: e.datarayon.libelle_rayon,
                            created_at: moment(e?.created_at).format('DD/MM/YYYY')
                        }
                    });
                    this.filters = {
                        ...this.filters,
                        libelle_sites: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.libelle_sites)
                                .map((e: any) => e.libelle_sites)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        libelle_rayon: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.libelle_rayon)
                                .map((e: any) => e.libelle_rayon)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        code_boites: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.code_boites)
                                .map((e: any) => e.code_boites)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        libelle_boites: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.libelle_boites)
                                .map((e: any) => e.libelle_boites)
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
            this.showBoites(this.users?.dataSociete?.uid, '');
        }
        this.modalOpen = false;
    }

    openModal(row?: any) {
        this.modalOpen = true;
        this.dataLigne = row || {};
    }

}
