import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import {CommonModule} from "@angular/common";
import {ConsigneComponent} from "./consigne/consigne.component";
import {PrioriteComponent} from "./priorite/priorite.component";

@Component({
    selector: 'app-consigne-priorite',
    imports: [CardComponent, TableComponent, CommonModule, ConsigneComponent, PrioriteComponent],
    templateUrl: './consigne-priorite.component.html',
    styleUrl: './consigne-priorite.component.scss',
})
export class ConsignePrioriteComponent implements OnInit {
    activeTab = 'consigne';
    titleCarde = 'Les consignes';
    users: any = [];
    dataOneLigne: any = {};


    constructor() {
    }

    ngOnInit(): void {

    }

    handleTab(value: string) {
        this.activeTab = value;
        this.titleCarde = value == 'consigne' ? 'Les consignes' : 'Les priorités';
    }

}
