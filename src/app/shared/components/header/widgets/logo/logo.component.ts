import {Component, Input, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FeatherIconComponent} from "../../../ui/feather-icon/feather-icon.component";
import {LayoutService} from '../../../../services/layout.service';
import {CommonModule} from "@angular/common";
import {Authorization} from "../../../../../protect/authorization.service";

@Component({
    selector: 'app-header-logo',
    imports: [RouterModule, FeatherIconComponent, CommonModule],
    templateUrl: './logo.component.html',
    styleUrl: './logo.component.scss'
})
export class LogoComponent implements OnInit {

    @Input() logoIn!: string;
    @Input() logoDark!: string;
    @Input() icon: string;
    @Input() type: string;
    users: any = [];

    // Repli quand la societe n'a pas de logo, ou quand le fichier n'est pas joignable
    readonly LOGO_PAR_DEFAUT = 'assets/images/logo/logo_apw_full.png';
    logoSociete: string = this.LOGO_PAR_DEFAUT;

    constructor(private autor: Authorization, public layoutService: LayoutService,) {
    }

    ngOnInit() {
        this.users = this.autor.getInfosUsers();
        this.logoSociete = this.users?.datasociete?.logo || this.LOGO_PAR_DEFAUT;
    }

    // Une URL de logo cassee ne doit pas laisser un cadre vide dans la sidebar
    logoIndisponible(): void {
        if (this.logoSociete !== this.LOGO_PAR_DEFAUT) {
            this.logoSociete = this.LOGO_PAR_DEFAUT;
        }
    }

    toggleSidebar() {
        this.layoutService.closeSidebar = !this.layoutService.closeSidebar;
        this.layoutService.replierForce = false;
    }
}
