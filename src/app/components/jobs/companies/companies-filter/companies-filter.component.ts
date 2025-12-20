import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { companiesSidebar } from '../../../../shared/data/jobs/companies';

@Component({
  selector: 'app-companies-filter',
  imports: [CommonModule, BarRatingModule, CardComponent, FeatherIconComponent],
  templateUrl: './companies-filter.component.html',
  styleUrl: './companies-filter.component.scss'
})

export class CompaniesFilterComponent {

  public sidebar = companiesSidebar;
  public isOpen: boolean = false;
  public accordionOpen: { [key: number]: boolean } = {};
  ngOnInit() {
    if (this.sidebar) {
      this.sidebar.forEach((accordion) => {
        this.accordionOpen[accordion.id] = true;
      })
    }
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

  openSidebar(){
    this.isOpen =! this.isOpen;
  }

}
