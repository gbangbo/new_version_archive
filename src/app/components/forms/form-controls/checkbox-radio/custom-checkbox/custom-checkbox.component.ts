import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { borderCheckbox, filledCheckbox, iconsCheckbox } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-custom-checkbox',
  imports: [CardComponent],
  templateUrl: './custom-checkbox.component.html',
  styleUrl: './custom-checkbox.component.scss'
})

export class CustomCheckboxComponent {

  public borderCheckbox = borderCheckbox;
  public iconCheckbox = iconsCheckbox;
  public filledCheckbox = filledCheckbox;

}
