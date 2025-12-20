import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { websiteTrafficChart } from '../../../../../shared/data/dashboard/e-commerce';
import { cardToggleOptions4 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-website-traffic',
  imports: [NgApexchartsModule, CardComponent, SvgIconComponent],
  templateUrl: './website-traffic.component.html',
  styleUrl: './website-traffic.component.scss'
})

export class WebsiteTrafficComponent {

  public cardToggleOption = cardToggleOptions4;
  public websiteTrafficChart = websiteTrafficChart;

}
