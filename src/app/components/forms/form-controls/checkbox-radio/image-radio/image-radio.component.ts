import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { imageRadio } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-image-radio',
  imports: [CardComponent],
  templateUrl: './image-radio.component.html',
  styleUrl: './image-radio.component.scss'
})

export class ImageRadioComponent {

  public imageRadio = imageRadio;

}
