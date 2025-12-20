import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { imageCheckbox } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-image-checkbox',
  imports: [CardComponent],
  templateUrl: './image-checkbox.component.html',
  styleUrl: './image-checkbox.component.scss'
})

export class ImageCheckboxComponent {

  public imageCheckbox = imageCheckbox;

}
