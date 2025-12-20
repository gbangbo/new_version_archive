import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { roundedButton } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-outline-rounded-button',
  imports: [CardComponent],
  templateUrl: './outline-rounded-button.component.html',
  styleUrl: './outline-rounded-button.component.scss'
})

export class OutlineRoundedButtonComponent {

  public roundedButton = roundedButton;

}
