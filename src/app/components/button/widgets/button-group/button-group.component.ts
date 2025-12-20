import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { buttonGroups } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-button-group',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss'
})

export class ButtonGroupComponent {

  public buttonGroups = buttonGroups;

}
