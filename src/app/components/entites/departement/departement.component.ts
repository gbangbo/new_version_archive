import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {NzTableModule} from "ng-zorro-antd/table";
import {DepartementModalComponent} from "./departement-modal/departement-modal.component";
import {TableClickedAction, TableConfigs} from "../../../shared/interface/common";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import {SupportDB} from "../../../shared/interface/support-ticket";
import moment from "moment";


@Component({
    selector: 'app-departement',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule, DepartementModalComponent, TableComponent],
    providers: [],
    templateUrl: './departement.component.html',
    styleUrl: './departement.component.scss',
})
export class DepartementComponent implements OnInit {
    societeDepartement!: FormGroup;

    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;
    dataOneLigne: any = {};
    tableConfig: TableConfigs = {
        columns: [
            {title: 'Direction', field_value: 'libelle_direction', sort: true},
            {title: 'Cote departement', field_value: 'sigle_departement', sort: true},
            {title: 'Intitulé', field_value: 'libelle_departement', sort: true},
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
        this.showDepartement(this.users?.dataSociete?.uid, '', '');
    }

    showDepartement(idsociete: string = '', iddirection: string = '', iddepartement: string = '') {
        this.isloading = true;
        this.tableConfig.data = []
        this.httService.getData(`${environment.api_url}auth/:savedepartement?idsociete=${idsociete}&iddirection=${iddirection}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.tableConfig = {
                        ...this.tableConfig,
                        data: res.body.data.map((d: any) => {
                            return {
                                ...d,
                                libelle_direction: d?.datadirection?.libelle_direction,
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

    actionBtn(data: any) {
        this.errorTexte = ''
        let payload = {
            action: 2,
            iddepartement: data.uid,
            iddirection: data.datadirection.uid,
            idsociete: data.datadirection.datasociete.uid,
            sigle_departement: data.sigle_departement,
            libelle_departement: data.libelle_departement
        }
        console.log(data)


        this.societeDepartement.setValue(payload);
    }


    handleModal(value: boolean) {
        if (value) {
            this.showDepartement(this.users?.dataSociete?.uid, '', '');
        }
        this.modalOpen = false;
    }

    openModal() {
        this.modalOpen = true;
        this.dataOneLigne = {};
    }

    handleAction(value: TableClickedAction) {

        console.log('🎯 Action reçue:', value);
        console.log('Données:', value.action_to_perform);

        switch (value.action_to_perform) {
            case 'edit':
                this.modalOpen = true;
                this.dataOneLigne = value.data;
                break;
            default:
            //console.warn('⚠️ Action non gérée:', event.action);
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
