import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { recruitmentAnalysis } from '../../../../../shared/data/dashboard/hr';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-recruitment-analysis',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './recruitment-analysis.component.html',
  styleUrl: './recruitment-analysis.component.scss'
})

export class RecruitmentAnalysisComponent {

  public cardToggleOption = cardToggleOptions1;
  public recruitmentAnalysis = recruitmentAnalysis;

}
