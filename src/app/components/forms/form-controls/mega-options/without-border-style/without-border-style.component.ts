import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { withoutBorderStyle } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-without-border-style',
  imports: [CardComponent],
  templateUrl: './without-border-style.component.html',
  styleUrl: './without-border-style.component.scss'
})

export class WithoutBorderStyleComponent {

  public withoutBorderStyle = withoutBorderStyle;

}
