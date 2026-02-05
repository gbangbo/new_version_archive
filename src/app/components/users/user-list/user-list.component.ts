import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

import {TableComponent} from '../../../shared/components/ui/table/table.component';
import {users} from '../../../shared/data/user';
import {TableClickedAction, TableConfigs} from '../../../shared/interface/common';
import {Users} from '../../../shared/interface/user';
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {CommonModule} from "@angular/common";
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../core/http.service";
import {Authorization} from "../../../protect/authorization.service";
import moment from "moment";
import {RoleModalComponent} from "./role-modal/role-modal.component";
import {CompteModalComponent} from "./compte-modal/compte-modal.component";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";

@Component({
    selector: 'app-user-list',
    imports: [RouterModule,
        CommonModule,
        TableComponent,
        NgxSpinnerModule,
        TableComponent,
        CardComponent,
        RoleModalComponent,
        CompteModalComponent, FeatherIconComponent],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss'
})

export class UserListComponent {
    users: any = [];
    public tableConfigRole: TableConfigs = {
        columns: [
            {title: 'Libellé role', field_value: 'libelle_role', sort: true},
            {title: 'Créé le', field_value: 'created_at', sort: true},
        ],
        row_action: [
            {
                label: "Edit",
                action_to_perform: "edit",
                icon: "edit-content",
                class: "btn-sm"
            }
        ],
        data: [] as Users[]
    };
    public tableConfig: TableConfigs = {
        columns: [
            {title: 'Nom & Prénoms', field_value: 'name', sort: true},
            {title: 'Email', field_value: 'email', sort: true},
            {title: 'Role', field_value: 'libelle_role', sort: true},
            // {title: 'Creation Date', field_value: 'creation_date', sort: true},
            {title: 'Statut', field_value: 'status', sort: true},
        ],
        row_action: [
            {label: "Edit", action_to_perform: "edit", icon: "edit-content", path: '/user/add-user'},
            {
                label: "Delete",
                action_to_perform: "delete",
                icon: "trash1",
                modal: true,
                model_text: 'Voulez-vous vraiment désactiver le compte ?'
            }
        ],
        data: [] as Users[]
    };
    activeTab = 'role';
    titleCarde: string = '';
    actionLoad: string = "Chargement";
    modalOpen: boolean = false;
    modalOpenRole: boolean = false;
    isloading: boolean = false;
    isloadingRole: boolean = false;
    dataOneLigne: any = {};

    constructor(private router: Router, private sanitizer: DomSanitizer, private spinner: NgxSpinnerService, private httService: HttpService, private autor: Authorization) {
    }

    ngOnInit() {
        (window as any)['navigateToUser'] = () => {
            this.router.navigate(['/user/user-profile/1']);
        };
        this.users = this.autor.getInfosUsers();
        // this.tableConfig.data = this.formatUserDetails(users);
        this.saveroles(this.users?.dataSociete?.uid, '')
        this.viewCompte(this.users?.dataSociete?.uid, '')
    }

    saveroles(idsociete: string = '', idrole: string = '') {
        this.isloadingRole = true;
        this.tableConfigRole.data = [];
        this.httService.getData(`${environment.api_url}auth/:saveroles?idsociete=${idsociete}&idrole=${idrole}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloadingRole = false;
                if (res.body.status) {
                    this.tableConfigRole = {
                        ...this.tableConfigRole,
                        data: res.body.data.map((e: any) => {
                            return {...e, created_at: moment(e.created_at).format('DD/MM/YYYY')}
                        })
                    };
                    console.log("Les types de docs ==========", res.body.data)
                }
            })
            .catch((err) => {
                this.isloadingRole = false;
            });

    }

    viewCompte(idsociete: string = '', idpersonnel: string = '') {
        this.isloading = true;
        this.tableConfig.data = [];
        this.httService.getData(`${environment.api_url}auth/:liste-des-comptes?idsociete=${idsociete}&idpersonnel=${idpersonnel}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    let cpte = res.body.data.map((ev: any) => {
                        return {
                            ...ev,
                            name: this.sanitizer.bypassSecurityTrustHtml(`<a href="javascript:void(0)">${ev.datapersonnel.nom} ${ev.datapersonnel.prenom}</a>`),
                            email: `<p>${ev.email}</p>`,
                            libelle_role: ev.datarole.libelle_role,
                            status: `<span class="badge badge-light-${ev.is_active ? 'success' : ev.is_active === 'pending' ? 'warning' : ''}"> ${ev?.is_active ?'Actif':'Désactivé'} </span>`
                        }
                    })
                    this.tableConfig = {
                        ...this.tableConfig,
                        data: (cpte)
                    };
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }


    private formatUserDetails(users: Users[]) {
        return users.map((user: Users) => {
            const formattedProducts = {...user};
            formattedProducts.name = this.sanitizer.bypassSecurityTrustHtml(`<a href="javascript:void(0)" onclick="navigateToUser()">${user.name}</a>`);

            formattedProducts.email = `<p>${user.email}</p>`;
            formattedProducts.role = `<p>${user.role}</p>`;
            formattedProducts.creation_date = `<p>${user.creation_date}</p>`;
            formattedProducts.status = `<span class="badge badge-light-${user.status == 'active' ? 'success' :
                user.status == 'pending' ? 'warning' : ''}">${user.status.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}</span>`;
            return formattedProducts;
        });
    }

    private formatUserCompte(users: any) {

        if (!Array.isArray(users)) {
            console.error('formatUserCompte attend un tableau, reçu :', users);
            return [];
        }

        return users.map((user: any) => {
            const formattedProducts = {...user};

            formattedProducts.name =
                this.sanitizer.bypassSecurityTrustHtml(
                    `<a href="javascript:void(0)">${user.name}</a>`
                );

            formattedProducts.email = `<p>${user.email}</p>`;
            formattedProducts.libelle_role = `<p>${user.libelle_role}</p>`;

            formattedProducts.status =
                `<span class="badge badge-light-${
                    user.is_active === 'active'
                        ? 'success'
                        : user.is_active === 'pending'
                            ? 'warning'
                            : ''
                }">
            ${user?.is_active
                    ?.toLowerCase()
                    ?.replace(/\b\w/g, (char: string) => char.toUpperCase())}
            </span>`;

            return formattedProducts;
        });
    }


    handleTab(value: string) {
        this.activeTab = value;
        switch (value) {
            case 'role':
                this.titleCarde = 'RÖLE';
                break;
            case 'compte':
                this.titleCarde = 'COMPTE';
                break;
        }
    }

    handleModal(value: boolean) {
        if (value) {
            //this.typedocuments(this.users?.dataSociete?.uid, '');
        }
        this.modalOpen = false;
    }

    handleModalRole(value: boolean) {
        if (value) {
            this.saveroles(this.users?.dataSociete?.uid, '');
        }
        this.modalOpenRole = false;
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

    openModal() {
        this.modalOpen = true;
        this.dataOneLigne = {};
    }

    openModalRole() {
        this.modalOpenRole = true;
        this.dataOneLigne = {};
    }

    handleActionRole(value: TableClickedAction) {
        switch (value.action_to_perform) {
            case 'edit':
                this.modalOpenRole = true;
                this.dataOneLigne = value.data;
                break;
            default:
        }
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
}
