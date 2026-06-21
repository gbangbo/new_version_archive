import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import {environment} from "../../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
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
import {RoleModalComponent} from "./role-modal/role-modal.component";


interface RowData {
    code_role: string;
    libelle_role: string;
    created_at: string;
}


@Component({
    selector: 'app-role',
    imports: [
        CommonModule,
        CardComponent,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzTooltipDirective,
        NzSelectModule,
        Select2Module,
        NzTabsModule,
        NzIconModule,
        NzTableModule, TableComponent, FeatherIconComponent, RoleModalComponent],
    providers: [],
    templateUrl: './role.component.html',
    styleUrl: './role.component.scss',
})
export class RoleComponent implements OnInit {

    dataSociete: any = [];


    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;
    modalOpenCarriere: boolean = false;
    dataOneLigne: any = {};

    searchValue = '';

    // ── Données ──────────────────────────────────────────────

    filteredData: RowData[] = [];

    // ── Fonctions de tri ──────────────────────────────────────
    sortFns = {
        created_at: (a: RowData, b: RowData) =>
            (a.created_at ?? '').localeCompare(b.created_at ?? ''),
        code_role: (a: RowData, b: RowData) =>
            (a.code_role ?? '').localeCompare(b.code_role ?? ''),
        libelle_role: (a: RowData, b: RowData) =>
            (a.libelle_role ?? '').localeCompare(b.libelle_role ?? '')
    };

    // ── Filtres ───────────────────────────────────────────────
    filters: {
        created_at: { text: string; value: string }[];
        code_role: { text: string; value: string }[];
        libelle_role: { text: string; value: string }[];
    } = {
        created_at: [],
        code_role: [],
        libelle_role: [],
    };

    filterFns = {
        // Filtre sur nom_beneficiaire
        created_at: (list: string[], item: RowData) =>
            list.some(val =>
                (item.created_at ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        code_role: (list: string[], item: RowData) =>
            list.some(val =>
                (item.code_role ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_role: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_role ?? '').toLowerCase().includes(val.toLowerCase())
            ),
    };
    private dataBenef: any = [];

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.saveroles(this.users?.datasociete?.uid || this.users?.uidsociete, '');
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

    saveroles(idsociete: string = '', idrole: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}auth/:saveroles?idsociete=${idsociete}&idrole=${idrole}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            name: `${e.nom} ${e.prenom}`,
                            created_at: moment(e?.created_at).format('DD/MM/YYYY')
                        }
                    });
                    this.filters = {
                        ...this.filters,
                        libelle_role: [...new Set(this.dataBenef?.map((e: any) => e.libelle_role))]
                            .filter((v: any) => v)
                            .map((v: any) => ({
                                text: v,
                                value: v
                            })),
                        code_role: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.code_role)
                                .map((e: any) => e.code_role)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || []
                    }
                    this.filteredData = [...this.dataBenef];
                    console.log("this.filteredData ===", this.filteredData)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }


    handleModal(value: boolean) {
        if (value) {
            this.saveroles(this.users?.datasociete?.uid || this.users?.uidsociete, '');
        }
        this.modalOpen = false;
    }

    handleModalCarriere(value: boolean) {
        if (value) {
            this.saveroles(this.users?.datasociete?.uid || this.users?.uidsociete, '');
        }
        this.modalOpenCarriere = false;
    }

    openModal(row?: any) {
        this.modalOpen = true;
        this.dataOneLigne = row || {};
    }

    openModalCarriere(row?: any) {
        this.modalOpenCarriere = true;
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
}
