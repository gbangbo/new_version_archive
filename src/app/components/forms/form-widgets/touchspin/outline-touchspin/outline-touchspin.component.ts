import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { touchSpinDetails } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-outline-touchspin',
  imports: [CardComponent],
  templateUrl: './outline-touchspin.component.html',
  styleUrl: './outline-touchspin.component.scss'
})

export class OutlineTouchspinComponent {

  public touchSpinDetails = touchSpinDetails;

  changeValue(id: number, value: number) {
    this.touchSpinDetails.filter((details) => {
      if (details.id == id) {
        if (value == -1) {
          if (details.outlined_value >= 1) {
            details.outlined_value -= 1;
          }
        } else if (value == 1) {
          details.outlined_value += 1;
        }
      }
    })
  }

}
