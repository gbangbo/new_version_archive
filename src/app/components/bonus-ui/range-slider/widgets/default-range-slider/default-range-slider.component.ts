import { Component } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-default-range-slider',
  imports: [NgxSliderModule, CardComponent],
  templateUrl: './default-range-slider.component.html',
  styleUrl: './default-range-slider.component.scss'
})

export class DefaultRangeSliderComponent {

  public value: number = 550;
  public options: Options = {
    floor: 100,
    ceil: 1000,
  };

}
