import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {Select2Module} from "ng-select2-component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ServicesModalComponent} from "./services-modal/services-modal.component";
import {TableClickedAction, TableConfigs} from "../../../shared/interface/common";
import {SupportDB} from "../../../shared/interface/support-ticket";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import moment from "moment";


@Component({
    selector: 'app-services',
    imports: [
        CommonModule,
        CardComponent, ServicesModalComponent, TableComponent],
    providers: [],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
    dataSociete: any = [];
    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;
    dataOneLigne: any = {};
    tableConfig: TableConfigs = {
        columns: [
            {title: 'Direction', field_value: 'libelle_direction', sort: true},
            {title: 'Departement', field_value: 'libelle_departement', sort: true},
            {title: 'Cote services', field_value: 'sigle_service', sort: true},
            {title: 'Intitulé', field_value: 'libelle_service', sort: true},
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

    constructor(private autor: Authorization,
                private fb: FormBuilder,
                private httService: HttpService,
                private toast: ToastrService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showServices(this.users?.dataSociete?.uid, '', '');
    }

    showServices(idsociete: string = '', idservice: string = '', iddepartement: string = '') {
        this.isloading = true;
        this.tableConfig.data = [];
        this.httService.getData(`${environment.api_url}auth/:saveservice?idsociete=${idsociete}&idservice=${idservice}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.tableConfig = {
                        ...this.tableConfig,
                        data: res.body.data.map((d: any) => {
                            return {
                                ...d,
                                libelle_direction: d?.datadepartement?.datadirection?.libelle_direction,
                                libelle_departement: d?.datadepartement?.libelle_departement,
                                created_at: moment(d.created_at).format('DD/MM/YYYY')
                            }
                        })
                    }
                    console.log("services =======", res.body.data)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    handleModal(value: boolean) {
        if (value) {
            this.showServices(this.users?.dataSociete?.uid, '', '');
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

