import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {CreateComponent} from "./create/create.component";
import {PreviewComponent} from "./preview/preview.component";


@Component({
    selector: 'app-organigramme',
    imports: [
        CommonModule,
        CardComponent,
        FeatherIconComponent, CreateComponent, PreviewComponent
    ],
    templateUrl: './organigramme.component.html',
    styleUrl: './organigramme.component.scss',
})
export class OrganigrammeComponent implements OnInit {
    activeTab = 'create';
    titleCarde = `Les niveau de l'organigramme`;

    constructor() {
    }

    ngOnInit(): void {
    }

    handleTab(value: string) {
        this.activeTab = value;
        switch (value) {
            case 'create':
                this.titleCarde = `Ajout d'un niveau`;
                break;
            case 'view':
                this.titleCarde = `Prévisualisation de l'organigramme`;
                break;
        }
    }
}