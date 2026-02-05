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
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzIconModule} from "ng-zorro-antd/icon";
import {TableClickedAction, TableConfigs} from "../../../shared/interface/common";
import {AddUserModalComponent} from "./add-user-modal/add-user-modal.component";
import {SupportDB} from "../../../shared/interface/support-ticket";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";


@Component({
    selector: 'app-add-user',
    imports: [
        CommonModule,
        CardComponent,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzToolTipModule,
        NzSelectModule,
        Select2Module,
        NzTabsModule,
        NzIconModule,
        NzTableModule, AddUserModalComponent, TableComponent, FeatherIconComponent],
    providers: [],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
    societeDepartement!: FormGroup;
    dataSociete: any = [];
    dataDirection: any = [];
    dataDepartement: any = [];


    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    isLoad: boolean = false;
    dataPersonnel: any = [];
    modalOpen: boolean = false;
    dataOneLigne: any = {};

    tableConfig: TableConfigs = {
        columns: [
            {title: 'Nom & prénoms', field_value: 'name', sort: true},
            {title: 'Telephone', field_value: 'telMobile', sort: true},
            {title: 'Email', field_value: 'emailAgent', sort: true},
            {title: 'Service', field_value: 'libelle_service', sort: true},
            {title: 'Poste', field_value: 'libelle_poste', sort: true},
            {title: 'Genre', field_value: 'sexe', sort: true},
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
        this.societeDepartement = this.fb.group({
            action: [''],
            iddirection: [''],
            idsociete: [''],
            iddepartement: [''],
            sigle_departement: ['', Validators.required],
            libelle_departement: ['', Validators.required]
        });

        this.direction(this.users?.dataSociete?.uid, '');
        this.departement(this.users?.dataSociete?.uid, '', '');
        this.personnel(this.users?.dataSociete?.uid, '', '');
        console.log(this.users)
    }

    direction(idsociete: string = '', iddirection: string = '') {
        this.dataDirection = [];
        this.httService.getData(`${environment.api_url}auth/:savedirection?idsociete=${idsociete}&iddirection=${iddirection}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status) {
                    this.dataDirection = res.body.data;
                }
            })
            .catch((err) => {
            });

    }

    departement(idsociete: string = '', iddirection: string = '', iddepartement: string = '') {
        this.isloading = true;
        this.dataDepartement = [];
        this.httService.getData(`${environment.api_url}auth/:savedepartement?idsociete=${idsociete}&iddirection=${iddirection}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataDepartement = res.body.data;
                    console.log(res.body.data)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    personnel(idsociete: string = '', iddirection: string = '', iddepartement: string = '') {
        this.isloading = true;
        this.dataPersonnel = [];
        this.httService.getData(`${environment.api_url}auth/:savepersonnel?idsociete=${idsociete}&iddirection=${iddirection}&iddepartement=${iddepartement}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataPersonnel = res.body.data;
                    this.tableConfig = {
                        ...this.tableConfig,
                        data: res.body.data.map((d: any) => {
                            return {
                                ...d,
                                name: `${d.nom} ${d.prenom}`,
                                libelle_poste: d?.dataposte?.libelle_poste,
                                libelle_service: d?.dataservice?.libelle_service
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
            this.personnel(this.users?.dataSociete?.uid, '', '');
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
}
