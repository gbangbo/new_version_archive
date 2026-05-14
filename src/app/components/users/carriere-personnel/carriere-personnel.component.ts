import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {CarPersoComponent} from "./car-perso/car-perso.component";
import {PersoComponent} from "./perso/perso.component";


@Component({
    selector: 'app-carriere-personnel',
    imports: [
        CommonModule,
        CardComponent,
        CarPersoComponent, PersoComponent],
    providers: [],
    templateUrl: './carriere-personnel.component.html',
    styleUrl: './carriere-personnel.component.scss',
})
export class CarrierePersonnelComponent implements OnInit {
    activeTab = 'carriere_personnel';
    titleCarde: string = '';

    constructor() {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    handleTab(value: string) {
        this.activeTab = value;
        switch (value) {
            case 'carriere_personnel':
                this.titleCarde = 'CARRIERE PERSONNEL';
                break;
            case 'personnel':
                this.titleCarde = 'PERSONNEL';
                break;
        }
    }
}
