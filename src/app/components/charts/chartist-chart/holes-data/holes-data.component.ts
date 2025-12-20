import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { holesDataChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-holes-data',
  imports: [ChartistModule, CardComponent],
  templateUrl: './holes-data.component.html',
  styleUrl: './holes-data.component.scss'
})

export class HolesDataComponent {

  public holesDataChart = holesDataChart;

}
