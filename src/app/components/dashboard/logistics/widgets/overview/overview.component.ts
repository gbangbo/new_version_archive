import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { Overview } from '../../../../../shared/interface/dashboard/logistics';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, NgApexchartsModule, CardComponent,
            SvgIconComponent, FeatherIconComponent, CounterComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})

export class OverviewComponent {

  @Input() overview: Overview;

}
