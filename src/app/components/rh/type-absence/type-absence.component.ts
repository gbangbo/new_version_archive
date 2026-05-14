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
import {AddMaodalComponent} from "./add-maodal/add-maodal.component";


interface RowData {
    exo: string;
    source_fin: string;

    type_absence: string;
    lib_type_absence: string;
    dure_absence: string;
    created_at: string;
}


@Component({
    selector: 'app-type-absence',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        FormsModule, FeatherIconComponent, AddMaodalComponent],
    templateUrl: './type-absence.component.html',
    styleUrl: './type-absence.component.scss',
})
export class TypeAbsenceComponent implements OnInit {
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
            (a.created_at ?? '').localeCompare(b.created_at ?? ''),
        source_fin: (a: RowData, b: RowData) =>
            (a.source_fin ?? '').localeCompare(b.source_fin ?? '')
    };

    // ── Filtres ───────────────────────────────────────────────
    filters: {
        created_at: { text: string; value: string }[];
        exo: { text: string; value: string }[];
    } = {
        created_at: [],
        exo: [],
    };

    filterFns = {
        // Filtre sur nom_beneficiaire
        created_at: (list: string[], item: RowData) =>
            list.some(val =>
                (item.created_at ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        exo: (list: string[], item: RowData) =>
            list.some(val =>
                (item.exo ?? '').toLowerCase().includes(val.toLowerCase())
            ),
    };
    private dataBenef: any = [];


    private readonly OP_COLUMNS = [
        {header: 'Référence bancaire', field: 'reference_bancaire'},
        {header: 'Bénéficiaire', field: 'name_benef'},
        {header: 'Exercice', field: 'exo'},
        {header: 'Source financement', field: 'source_fin'},
        {header: 'Type OP', field: 'type_op'},
        {header: 'Mode règlement', field: 'mode_reg'},
        {header: 'Montant dépense', field: 'depense_op'},
        {header: 'Date opération', field: 'date_op'},
        {header: 'Libellé', field: 'libelle_op'},
    ];
    constructor(private autor: Authorization, private httService: HttpService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showTypeAbsence(this.users?.datasociete?.uid);
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

    showTypeAbsence(idsociete: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}auth/:save-type-absence?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("res.body directe ===", res.body);
                if (res.body.status) {

                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            reference: e?.operation?.reference,
                            created_at: moment(e?.created_at).format('DD/MM/YYYY')
                        }
                    });
                    this.filters = {
                        ...this.filters,
                        exo: [...new Set(this.dataBenef?.map((e: any) => e.exo))]
                            .filter((v: any) => v)
                            .map((v: any) => ({
                                text: v,
                                value: v
                            })),
                        // source_fin: [...new Set(
                        //     this.dataBenef
                        //         ?.filter((e: any) => e?.source_fin)
                        //         .map((e: any) => e.source_fin)
                        // )].map((v: any) => ({
                        //   text: v,
                        //   value: v
                        // })) || []
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
            this.showTypeAbsence(this.users?.datasociete?.uid);
        }
        this.modalOpen = false;
    }
}