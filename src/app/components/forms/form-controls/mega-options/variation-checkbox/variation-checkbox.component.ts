import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { checkBox, themeSales } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-variation-checkbox',
  imports: [CardComponent],
  templateUrl: './variation-checkbox.component.html',
  styleUrl: './variation-checkbox.component.scss'
})

export class VariationCheckboxComponent {

  public checkBox = checkBox;
  public themeSales = themeSales;

}
