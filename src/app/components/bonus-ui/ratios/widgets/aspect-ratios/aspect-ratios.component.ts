import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { aspectRatios } from '../../../../../shared/data/bonus-ui/ratios';

@Component({
  selector: 'app-aspect-ratios',
  imports: [CardComponent],
  templateUrl: './aspect-ratios.component.html',
  styleUrl: './aspect-ratios.component.scss'
})

export class AspectRatiosComponent {

  public aspectRatios = aspectRatios;

}
