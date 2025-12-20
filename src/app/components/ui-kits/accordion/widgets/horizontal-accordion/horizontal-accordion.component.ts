import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-horizontal-accordion',
  imports: [CardComponent],
  templateUrl: './horizontal-accordion.component.html',
  styleUrl: './horizontal-accordion.component.scss'
})

export class HorizontalAccordionComponent {

  public isCollapsed = true;

  toggleAccordion() {
    this.isCollapsed =! this.isCollapsed;
  }
  
}
