import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { touchSpinDetails } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-rounded-touchspin',
  imports: [CardComponent],
  templateUrl: './rounded-touchspin.component.html',
  styleUrl: './rounded-touchspin.component.scss'
})

export class RoundedTouchspinComponent {

  public touchSpinDetails = touchSpinDetails;

  changeValue(id: number, value: number) {
    this.touchSpinDetails.filter((details) => {
      if (details.id == id) {
        if (value == -1) {
          if (details.rounded_value >= 1) {
            details.rounded_value -= 1;
          }
        } else if (value == 1) {
          details.rounded_value += 1;
        }
      }
    })
  }

}
