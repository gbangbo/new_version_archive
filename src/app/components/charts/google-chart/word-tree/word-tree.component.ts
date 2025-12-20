import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { wordTreeChart } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-word-tree',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './word-tree.component.html',
  styleUrl: './word-tree.component.scss'
})

export class WordTreeComponent {

  public wordTreeChart = wordTreeChart;

}
