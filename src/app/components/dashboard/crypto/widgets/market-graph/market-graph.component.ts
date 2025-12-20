import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { marketGraph } from '../../../../../shared/data/dashboard/crypto';
import { cardToggleOptions6 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-market-graph',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './market-graph.component.html',
  styleUrl: './market-graph.component.scss'
})

export class MarketGraphComponent {

  public marketGraph = marketGraph;
  public cardToggleOption = cardToggleOptions6;

}
