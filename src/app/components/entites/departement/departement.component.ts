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
import {DepartementModalComponent} from "./departement-modal/departement-modal.component";


interface RowData {
    libelle_departement: string;
    libelle_direction: string;
    sigle_departement: string;
    cree: string;
}


@Component({
    selector: 'app-departement',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        FormsModule, FeatherIconComponent, DepartementModalComponent],
    templateUrl: './departement.component.html',
    styleUrl: './departement.component.scss',
})
export class DepartementComponent implements OnInit {
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
        libelle_direction: (a: RowData, b: RowData) =>
            (a.libelle_direction ?? '').localeCompare(b.libelle_direction ?? ''),
        libelle_departement: (a: RowData, b: RowData) =>
            (a.libelle_departement ?? '').localeCompare(b.libelle_departement ?? ''),
        cree: (a: RowData, b: RowData) =>
            (a.cree ?? '').localeCompare(b.cree ?? ''),
        sigle_departement: (a: RowData, b: RowData) =>
            (a.sigle_departement ?? '').localeCompare(b.sigle_departement ?? '')
    };


    // ── Filtres ───────────────────────────────────────────────
    filters: {
        libelle_direction: { text: string; value: string }[];
        libelle_departement: { text: string; value: string }[];
        cree: { text: string; value: string }[];
        sigle_departement: { text: string; value: string }[];
    } = {
        libelle_direction: [],
        libelle_departement: [],
        cree: [],
        sigle_departement: []
    };

    filterFns = {
        // Filtre sur nom_beneficiaire
        libelle_direction: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_direction ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_departement: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_departement ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        sigle_departement: (list: string[], item: RowData) =>
            list.some(val =>
                (item.sigle_departement ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        cree: (list: string[], item: RowData) =>
            list.some(val =>
                (item.cree ?? '').toLowerCase().includes(val.toLowerCase())
            ),
    };

    private dataBenef: any = [];


    constructor(private autor: Authorization, private httService: HttpService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showDepartement(this.users?.datasociete?.uid, '', '');
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


    showDepartement(idsociete: string = '', iddirection: string = '', iddepartement: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}auth/:savedepartement?idsociete=${idsociete}&iddirection=${iddirection}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("res.body directe ===", res.body);
                if (res.body.status) {

                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            cree: moment(e?.created_at).format('DD-MM-YYYY'),
                            libelle_direction: e?.datadirection?.libelle_direction
                        }
                    });
                    this.filters = {
                        ...this.filters,
                        libelle_direction: [...new Set(this.dataBenef?.map((e: any) => e.libelle_direction))]
                            .filter((v: any) => v)
                            .map((v: any) => ({
                                text: v,
                                value: v
                            })),
                        libelle_departement: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.libelle_departement)
                                .map((e: any) => e.libelle_departement)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        sigle_departement: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.sigle_departement)
                                .map((e: any) => e.sigle_departement)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        cree: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.cree)
                                .map((e: any) => e.cree)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                    }

                    this.filteredData = [...this.dataBenef];

                    console.log("this.filteredData=======", this.filteredData)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    handleAction(value: any) {
    }

    openModal(e?: any) {
        this.modalOpen = true;
        this.dataLigne = e || {};
    }

    handleModal(value: boolean) {
        if (value) {
            this.showDepartement(this.users?.datasociete?.uid, '', '');
        }
        this.modalOpen = false;
    }
}