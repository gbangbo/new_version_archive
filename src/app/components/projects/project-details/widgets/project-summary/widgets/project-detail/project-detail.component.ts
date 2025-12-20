import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../../../shared/components/ui/card/card.component';
import { projectDetails } from '../../../../../../../shared/data/project';

@Component({
  selector: 'app-project-detail',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})

export class ProjectDetailComponent {

  public projectSummary = projectDetails.project_summary.summary;

}
