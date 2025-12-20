import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { themeSelection } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-edges-input-style',
  imports: [Select2Module, CardComponent],
  templateUrl: './edges-input-style.component.html',
  styleUrl: './edges-input-style.component.scss'
})

export class EdgesInputStyleComponent {

  public themeSelection = themeSelection;
}
