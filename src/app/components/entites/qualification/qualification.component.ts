import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {QualifModalComponent} from "./qualif-modal/qualif-modal.component";
import {TableClickedAction, TableConfigs} from "../../../shared/interface/common";
import {SupportDB} from "../../../shared/interface/support-ticket";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import moment from "moment";


@Component({
    selector: 'app-qualification',
    imports: [
        CommonModule,
        CardComponent,QualifModalComponent, TableComponent],
    providers: [],
    templateUrl: './qualification.component.html',
    styleUrl: './qualification.component.scss',
})
export class QualificationComponent implements OnInit {
    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;
    dataOneLigne: any = {};
    tableConfig: TableConfigs = {
        columns: [
            {title: 'Sigle', field_value: 'sigle_poste', sort: true},
            {title: 'Intitulé', field_value: 'libelle_poste', sort: true},
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

    constructor(private autor: Authorization, private httService: HttpService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showPostes(this.users?.dataSociete?.uid);
    }


    showPostes(idsociete: string = '') {
        this.isloading = true;
        this.tableConfig.data = [];
        this.httService.getData(`${environment.api_url}auth/:savepostes?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.tableConfig = {
                        ...this.tableConfig,
                        data: res.body.data.map((d: any) => {
                            return {
                                ...d,
                                created_at: moment(d.created_at).format('DD/MM/YYYY')
                            }
                        })
                    }
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    handleModal(value: boolean) {
        if (value) {
            this.showPostes(this.users?.dataSociete?.uid);
        }
        this.modalOpen = false;
    }

    openModal() {
        this.modalOpen = true;
        this.dataOneLigne = {};
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

    handleExport(event: { type: string, data: any[] }) {
        // Logique personnalisée selon le type
        if (event.type === 'csv') {
            // Traitement personnalisé pour CSV
        }

        if (event.type === 'pdf') {
            // Traitement personnalisé pour PDF
        }
    }
}
