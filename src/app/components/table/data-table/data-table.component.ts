import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../shared/components/ui/table/table.component";
import { country } from '../../../shared/data/data-table';
import { TableConfigs } from '../../../shared/interface/common';
import { Country } from '../../../shared/interface/data-table';

@Component({
  selector: 'app-data-table',
  imports: [TableComponent, CardComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})

export class DataTableComponent {

  public country = country;
  
  public tableConfig: TableConfigs = {
    columns: [
      { title: '#', field_value: 'id', sort: true },
      { title: 'Country', field_value: 'country_name', sort: true },
      { title: 'Area', field_value: 'area', sort: true },
      { title: 'Population', field_value: 'population', sort: true },
    ],
    data: [] as Country[]
  };
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.tableConfig.data = country.map((country: Country) => {
      const formattedCountry = { ...country };
      const html = `<img src="https://upload.wikimedia.org/wikipedia/commons/${country.flag}"	
                       [alt]="'The flag of '${country.country_name}" 
                      class="me-2" 
                     style="width:20px"/> ${country.country_name}`;
                     
      formattedCountry.country_name = this.sanitizer.bypassSecurityTrustHtml(html)

      return formattedCountry;
    });
  }
}
