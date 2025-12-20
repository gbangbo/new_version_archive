import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { flushAccordion } from '../../../../../shared/data/ui-kits/accordion';

@Component({
  selector: 'app-flush-accordion',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './flush-accordion.component.html',
  styleUrl: './flush-accordion.component.scss'
})

export class FlushAccordionComponent {

  public flushAccordion = flushAccordion;
  public accordionOpen: { [key: number]: boolean } = {};

  ngOnInit() {
    this.accordionOpen[this.flushAccordion[0].id] = true;
  }

  toggleAccordion(index: number) {
    if (this.accordionOpen[index]) {
      this.accordionOpen[index] = false;
    } else {
      this.accordionOpen[index] = true;
    }
  }
}
