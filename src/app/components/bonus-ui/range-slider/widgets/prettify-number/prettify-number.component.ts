import { Component } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-prettify-number',
  imports: [NgxSliderModule, CardComponent],
  templateUrl: './prettify-number.component.html',
  styleUrl: './prettify-number.component.scss'
})

export class PrettifyNumberComponent {

  public value: number = 1000;

  public options: Options = {
    floor: 1000,
    ceil: 10000,
    showTicksValues: true,
    tickStep: 3000,
    tickValueStep: 100
  };

}
