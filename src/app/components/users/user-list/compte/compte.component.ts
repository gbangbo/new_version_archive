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
import {CompteModalComponent} from "./compte-modal/compte-modal.component";
import {NzTagModule} from "ng-zorro-antd/tag";

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
    libelle_service: string;
    color: string;
    libcolor: string;
}


@Component({
    selector: 'app-compte',
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
        NzTableModule, TableComponent, FeatherIconComponent, NzTagModule, CompteModalComponent],
    providers: [],
    templateUrl: './compte.component.html',
    styleUrl: './compte.component.scss',
})
export class CompteComponent implements OnInit {

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
        emailAgent: (a: RowData, b: RowData) =>
            (a.emailAgent ?? '').localeCompare(b.emailAgent ?? ''),
        name: (a: RowData, b: RowData) =>
            (a.name ?? '').localeCompare(b.name ?? '')
    };

    // ── Filtres ───────────────────────────────────────────────
    filters: {
        created_at: { text: string; value: string }[];
        emailAgent: { text: string; value: string }[];
        name: { text: string; value: string }[];
    } = {
        created_at: [],
        emailAgent: [],
        name: [],
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
    };
    private dataBenef: any = [];

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.viewCompte(this.users?.datasociete?.uid, '');
    }

    viewCompte(idsociete: string = '', idpersonnel: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}auth/:liste-des-comptes?idsociete=${idsociete}&idpersonnel=${idpersonnel}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("Liste des comptes ===", res.body.data)
                if (res.body.status) {

                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            name: `${e.datapersonnel.nom} ${e.datapersonnel.prenom}`,
                            photo: `${e.datapersonnel.photo}`,
                            emailAgent: `${e.datapersonnel.emailAgent}`,
                            libelle_service: `${e.dataservice.libelle_service}`,
                            color: !e.is_active ? '#f50' : '#87d068',
                            libcolor: !e.is_active ? 'Inactif' : 'Actif',
                            created_at: moment(e?.created_at).format('DD/MM/YYYY')
                        }
                    });
                    // {
                    //     "id": 10005,
                    //     "uid": "187dfd95-5fad-4fd3-8add-8d0c47ea67d9",
                    //     "societe_id": 1,
                    //     "nom": "KOFFI",
                    //     "prenom": "JEAN MERMOZ",
                    //     "sexe": "M",
                    //     "dateNaissance": "1990-10-20",
                    //     "lieuNaissance": null,
                    //     "nationalite": "IVOIRIENNE",
                    //     "adressePostale": "",
                    //     "telMobile": "0709464120",
                    //     "telBureau": "",
                    //     "telDomicile": "",
                    //     "emailAgent": "koffikjm03@gmail.com",
                    //     "situationMatrimoniale": "MARIE(E)",
                    //     "lieuHabitation": "ABIDJAN",
                    //     "photo": "users/photos/CMU_JACOB.jpg",
                    //     "created_at": "2026-04-26T21:12:06.702271Z",
                    //     "updated_at": "2026-04-29T15:56:10.140060Z"
                    // }
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

    // ── Recherche globale ─────────────────────────────────────
    onSearch(value: string): void {
        const val = value.trim().toLowerCase();
        this.filteredData = val
            ? this.dataBenef.filter((row: any) =>
                Object.values(row).some(v => String(v).toLowerCase().includes(val))
            )
            : [...this.dataBenef];
    }

    handleModal(value: boolean) {
        if (value) {
            this.viewCompte(this.users?.datasociete?.uid, '');
        }
        this.modalOpen = false;
    }

    handleModalCarriere(value: boolean) {
        if (value) {
            this.viewCompte(this.users?.datasociete?.uid, '');
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

