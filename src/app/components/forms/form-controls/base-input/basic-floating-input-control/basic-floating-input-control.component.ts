import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { selectMenu, selectNumber } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-basic-floating-input-control',
  imports: [Select2Module, CardComponent],
  templateUrl: './basic-floating-input-control.component.html',
  styleUrl: './basic-floating-input-control.component.scss'
})

export class BasicFloatingInputControlComponent {

  public selectNumber = selectNumber;
  public selectMenu = selectMenu;

}
