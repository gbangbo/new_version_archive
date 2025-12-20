import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CommonCardComponent } from "../common-card/common-card.component";
import { JobFilterComponent } from "../job-filter/job-filter.component";
import { jobCards } from '../../../shared/data/jobs/jobs-search';

@Component({
  selector: 'app-list-view',
  imports: [CommonModule, JobFilterComponent, CommonCardComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})

export class ListViewComponent {

  public jobCards = jobCards;

}
