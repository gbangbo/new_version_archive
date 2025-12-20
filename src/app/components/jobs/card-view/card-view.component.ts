import { Component } from '@angular/core';

import { CommonCardComponent } from "../common-card/common-card.component";
import { JobFilterComponent } from "../job-filter/job-filter.component";
import { jobCards } from '../../../shared/data/jobs/jobs-search';

@Component({
  selector: 'app-cards-view',
  imports: [JobFilterComponent, CommonCardComponent],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss'
})

export class CardViewComponent {

  public jobCards = jobCards;

}
