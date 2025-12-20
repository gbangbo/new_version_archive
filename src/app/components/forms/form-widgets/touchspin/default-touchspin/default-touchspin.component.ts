import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { touchSpinDetails } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-default-touchspin',
  imports: [CardComponent],
  templateUrl: './default-touchspin.component.html',
  styleUrl: './default-touchspin.component.scss'
})

export class DefaultTouchspinComponent {

  public touchSpinDetails = touchSpinDetails;

  changeValue(id: number, value: number) {
    this.touchSpinDetails.filter((details) => {
      if (details.id == id) {
        if (value == -1) {
          if (details.default_value >= 1) {
            details.default_value -= 1;
          }
        } else if (value == 1) {
          details.default_value += 1;
        }
      }
    })
  }

}
