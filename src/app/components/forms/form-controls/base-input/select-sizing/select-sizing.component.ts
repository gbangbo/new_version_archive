import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { selectSizing } from '../../../../../shared/data/form-control';
@Component({
  selector: 'app-select-sizing',
  imports: [Select2Module, CardComponent],
  templateUrl: './select-sizing.component.html',
  styleUrl: './select-sizing.component.scss'
})

export class SelectSizingComponent {

  public selectSizing = selectSizing;

}
