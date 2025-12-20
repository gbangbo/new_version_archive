import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { vehicleOverview } from '../../../../../shared/data/dashboard/logistics';
import { VehiclesOverview } from '../../../../../shared/interface/dashboard/logistics';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-vehicles-overview',
  imports: [CardComponent, TableComponent],
  templateUrl: './vehicles-overview.component.html',
  styleUrl: './vehicles-overview.component.scss'
})

export class VehiclesOverviewComponent {

  public vehicleOverview = vehicleOverview;
  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Vehicle ID', field_value: 'vehicle_id', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
      { title: 'Driver Name', field_value: 'driver_name', sort: true },
      { title: 'Next Due', field_value: 'next_due', sort: true },
      { title: 'Total Distance', field_value: 'total_distance', sort: true },
      { title: 'Location', field_value: 'location', sort: true },
    ],

    data: [] as VehiclesOverview[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToOrder'] = () => {
      this.router.navigate(['/order/1']);
    };

    this.tableConfig.data = vehicleOverview.map((details: VehiclesOverview) => {
      const formattedDetails = { ...details };
      formattedDetails.vehicle_id = this.sanitizer.bypassSecurityTrustHtml(`<a href="javascript:void(0)"  onclick="navigateToOrder()">${details.vehicle_id}</a>`);

      formattedDetails.driver_name = `<div class="common-flex items-center">
                                      <img class="max-w-full rounded-full" src="${details.image}" alt="user">
                                      <a class="font-medium" href="javascript:void(0)" >${details.driver_name}</a>
                                      </div>`;

      return formattedDetails;
    });
  }


}
