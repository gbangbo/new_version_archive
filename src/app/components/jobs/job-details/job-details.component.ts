import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarRatingModule } from 'ngx-bar-rating';

import { JobFilterComponent } from "../job-filter/job-filter.component";
import { SimilarJobsComponent } from "./similar-jobs/similar-jobs.component";
import { jobDetail } from '../../../shared/data/jobs/jobs-search';

@Component({
  selector: 'app-job-details',
  imports: [CommonModule, RouterModule, BarRatingModule, JobFilterComponent, SimilarJobsComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})

export class JobDetailsComponent {

  public jobDetail = jobDetail;

}
