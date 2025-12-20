import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { radioToggle } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-radio-toggle-button',
  imports: [CardComponent],
  templateUrl: './radio-toggle-button.component.html',
  styleUrl: './radio-toggle-button.component.scss'
})

export class RadioToggleButtonComponent {

  public radioToggle = radioToggle;

}
