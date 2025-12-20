import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { roundedButton } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-rounded-button',
  imports: [CardComponent],
  templateUrl: './rounded-button.component.html',
  styleUrl: './rounded-button.component.scss'
})

export class RoundedButtonComponent {

  public roundedButton = roundedButton;

}
