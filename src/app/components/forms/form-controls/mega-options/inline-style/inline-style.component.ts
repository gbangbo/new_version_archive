import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { inlineStyle } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-inline-style',
  imports: [CardComponent],
  templateUrl: './inline-style.component.html',
  styleUrl: './inline-style.component.scss'
})

export class InlineStyleComponent {

  public inlineStyle = inlineStyle;

}
