import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { outlineCheckbox } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-outline-checkbox-style',
  imports: [CardComponent],
  templateUrl: './outline-checkbox-style.component.html',
  styleUrl: './outline-checkbox-style.component.scss'
})

export class OutlineCheckboxStyleComponent {

  public outlineCheckbox = outlineCheckbox;

}
