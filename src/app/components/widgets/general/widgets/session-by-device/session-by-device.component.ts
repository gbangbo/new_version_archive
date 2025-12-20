import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { sessionByDeviceChart } from '../../../../../shared/data/widgets/general';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-session-by-device',
  imports: [CommonModule, NgApexchartsModule, CardComponent],
  templateUrl: './session-by-device.component.html',
  styleUrl: './session-by-device.component.scss'
})

export class SessionByDeviceComponent {

  @Input() type: string;

  public sessionByDeviceChart = sessionByDeviceChart;
  public cardToggleOption = cardToggleOptions1;

}
