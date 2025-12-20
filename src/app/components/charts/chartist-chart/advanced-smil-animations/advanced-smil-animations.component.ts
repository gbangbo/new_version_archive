import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { advanceSMILChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-advanced-smil-animations',
  imports: [ChartistModule, CardComponent],
  templateUrl: './advanced-smil-animations.component.html',
  styleUrl: './advanced-smil-animations.component.scss'
})

export class AdvancedSmilAnimationsComponent {

  public advanceSMILChart = advanceSMILChart;

}
