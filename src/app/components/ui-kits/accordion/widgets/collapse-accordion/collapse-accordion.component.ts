import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-collapse-accordion',
  imports: [CardComponent],
  templateUrl: './collapse-accordion.component.html',
  styleUrl: './collapse-accordion.component.scss'
})

export class CollapseAccordionComponent {

  public isCollapsed = true;
 
  toggleAccordion() {
    this.isCollapsed =! this.isCollapsed;
  }
  
}
