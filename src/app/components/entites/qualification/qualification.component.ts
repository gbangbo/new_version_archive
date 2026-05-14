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
import {QualifModalComponent} from "./qualif-modal/qualif-modal.component";


interface RowData {
    sigle_poste: string;
    libelle_poste: string;
    cree: string;
}


@Component({
    selector: 'app-qualification',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        FormsModule, FeatherIconComponent, QualifModalComponent],
    templateUrl: './qualification.component.html',
    styleUrl: './qualification.component.scss',
})
export class QualificationComponent implements OnInit {
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
        sigle_poste: (a: RowData, b: RowData) =>
            (a.sigle_poste ?? '').localeCompare(b.sigle_poste ?? ''),
        libelle_poste: (a: RowData, b: RowData) =>
            (a.libelle_poste ?? '').localeCompare(b.libelle_poste ?? ''),
        cree: (a: RowData, b: RowData) =>
            (a.cree ?? '').localeCompare(b.cree ?? '')
    };


    // ── Filtres ───────────────────────────────────────────────
    filters: {
        sigle_poste: { text: string; value: string }[];
        libelle_poste: { text: string; value: string }[];
        cree: { text: string; value: string }[];
    } = {
        sigle_poste: [],
        libelle_poste: [],
        cree: [],
    };

    filterFns = {
        // Filtre sur nom_beneficiaire
        sigle_poste: (list: string[], item: RowData) =>
            list.some(val =>
                (item.sigle_poste ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_poste: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_poste ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        cree: (list: string[], item: RowData) =>
            list.some(val =>
                (item.cree ?? '').toLowerCase().includes(val.toLowerCase())
            )
    };

    private dataBenef: any = [];


    constructor(private autor: Authorization, private httService: HttpService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showPostes(this.users?.datasociete?.uid);
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


    showPostes(idsociete: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}auth/:savepostes?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("res.body directe ===", res.body);
                if (res.body.status) {

                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            cree: moment(e?.created_at).format('DD-MM-YYYY'),
                        }
                    });
                    this.filters = {
                        ...this.filters,
                        sigle_poste: [...new Set(this.dataBenef?.map((e: any) => e.sigle_poste))]
                            .filter((v: any) => v)
                            .map((v: any) => ({
                                text: v,
                                value: v
                            })),
                        libelle_poste: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.libelle_poste)
                                .map((e: any) => e.libelle_poste)
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
            this.showPostes(this.users?.datasociete?.uid);
        }
        this.modalOpen = false;
    }
}