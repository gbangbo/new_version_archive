import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {TableComponent} from '../../../shared/components/ui/table/table.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {CommonModule} from "@angular/common";
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {RoleModalComponent} from "./role/role-modal/role-modal.component";
import {CompteModalComponent} from "./compte/compte-modal/compte-modal.component";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {CompteComponent} from "./compte/compte.component";
import {RoleComponent} from "./role/role.component";

@Component({
    selector: 'app-user-list',
    imports: [RouterModule,
        CommonModule,
        TableComponent,
        NgxSpinnerModule,
        TableComponent,
        CardComponent,
        RoleModalComponent,
        CompteModalComponent, FeatherIconComponent, CompteComponent, RoleComponent],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss'
})

export class UserListComponent {
    activeTab = 'role';
    titleCarde: string = '';
    constructor() {
    }

    ngOnInit() {
    }

    handleTab(value: string) {
        this.activeTab = value;
        switch (value) {
            case 'role':
                this.titleCarde = 'RÔLE';
                break;
            case 'compte':
                this.titleCarde = 'COMPTE';
                break;
        }
    }
}
