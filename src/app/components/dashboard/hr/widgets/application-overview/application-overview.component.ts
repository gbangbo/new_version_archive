import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { applicationOverview } from '../../../../../shared/data/dashboard/hr';
import { cardToggleOptions1 } from './../../../../../shared/data/common';

@Component({
  selector: 'app-application-overview',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './application-overview.component.html',
  styleUrl: './application-overview.component.scss'
})

export class ApplicationOverviewComponent {

  public applicationOverview = applicationOverview;
  public cardToggleOption = cardToggleOptions1;
  
}
