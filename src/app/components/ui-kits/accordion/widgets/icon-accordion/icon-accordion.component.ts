import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { iconAccordion } from '../../../../../shared/data/ui-kits/accordion';

@Component({
  selector: 'app-icon-accordion',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './icon-accordion.component.html',
  styleUrl: './icon-accordion.component.scss'
})

export class IconAccordionComponent {

  public iconAccordion = iconAccordion;
  public accordionOpen: { [key: number]: boolean } = {};

  ngOnInit() {
    this.accordionOpen[this.iconAccordion[0].id] = true;
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
