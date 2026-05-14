import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import {CommonModule} from "@angular/common";
import {SiteComponent} from "./site/site.component";
import {RayonComponent} from "./rayon/rayon.component";
import {BoiteComponent} from "./boite/boite.component";

@Component({
    selector: 'app-site-rayon-boite',
    imports: [CardComponent, TableComponent, CommonModule, SiteComponent, RayonComponent, BoiteComponent],
    templateUrl: './site-rayon-boite.component.html',
    styleUrl: './site-rayon-boite.component.scss',
})
export class SiteRayonBoiteComponent implements OnInit {
    activeTab = 'site';
    titleCarde = 'Les sites';

    constructor() {
    }

    ngOnInit(): void {
    }

    handleTab(value: string) {
        this.activeTab = value;
        switch (value) {
            case 'site':
                this.titleCarde = 'Les sites';
                break;
            case 'rayon':
                this.titleCarde = 'Les rayons';
                break;
            case 'boite':
                this.titleCarde = 'Les boîtes';
                break;
        }
    }
}
