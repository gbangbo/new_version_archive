import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from "../../../shared/components/ui/feather-icon/feather-icon.component";
import { sidebars } from '../../../shared/data/jobs/jobs-search';
import { jobFilter } from '../../../shared/interface/jobs';

@Component({
  selector: 'app-job-filter',
  imports: [CommonModule, FeatherIconComponent],
  templateUrl: './job-filter.component.html',
  styleUrl: './job-filter.component.scss'
})

export class JobFilterComponent {

  public sidebars: jobFilter[] = sidebars;
  public isOpen: boolean = false;
  public accordionOpen: { [key: number]: boolean } = {};

  ngOnInit() {
    if (this.sidebars) {
      this.sidebars.forEach((accordion) => {
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
