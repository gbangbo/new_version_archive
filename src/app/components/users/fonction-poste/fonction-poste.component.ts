import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {TableComponent} from '../../../shared/components/ui/table/table.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {CommonModule} from "@angular/common";
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {HttpService} from "../../../core/http.service";
import {Authorization} from "../../../protect/authorization.service";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {PosteComponent} from "./poste/poste.component";
import {FonctionComponent} from "./fonction/fonction.component";

@Component({
    selector: 'app-fonction-poste',
    imports: [RouterModule,
        CommonModule,
        TableComponent,
        NgxSpinnerModule,
        TableComponent,
        CardComponent, FeatherIconComponent, PosteComponent, FonctionComponent],
    templateUrl: './fonction-poste.component.html',
    styleUrl: './fonction-poste.component.scss',
})

export class FonctionPosteComponent {
    users: any = [];

    activeTab = 'fonction';
    titleCarde: string = '';

    constructor(private router: Router, private httService: HttpService, private autor: Authorization) {
    }

    ngOnInit() {
        this.users = this.autor.getInfosUsers();
    }

    handleTab(value: string) {
        this.activeTab = value;
        switch (value) {
            case 'fonction':
                this.titleCarde = 'FONCTION';
                break;
            case 'poste':
                this.titleCarde = 'POSTE';
                break;
        }
    }

}
