import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { turnOverChart } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-turn-over',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './turn-over.component.html',
  styleUrl: './turn-over.component.scss'
})

export class TurnOverComponent {

  public turnOverChart = turnOverChart;

}
