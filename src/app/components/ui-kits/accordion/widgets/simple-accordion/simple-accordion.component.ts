import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { simpleAccordion } from '../../../../../shared/data/ui-kits/accordion';

@Component({
  selector: 'app-simple-accordion',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './simple-accordion.component.html',
  styleUrl: './simple-accordion.component.scss'
})

export class SimpleAccordionComponent {

  public simpleAccordion = simpleAccordion;
  public accordionOpen: { [key: number]: boolean } = {};

  ngOnInit() {
    this.accordionOpen[this.simpleAccordion[0].id] = true;
  }

  toggleAccordion(index: number) {
    if (this.accordionOpen[index]) {
      this.accordionOpen[index] = false;
    } else {
      this.accordionOpen[index] = true;
    }
  }
  
}
