import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { cryptoAnnotationChart } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-cryptocurrency-annotation',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './cryptocurrency-annotation.component.html',
  styleUrl: './cryptocurrency-annotation.component.scss'
})

export class CryptocurrencyAnnotationComponent {

  public cryptoAnnotationChart = cryptoAnnotationChart;

}
