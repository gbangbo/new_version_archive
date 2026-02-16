import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {TableClickedAction, TableConfigs} from "../../../shared/interface/common";
import {SupportDB} from "../../../shared/interface/support-ticket";
import {DirectionModalComponent} from "./direction-modal/direction-modal.component";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import moment from "moment";


@Component({
    selector: 'app-direction',
    imports: [
        CommonModule,
        CardComponent,
        NzToolTipModule, DirectionModalComponent, TableComponent],
    providers: [],
    templateUrl: './direction.component.html',
    styleUrl: './direction.component.scss',
})
export class DirectionComponent implements OnInit {
    societeDirection!: FormGroup;
    dataDirection: any = [];


    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    isLoad: boolean = false;
    modalOpen: boolean = false;
    dataOneLigne: any = {};
    tableConfig: TableConfigs = {
        columns: [
            {title: 'Cote', field_value: 'sigle_direction', sort: true},
            {title: 'Intitulé', field_value: 'libelle_direction', sort: true},
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
                private httService: HttpService,
                private toast: ToastrService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showDirection(this.users?.dataSociete?.uid, '');
    }

    showDirection(idsociete: string = '', iddirection: string = '') {
        this.isloading = true;
        this.dataDirection = [];
        this.tableConfig.data = [];
        this.httService.getData(`${environment.api_url}auth/:savedirection?idsociete=${idsociete}&iddirection=${iddirection}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataDirection = res.body.data;
                    this.tableConfig = {
                        ...this.tableConfig,
                        data: res.body.data.map((d: any) => {
                            return {
                                ...d,
                                created_at: moment(d.created_at).format('DD/MM/YYYY')
                            }
                        })
                    }
                    console.log("==", res.body.data)
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
            iddirection: data.uid,
            idsociete: data.datasociete.uid,
            sigle_direction: data.sigle_direction,
            libelle_direction: data.libelle_direction
        }
        console.log(data)
        this.societeDirection.setValue(payload);
    }

    handleModal(value: boolean) {
        if (value) {
            this.showDirection(this.users?.dataSociete?.uid, '');
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
