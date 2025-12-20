import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { shipmentTracking } from '../../../../../shared/data/dashboard/logistics';
import { TableConfigs } from '../../../../../shared/interface/common';
import { ShipmentTracking } from '../../../../../shared/interface/dashboard/logistics';

@Component({
  selector: 'app-shipment-tracking',
  imports: [CardComponent, TableComponent],
  templateUrl: './shipment-tracking.component.html',
  styleUrl: './shipment-tracking.component.scss'
})

export class ShipmentTrackingComponent {

  public shipmentTracking = shipmentTracking;
  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Shipment', field_value: 'shipment', sort: true },
      { title: 'Carrier', field_value: 'carrier', sort: true },
      { title: 'Origin', field_value: 'origin', sort: true },
      { title: 'Destination', field_value: 'destination', sort: true },
      { title: 'Current Location', field_value: 'current_location', sort: true },
      { title: 'ETA', field_value: 'eta', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
    ],

    data: [] as ShipmentTracking[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToOrder'] = () => {
      this.router.navigate(['/order/1']);
    };

    this.tableConfig.data = shipmentTracking.map((details: ShipmentTracking) => {
      const formattedDetails = { ...details };
      formattedDetails.shipment =  this.sanitizer.bypassSecurityTrustHtml(`<a href="javascript:void(0)" onclick="navigateToOrder()">${details.shipment}</a>`);

      formattedDetails.status = `<span class="badge f-14 font-normal txt-${details.class}">${details.status}</span>`;

      return formattedDetails;
    });
  }

}
