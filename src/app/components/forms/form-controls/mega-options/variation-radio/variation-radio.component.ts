import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { variationRadio } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-variation-radio',
  imports: [CardComponent, SvgIconComponent],
  templateUrl: './variation-radio.component.html',
  styleUrl: './variation-radio.component.scss'
})

export class VariationRadioComponent {

  public variationRadio = variationRadio;

}
