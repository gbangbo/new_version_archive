import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { selectColor, themeSelection } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-raise-input-style',
  imports: [Select2Module,CardComponent],
  templateUrl: './raise-input-style.component.html',
  styleUrl: './raise-input-style.component.scss'
})

export class RaiseInputStyleComponent {

  public themeSelection = themeSelection;
  public selectColor = selectColor;

}
