import { Component } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-disabled-slider',
  imports: [NgxSliderModule, CardComponent],
  templateUrl: './disabled-slider.component.html',
  styleUrl: './disabled-slider.component.scss'
})

export class DisabledSliderComponent {

  public value : number = 550;

  public options: Options = {
    floor: 100,
    ceil: 1000,
    disabled: true,
  };

}
