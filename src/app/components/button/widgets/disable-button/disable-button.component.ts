import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { disableButton } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-disable-button',
  imports: [CardComponent],
  templateUrl: './disable-button.component.html',
  styleUrl: './disable-button.component.scss'
})

export class DisableButtonComponent {

  public disableButton = disableButton;

}
