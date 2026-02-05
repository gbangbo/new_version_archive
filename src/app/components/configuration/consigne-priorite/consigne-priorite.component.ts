import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import {TableClickedAction, TableConfigs} from "../../../shared/interface/common";
import {SupportDB} from "../../../shared/interface/support-ticket";
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../core/http.service";
import {Authorization} from "../../../protect/authorization.service";
import {ConsigneModalComponent} from "./consigne-modal/consigne-modal.component";
import {CommonModule} from "@angular/common";
import {PrioriteModalComponent} from "./priorite-modal/priorite-modal.component";
import moment from "moment";

@Component({
    selector: 'app-consigne-priorite',
    imports: [CardComponent, TableComponent, ConsigneModalComponent, PrioriteModalComponent, CommonModule],
    templateUrl: './consigne-priorite.component.html',
    styleUrl: './consigne-priorite.component.scss',
})
export class ConsignePrioriteComponent implements OnInit {
    activeTab = 'consigne';
    titleCarde = 'Les consignes';
    isloading: boolean = false;
    isloadingPriorite: boolean = false;
    modalOpenConsigne: boolean = false
    modalOpenPriorite: boolean = false
    tableConfig: TableConfigs = {
        columns: [
            {title: 'Libellé', field_value: 'libconsigne', sort: true},
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
    tableConfigPriorite: TableConfigs = {
        columns: [
            {title: 'Libellé', field_value: 'lib_priorite', sort: true},
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
    dataOneLigne: any = {};


    constructor(private autor: Authorization, private httService: HttpService) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.saveconsigne(this.users?.dataSociete?.uid)
        this.savepriorite(this.users?.dataSociete?.uid)
    }

    handleTab(value: string) {
        this.activeTab = value;
        this.titleCarde = value == 'consigne' ? 'Les consignes' : 'Les priorités';
    }

    saveconsigne(idsociete: string = '', idconsigne: string = '') {
        this.isloading = true;
        this.tableConfig.data = [];
        this.httService.getData(`${environment.api_url}api/:saveconsigne?idsociete=${idsociete}&idconsigne=${idconsigne}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log(res.body)
                if (res.body.status) {

                    this.tableConfig = {
                        ...this.tableConfig,
                        data: res.body.data.map((e: any) => {
                            return {
                                ...e,
                                created_at: moment(e.created_at).format('DD/MM/YYYY')
                            }
                        })
                    };
                    console.log(res.body.data)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    savepriorite(idsociete: string = '', idpriorites: string = '') {
        this.isloadingPriorite = true;
        this.tableConfigPriorite.data = [];
        this.httService.getData(`${environment.api_url}api/:savepriorite?idsociete=${idsociete}&idpriorites=${idpriorites}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloadingPriorite = false;
                console.log(res.body)
                if (res.body.status) {
                    this.tableConfigPriorite = {
                        ...this.tableConfigPriorite,
                        data: res.body.data.map((e: any) => {
                            return {
                                ...e,
                                created_at: moment(e.created_at).format('DD/MM/YYYY')
                            }
                        })
                    };
                    console.log(res.body.data)
                }
            })
            .catch((err) => {
                this.isloadingPriorite = false;
            });

    }

    openModalConsigne() {
        this.modalOpenConsigne = true;
        this.dataOneLigne = {}
    }

    openModalPriorite() {
        this.modalOpenPriorite = true;
        this.dataOneLigne = {}
    }

    handleOpenSimpleModalConsigne(value: boolean) {
        if (value) {
            this.saveconsigne(this.users?.dataSociete?.uid)
        }
        this.modalOpenConsigne = false;
    }

    handleOpenSimpleModalPriorite(value: boolean) {
        if (value) {
            this.savepriorite(this.users?.dataSociete?.uid)
        }
        this.modalOpenPriorite = false;
    }

    handleAction(value: TableClickedAction) {
        if (value.action_to_perform === 'edit') {
            this.modalOpenConsigne = true;
            this.dataOneLigne = value.data;
        }

        if (value.action_to_perform === 'delete') {
            // supprimer
        }
    }

    handleActionPriorite(value: TableClickedAction) {
        if (value.action_to_perform === 'edit') {
            this.modalOpenPriorite = true;
            this.dataOneLigne = value.data;
        }
        if (value.action_to_perform === 'delete') {
            // supprimer
        }
    }
}
