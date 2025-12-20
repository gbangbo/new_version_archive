import { Component } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-steps-range-slider',
  imports: [NgxSliderModule, CardComponent],
  templateUrl: './steps-range-slider.component.html',
  styleUrl: './steps-range-slider.component.scss'
})

export class StepsRangeSliderComponent {

  public minValue: number = 1;
  public maxValue: number = 8;
  public options: Options = {
    floor: 0,
    ceil: 10,
    showTicksValues: true
  };

}
