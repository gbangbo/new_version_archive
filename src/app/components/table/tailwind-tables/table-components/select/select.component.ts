import { Component } from '@angular/core';
import { Select2Data, Select2Module } from 'ng-select2-component';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-select',
  imports: [Select2Module, CardComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})

export class SelectComponent {

  public values: Select2Data = new Array();

  constructor() {
    for (let i = 1; i <= 5; i++) {
      this.values.push({ value: i, label: i.toString() })
    }
  }

}
