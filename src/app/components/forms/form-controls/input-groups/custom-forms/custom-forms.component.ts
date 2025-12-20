import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { selectChocolates, selectColor, selectTheme } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-custom-forms',
  imports: [Select2Module, CardComponent],
  templateUrl: './custom-forms.component.html',
  styleUrl: './custom-forms.component.scss'
})

export class CustomFormsComponent {

  public  selectTheme = selectTheme;
  public selectColor = selectColor;
  public selectChocolates = selectChocolates;

}
