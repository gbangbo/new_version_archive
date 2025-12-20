import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { bestSeller } from '../../../../../shared/data/dashboard/e-commerce';
import { BestSeller } from '../../../../../shared/interface/dashboard/e-commerce';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-best-sellers',
  imports: [CardComponent, TableComponent],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss'
})

export class BestSellersComponent {

  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Sellers', field_value: 'seller_name', sort: true },
      { title: 'Company', field_value: 'company_name', sort: true },
      { title: 'Category', field_value: 'category', sort: true },
      { title: 'Earnings', field_value: 'earning', sort: true, type: 'price' },
    ],
    data: [] as BestSeller[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToSeller'] = () => {
      this.router.navigate(['/seller/list']);
    };

    this.tableConfig.data = bestSeller.map((seller: BestSeller) => {
      const formattedSeller = { ...seller };
      formattedSeller.seller_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="common-flex items-center">
                                <img class="max-w-full rounded-full" src="${seller.seller_profile}" alt="user">
                                <a class="font-medium" href="javascript:void(0)" onclick="navigateToSeller()">${seller.seller_name}</a>
                              </div>`);
                              
      return formattedSeller;
    });
  }

}
