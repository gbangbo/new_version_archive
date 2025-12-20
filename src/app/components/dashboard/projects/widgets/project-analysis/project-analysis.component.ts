import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { projectAnalysis } from '../../../../../shared/data/dashboard/projects';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-project-analysis',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './project-analysis.component.html',
  styleUrl: './project-analysis.component.scss'
})

export class ProjectAnalysisComponent {

  public cardToggleOption = cardToggleOptions1;
  public projectAnalysis = projectAnalysis;

}
