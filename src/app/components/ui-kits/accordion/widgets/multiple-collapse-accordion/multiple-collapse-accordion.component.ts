import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-multiple-collapse-accordion',
  imports: [CardComponent],
  templateUrl: './multiple-collapse-accordion.component.html',
  styleUrl: './multiple-collapse-accordion.component.scss'
})

export class MultipleCollapseAccordionComponent {

  public isCollapsedFirst = true;
  public isCollapsedSecond = true;
  
  toggleCollapse(value?: string) {
    if(value == 'first') {
      this.isCollapsedFirst =! this.isCollapsedFirst;
    } else if(value == 'second') {
      this.isCollapsedSecond =! this.isCollapsedSecond;
    } else {
      this.isCollapsedFirst =! this.isCollapsedFirst;
      this.isCollapsedSecond =! this.isCollapsedSecond;
    }
  }

}
