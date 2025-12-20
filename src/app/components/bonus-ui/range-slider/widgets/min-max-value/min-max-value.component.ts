import { Component } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-min-max-value',
  imports: [NgxSliderModule, CardComponent],
  templateUrl: './min-max-value.component.html',
  styleUrl: './min-max-value.component.scss'
})

export class MinMaxValueComponent {

  public value: number = 100;
  public maxValue: number = 70;
  public options: Options = {
    floor: 0,
    ceil: 200
  };

}
