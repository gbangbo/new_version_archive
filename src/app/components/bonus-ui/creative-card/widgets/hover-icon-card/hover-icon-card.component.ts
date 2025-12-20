import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";

@Component({
  selector: 'app-hover-icon-card',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './hover-icon-card.component.html',
  styleUrl: './hover-icon-card.component.scss'
})

export class HoverIconCardComponent {

}
