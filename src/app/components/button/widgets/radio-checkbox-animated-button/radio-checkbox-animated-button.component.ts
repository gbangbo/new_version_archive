import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { checkboxButton, radioButton } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-radio-checkbox-animated-button',
  imports: [CardComponent],
  templateUrl: './radio-checkbox-animated-button.component.html',
  styleUrl: './radio-checkbox-animated-button.component.scss'
})

export class RadioCheckboxAnimatedButtonComponent {

  public radioButton = radioButton;
  public checkboxButton = checkboxButton;

}
