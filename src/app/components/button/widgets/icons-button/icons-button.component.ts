import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { iconsButton } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-icons-button',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './icons-button.component.html',
  styleUrl: './icons-button.component.scss'
})

export class IconsButtonComponent {

  public iconsButton = iconsButton;

}
