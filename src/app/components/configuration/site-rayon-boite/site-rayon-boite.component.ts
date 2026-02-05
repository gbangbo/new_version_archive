import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import {TableClickedAction, TableConfigs} from "../../../shared/interface/common";
import {SupportDB} from "../../../shared/interface/support-ticket";
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../core/http.service";
import {Authorization} from "../../../protect/authorization.service";
import {CommonModule} from "@angular/common";
import {API} from "../../../shared/interface/api";
import {SiteModalComponent} from "./site-modal/site-modal.component";
import moment from "moment";
import {RayonModalComponent} from "./rayon-modal/rayon-modal.component";
import {BoiteModalComponent} from "./boite-modal/boite-modal.component";

@Component({
    selector: 'app-site-rayon-boite',
    imports: [CardComponent, TableComponent, CommonModule, SiteModalComponent, RayonModalComponent, BoiteModalComponent],
    templateUrl: './site-rayon-boite.component.html',
    styleUrl: './site-rayon-boite.component.scss',
})
export class SiteRayonBoiteComponent implements OnInit {
    activeTab = 'site';
    titleCarde = 'Les sites';
    isloading: boolean = false;
    isloadingRayon: boolean = false;
    isloadingBoite: boolean = false;
    modalOpenConsigne: boolean = false
    modalOpenPriorite: boolean = false
    tableConfigSite: TableConfigs = {
        columns: [
            {title: 'Libellé', field_value: 'libelle_sites', sort: true},
            {title: 'Créé le', field_value: 'created_at', sort: true},
        ],
        data: [] as SupportDB[],
        row_action: [
            {
                label: "Edit",
                action_to_perform: "edit",
                icon: "edit-content",
                class: "btn-sm"
            },
            // {
            //     label: "Delete",
            //     action_to_perform: "delete",
            //     icon: "trash1", modal: true,
            //     model_text: 'Do you really want to delete the API Key?'
            // }
        ],

    };
    tableConfigRayon: TableConfigs = {
        columns: [
            {title: 'Site', field_value: 'libelle_sites', sort: true},
            {title: 'Libellé rayon', field_value: 'libelle_rayon', sort: true},
            {title: 'Créé le', field_value: 'created_at', sort: true},
        ],
        data: [] as SupportDB[],
        row_action: [
            {
                label: "Edit",
                action_to_perform: "edit",
                icon: "edit-content",
                class: "btn-sm"
            }
        ],

    };
    tableConfigBoite: TableConfigs = {
        columns: [
            {title: 'Site', field_value: 'libelle_sites', sort: true},
            {title: 'Libellé rayon', field_value: 'libelle_rayon', sort: true},
            {title: 'Cote boite', field_value: 'code_boites', sort: true},
            {title: 'Libellé boite', field_value: 'libelle_boites', sort: true},
            {title: 'Créé le', field_value: 'created_at', sort: true},
        ],
        data: [] as SupportDB[],
        row_action: [
            {
                label: "Edit",
                action_to_perform: "edit",
                icon: "edit-content",
                class: "btn-sm"
            }
        ],

    };

    users: any = [];
    modalOpenSite: boolean = false;
    modalOpenRayon: boolean = false;
    modalOpenBoite: boolean = false;
    dataOneLigne: any = {};


    constructor(private autor: Authorization, private httService: HttpService) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.savesites(this.users?.dataSociete?.uid)
        this.saverayons(this.users?.dataSociete?.uid)
        this.saveboites(this.users?.dataSociete?.uid)
    }

    handleTab(value: string) {
        this.activeTab = value;
        switch (value) {
            case 'site':
                this.titleCarde = 'Les sites';
                break;
            case 'rayon':
                this.titleCarde = 'Les rayons';
                break;
            case 'boite':
                this.titleCarde = 'Les boîtes';
                break;
        }

    }

    savesites(idsociete: string = '', idsite: string = '') {
        this.isloading = true;
        this.tableConfigSite.data = [];
        this.httService.getData(`${environment.api_url}api/:savesites?idsociete=${idsociete}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.tableConfigSite = {
                        ...this.tableConfigSite,
                        data: res.body.data.map((e: any) => {
                            return {...e, created_at: moment(e.created_at).format('DD/MM/YYYY')}
                        })
                    };
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    saverayons(idsociete: string = '', idrayon: string = '', idsite: string = '') {
        this.isloadingRayon = true;
        this.tableConfigRayon.data = [];
        this.httService.getData(`${environment.api_url}api/:saverayons?idsociete=${idsociete}&idrayon=${idrayon}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloadingRayon = false;
                if (res.body.status) {
                    this.tableConfigRayon = {
                        ...this.tableConfigRayon,
                        data: res.body.data.map((e: any) => {

                            return {
                                ...e,
                                libelle_sites: e?.datasite?.libelle_sites ?? '',
                                created_at: moment(e.created_at).format('DD/MM/YYYY')
                            }
                        })
                    };
                }
            })
            .catch((err) => {
                this.isloadingRayon = false;
            });

    }

    saveboites(idsociete: string = '', idrayon: string = '', idsite: string = '') {
        this.isloadingBoite = true;
        this.tableConfigBoite.data = [];
        this.httService.getData(`${environment.api_url}api/:saveboites?idsociete=${idsociete}&idrayon=${idrayon}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloadingBoite = false;
                if (res.body.status) {
                    this.tableConfigBoite = {
                        ...this.tableConfigBoite,
                        data: res.body.data.map((e: any) => {
                            return {
                                ...e,
                                libelle_sites: e?.datasite?.libelle_sites ?? '',
                                libelle_rayon: e?.datarayon?.libelle_rayon ?? '',
                                created_at: moment(e.created_at).format('DD/MM/YYYY')
                            }
                        })
                    };

                    console.log("Boite ===", res.body.data)
                }
            })
            .catch((err) => {
                this.isloadingBoite = false;
            });

    }

    openModalSite() {
        this.modalOpenSite = true;
        this.dataOneLigne = {};
    }

    openModalRayon() {
        this.modalOpenRayon = true;
        this.dataOneLigne = {};
    }

    openModalBoite() {
        this.modalOpenBoite = true;
        this.dataOneLigne = {};
    }

    handleModalSite(value: boolean) {
        if (value) {
            this.savesites(this.users?.dataSociete?.uid)
        }
        this.modalOpenSite = false;
    }

    handleModalRayon(value: boolean) {
        if (value) {
            this.saverayons(this.users?.dataSociete?.uid)
        }
        this.modalOpenRayon = false;
    }

    handleModalBoite(value: boolean) {
        if (value) {
            this.saveboites(this.users?.dataSociete?.uid)
        }
        this.modalOpenBoite = false;
    }

    openModalPriorite() {
        this.modalOpenPriorite = true;
    }


    // Gérer les actions du tableau
    handleTableAction(event: any) {
        switch (event.action_to_perform) {
            case 'edit':
                this.editConsigne(event.data);
                break;
            case 'delete':
                this.deleteConsigne(event.data);
                break;
        }
    }

    editConsigne(data: any) {
        // Logique d'édition
        console.log('Edit', data);
    }

    deleteConsigne(data: any) {
        // Logique de suppression
        console.log('Delete', data);
    }

    handleAction(value: TableClickedAction) {
        if (value.action_to_perform === 'edit') {
            this.modalOpenSite = true;
            // ouvrir modal edit / naviguer / etc.
            this.dataOneLigne = value.data;
            console.log('EDIT', value.data);
        }

        if (value.action_to_perform === 'delete') {
            // supprimer
        }
    }

    handleActionRayon(value: TableClickedAction) {
        if (value.action_to_perform === 'edit') {
            this.modalOpenRayon = true;
            this.dataOneLigne = value.data;
        }

        if (value.action_to_perform === 'delete') {
            // supprimer
        }
    }

    handleActionBoite(value: TableClickedAction) {
        if (value.action_to_perform === 'edit') {
            this.modalOpenBoite = true;
            this.dataOneLigne = value.data;
        }

        if (value.action_to_perform === 'delete') {
            // supprimer
        }
    }
    handleExport(event: { type: string, data: any[] }) {
        console.log('Type d\'export:', event.type);
        console.log('Données:', event.data);

        // Logique personnalisée selon le type
        if (event.type === 'csv') {
            // Traitement personnalisé pour CSV
            console.log('Export CSV personnalisé');
        }

        if (event.type === 'pdf') {
            // Traitement personnalisé pour PDF
            console.log('Export PDF personnalisé');
        }
    }
}
