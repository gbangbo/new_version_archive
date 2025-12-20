import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { blockButton } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-block-level-button',
  imports: [CardComponent],
  templateUrl: './block-level-button.component.html',
  styleUrl: './block-level-button.component.scss'
})

export class BlockLevelButtonComponent {

  public blockButton = blockButton;

}
