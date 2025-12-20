import { Component } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-core-ui',
  imports: [NgxSliderModule, CardComponent],
  templateUrl: './core-ui.component.html',
  styleUrl: './core-ui.component.scss'
})

export class CoreUiComponent {

  public minValue: number = 100;
  public maxValue: number = 400;
  public options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return 'Follower ' + value;
    }
  };

}
