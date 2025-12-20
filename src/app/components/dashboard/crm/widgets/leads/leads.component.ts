import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { leads } from '../../../../../shared/data/dashboard/crm';
import { Lead } from '../../../../../shared/interface/dashboard/crm';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-leads',
  imports: [CardComponent, TableComponent],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})

export class LeadsComponent {

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Lead Name', field_value: 'lead_name', sort: true },
      { title: 'Date', field_value: 'date', sort: true },
      { title: 'Email', field_value: 'email', sort: true },
      { title: 'Assigned to', field_value: 'assign_user_name', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
    ],
    data: [] as Lead[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToLead'] = () => {
      this.router.navigate(['/user/user-list']);
    };
    
    this.tableConfig.data = leads.map((lead: Lead) => {
      const formattedLead = { ...lead };
      formattedLead.lead_name =this.sanitizer.bypassSecurityTrustHtml(`<div class="common-flex items-center">
                                  <img class="max-w-full h-auto lead-img" src="${lead.lead_profile}" alt="${lead.lead_name}">
                                  <a class="c-light" href="javascript:void(0)" onclick="navigateToLead()">${lead.lead_name}</a>
                                </div>`);

      formattedLead.assign_user_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="common-flex items-center">
                                          <img class="max-w-full h-auto" src="${lead.assign_user_profile}" alt="${lead.assign_user_name}">
                                          <a class="c-light" href="javascript:void(0)" onclick="navigateToLead()">${lead.assign_user_name}</a>
                                        </div>`);

      let buttonHTML = `<button class="btn button-light-${lead.status == 'Accepted' ? 'success' : 
                                                          lead.status == 'Pending' ? 'warning' : 
                                                          lead.status == 'Rejected' ? 'danger' : ''} txt-${lead.status == 'Accepted' ? 'success' : 
                                                            lead.status == 'Pending' ? 'warning' : 
                                                            lead.status == 'Rejected' ? 'danger' : ''} font-medium">${lead.status}</button>`;
                                                            
      formattedLead.status = this.sanitizer.bypassSecurityTrustHtml(buttonHTML);

      return formattedLead;
    });
  }
}
