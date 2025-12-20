import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { defaultStyle } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-default-style',
  imports: [CardComponent],
  templateUrl: './default-style.component.html',
  styleUrl: './default-style.component.scss'
})

export class DefaultStyleComponent {

  public defaultStyle = defaultStyle;

}
