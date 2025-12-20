import { Component } from '@angular/core';

import { VariationRadioComponent } from "./variation-radio/variation-radio.component";
import { VariationCheckboxComponent } from "./variation-checkbox/variation-checkbox.component";
import { DefaultStyleComponent } from "./default-style/default-style.component";
import { WithoutBorderStyleComponent } from "./without-border-style/without-border-style.component";
import { SolidBorderStyleComponent } from "./solid-border-style/solid-border-style.component";
import { OfferStyleBorderComponent } from "./offer-style-border/offer-style-border.component";
import { InlineStyleComponent } from "./inline-style/inline-style.component";
import { VerticalStyleComponent } from "./vertical-style/vertical-style.component";
import { HorizontalStyleComponent } from "./horizontal-style/horizontal-style.component";

@Component({
  selector: 'app-mega-options',
  imports: [VariationRadioComponent, VariationCheckboxComponent, DefaultStyleComponent,
            WithoutBorderStyleComponent, SolidBorderStyleComponent, OfferStyleBorderComponent,
            InlineStyleComponent, VerticalStyleComponent, HorizontalStyleComponent],
  templateUrl: './mega-options.component.html',
  styleUrl: './mega-options.component.scss'
})

export class MegaOptionsComponent {

}
