import {Component, Input, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FeatherIconComponent} from "../../../ui/feather-icon/feather-icon.component";
import {LayoutService} from '../../../../services/layout.service';
import {CommonModule} from "@angular/common";

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

    constructor(public layoutService: LayoutService) {
    }

    ngOnInit() {
        console.log('logoIn:', this.logoIn);
        console.log('logoDark:', this.logoDark);
    }

    toggleSidebar() {
        this.layoutService.closeSidebar = !this.layoutService.closeSidebar;
    }
}
