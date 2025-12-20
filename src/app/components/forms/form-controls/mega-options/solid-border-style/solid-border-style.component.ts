import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { solidBorderStyle } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-solid-border-style',
  imports: [CardComponent],
  templateUrl: './solid-border-style.component.html',
  styleUrl: './solid-border-style.component.scss'
})

export class SolidBorderStyleComponent {

  public solidBorderStyle = solidBorderStyle;

}
