import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { boldBorder } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-bold-border-outline-button',
  imports: [CardComponent],
  templateUrl: './bold-border-outline-button.component.html',
  styleUrl: './bold-border-outline-button.component.scss'
})

export class BoldBorderOutlineButtonComponent {

  public boldBorder = boldBorder;

}
