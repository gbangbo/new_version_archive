import { Component } from '@angular/core';

import { OverviewComponent } from "./widgets/overview/overview.component";
import { ShipmentTrackingComponent } from "./widgets/shipment-tracking/shipment-tracking.component";
import { AvgDeliveryDurationComponent } from "./widgets/avg-delivery-duration/avg-delivery-duration.component";
import { ShipmentDetailsComponent } from "./widgets/shipment-details/shipment-details.component";
import { FleetStatusComponent } from "./widgets/fleet-status/fleet-status.component";
import { OpenSalesOrderComponent } from "./widgets/open-sales-order/open-sales-order.component";
import { ProfitByCountryComponent } from "./widgets/profit-by-country/profit-by-country.component";
import { VehiclesOverviewComponent } from "./widgets/vehicles-overview/vehicles-overview.component";
import { overviews } from '../../../shared/data/dashboard/logistics';

@Component({
  selector: 'app-logistics',
  imports: [OverviewComponent, ShipmentTrackingComponent, AvgDeliveryDurationComponent,
            ShipmentDetailsComponent, FleetStatusComponent, OpenSalesOrderComponent,
            ProfitByCountryComponent, VehiclesOverviewComponent],
  templateUrl: './logistics.component.html',
  styleUrl: './logistics.component.scss'
})

export class LogisticsComponent {

  public overviews = overviews;

}
