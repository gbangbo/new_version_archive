import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { imageSize } from '../../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-image-size',
  imports: [CardComponent],
  templateUrl: './image-size.component.html',
  styleUrl: './image-size.component.scss'
})

export class ImageSizeComponent {

  public imageSize = imageSize;
  
}
