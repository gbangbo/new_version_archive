import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { liveProductChart } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-live-products',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './live-products.component.html',
  styleUrl: './live-products.component.scss'
})

export class LiveProductsComponent {

  public liveProductChart = liveProductChart;

}
