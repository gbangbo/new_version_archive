import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { skillStatusChart } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-skill-status',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './skill-status.component.html',
  styleUrl: './skill-status.component.scss'
})

export class SkillStatusComponent {

  public skillStatusChart = skillStatusChart;

}
