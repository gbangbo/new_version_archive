import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { iconTitle } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-icon-with-title',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './icon-with-title.component.html',
  styleUrl: './icon-with-title.component.scss'
})

export class IconWithTitleComponent {

  public iconTitle  = iconTitle;

}
