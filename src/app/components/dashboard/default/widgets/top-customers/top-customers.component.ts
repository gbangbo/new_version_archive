import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { topCustomers } from '../../../../../shared/data/dashboard/default';
import { TopCustomers } from '../../../../../shared/interface/dashboard/default';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-top-customers',
  imports: [CommonModule, CardComponent, TableComponent],
  templateUrl: './top-customers.component.html',
  styleUrl: './top-customers.component.scss'
})

export class TopCustomersComponent {

  public cardToggleOptions = cardToggleOptions1;
  public topCustomers = topCustomers;
  public selected: number[] = [];

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Customers', field_value: 'customer_name', sort: true },
      { title: 'Total Purchase', field_value: 'purchase_items', sort: true, type: 'purchase' },
      { title: 'Total Price', field_value: 'total_price', sort: true, type: 'price', class: 'f-w-500 txt-success', decimal_number: true},
    ],
    data: [] as TopCustomers[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}
  
  ngOnInit() {
    (window as any)['navigateToCustomer'] = () => {
      this.router.navigate(['/product/list']);
    };

    this.tableConfig.data = topCustomers.map((customer: TopCustomers) => {
      const formattedCustomer = { ...customer };
      formattedCustomer.customer_name = this.sanitizer.bypassSecurityTrustHtml(
                                        `<div class="flex">
                                          <img class="max-w-full img-40 rounded-full me-2" src="${customer.customer_profile}" alt="user">
                                          <div class="img-content-box">
                                              <a class="font-medium" href="javascript:void(0)" onclick="navigateToCustomer()">
                                                ${customer.customer_name}
                                              </a>
                                              <p class="mb-0 f-light">${customer.customer_id}</p>
                                          </div>
                                        </div>`);
                                        
      return formattedCustomer;
    });
  }
}
