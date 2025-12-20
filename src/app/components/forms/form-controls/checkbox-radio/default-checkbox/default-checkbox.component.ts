import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { defaultCheckbox } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-default-checkbox',
  imports: [CardComponent],
  templateUrl: './default-checkbox.component.html',
  styleUrl: './default-checkbox.component.scss'
})

export class DefaultCheckboxComponent {

  public defaultCheckbox = defaultCheckbox;

}
