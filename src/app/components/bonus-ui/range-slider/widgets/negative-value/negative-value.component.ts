import { Component } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-negative-value',
  imports: [NgxSliderModule, CardComponent],
  templateUrl: './negative-value.component.html',
  styleUrl: './negative-value.component.scss'
})

export class NegativeValueComponent {

  public value: number = -500;
  public maxValue: number = 500;
  public options: Options = {
    floor: -1000,
    ceil: 1000
  };

}
