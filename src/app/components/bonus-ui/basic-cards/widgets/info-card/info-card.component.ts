import { Component, Input } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-info-card',
  imports: [CardComponent],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})

export class InfoCardComponent {

  @Input() details: any;

}
