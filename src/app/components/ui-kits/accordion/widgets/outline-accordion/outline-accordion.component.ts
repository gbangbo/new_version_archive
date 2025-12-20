import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { outlineAccordion } from '../../../../../shared/data/ui-kits/accordion';

@Component({
  selector: 'app-outline-accordion',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './outline-accordion.component.html',
  styleUrl: './outline-accordion.component.scss'
})

export class OutlineAccordionComponent {

  public outlineAccordion = outlineAccordion;
  public accordionOpen: { [key: number]: boolean } = {};

  ngOnInit() {
    this.accordionOpen[this.outlineAccordion[0].id] = true;
  }

  toggleAccordion(index: number) {
    if (this.accordionOpen[index]) {
      this.accordionOpen[index] = false;
    } else {
      Object.keys(this.accordionOpen).forEach(key => {
        this.accordionOpen[+key] = false;
      });
  
      this.accordionOpen[index] = true;
    }
  }

}
