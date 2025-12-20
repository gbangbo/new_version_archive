import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { fleetStatus } from '../../../../../shared/data/dashboard/logistics';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-fleet-status',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './fleet-status.component.html',
  styleUrl: './fleet-status.component.scss'
})

export class FleetStatusComponent {

  public cardToggleOption = cardToggleOptions3;
  public fleetStatus = fleetStatus;

}
