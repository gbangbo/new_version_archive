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
import {DirectionModalComponent} from "./direction-modal/direction-modal.component";


interface RowData {
    raison_sociale: string;
    sigle_direction: string;
    libelle_direction: string;
    cree: string;
}
@Component({
    selector: 'app-direction',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        FormsModule, FeatherIconComponent, DirectionModalComponent],
    templateUrl: './direction.component.html',
    styleUrl: './direction.component.scss',
})
export class DirectionComponent implements OnInit {
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
        raison_sociale: (a: RowData, b: RowData) =>
            (a.raison_sociale ?? '').localeCompare(b.raison_sociale ?? ''),
        libelle_direction: (a: RowData, b: RowData) =>
            (a.libelle_direction ?? '').localeCompare(b.libelle_direction ?? ''),
        sigle_direction: (a: RowData, b: RowData) =>
            (a.sigle_direction ?? '').localeCompare(b.sigle_direction ?? ''),
        cree: (a: RowData, b: RowData) =>
            (a.cree ?? '').localeCompare(b.cree ?? '')
    };


    // ── Filtres ───────────────────────────────────────────────
    filters: {
        raison_sociale: { text: string; value: string }[];
        libelle_direction: { text: string; value: string }[];
        sigle_direction: { text: string; value: string }[];
        cree: { text: string; value: string }[];
    } = {
        raison_sociale: [],
        libelle_direction: [],
        sigle_direction: [],
        cree: []
    };

    filterFns = {
        // Filtre sur nom_beneficiaire
        raison_sociale: (list: string[], item: RowData) =>
            list.some(val =>
                (item.raison_sociale ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_direction: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_direction ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        sigle_direction: (list: string[], item: RowData) =>
            list.some(val =>
                (item.sigle_direction ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        email: (list: string[], item: RowData) =>
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
        this.showDirection(this.users?.datasociete?.uid, '');
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


    showDirection(idsociete: string = '', iddirection: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}auth/:savedirection?idsociete=${idsociete}&iddirection=${iddirection}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("res.body directe ===", res.body);
                if (res.body.status) {

                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            raison_sociale: e?.datasociete?.raison_sociale,
                            cree: moment(e?.created_at).format('DD-MM-YYYY'),
                            auth: `${e.double_auth == 1 ? 'Activée' : 'Non activée'}`,
                            color: e.double_auth == 1 ? '#87d068' : '#2db7f5',
                        }
                    });
                    this.filters = {
                        ...this.filters,
                        raison_sociale: [...new Set(this.dataBenef?.map((e: any) => e.raison_sociale))]
                            .filter((v: any) => v)
                            .map((v: any) => ({
                                text: v,
                                value: v
                            })),
                        libelle_direction: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.libelle_direction)
                                .map((e: any) => e.libelle_direction)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || [],
                        sigle_direction: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.sigle_direction)
                                .map((e: any) => e.sigle_direction)
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
            this.showDirection(this.users?.datasociete?.uid, '');
        }
        this.modalOpen = false;
    }
}