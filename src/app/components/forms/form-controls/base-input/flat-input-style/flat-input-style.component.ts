import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { selectNumber, selectPainting } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-flat-input-style',
  imports: [Select2Module, CardComponent],
  templateUrl: './flat-input-style.component.html',
  styleUrl: './flat-input-style.component.scss'
})

export class FlatInputStyleComponent {

  public selectNumber = selectNumber;
  public selectPainting = selectPainting;

}
