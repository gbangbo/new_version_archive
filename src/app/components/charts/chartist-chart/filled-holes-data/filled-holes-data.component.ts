import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { filledHolesDataChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-filled-holes-data',
  imports: [ChartistModule, CardComponent],
  templateUrl: './filled-holes-data.component.html',
  styleUrl: './filled-holes-data.component.scss'
})

export class FilledHolesDataComponent {

  public filledHolesDataChart = filledHolesDataChart;

}
