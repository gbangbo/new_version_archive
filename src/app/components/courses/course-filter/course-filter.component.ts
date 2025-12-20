import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

import { FeatherIconComponent } from "../../../shared/components/ui/feather-icon/feather-icon.component";
import { courseSidebar } from '../../../shared/data/courses';

@Component({
  selector: 'app-course-filter',
  imports: [CommonModule, BarRatingModule, FeatherIconComponent],
  templateUrl: './course-filter.component.html',
  styleUrl: './course-filter.component.scss'
})

export class CourseFilterComponent {

  public courseSidebar = courseSidebar;
  public isOpen: boolean = false;
  public accordionOpen: { [key: number]: boolean } = {};

  ngOnInit() {
    if (this.courseSidebar) {
      this.courseSidebar.forEach((accordion) => {
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

  openFilter(){
    this.isOpen =! this.isOpen;
  }
  
}
