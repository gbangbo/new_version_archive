import { Component } from '@angular/core';
import { country } from '../../../../../shared/data/country';

import { Select2Module, Select2Data, Select2UpdateEvent } from 'ng-select2-component';

@Component({
  selector: 'app-information',
  imports: [Select2Module],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {

  public country: Select2Data = country;
  public selectedCountry: any = null;
  public states: any[] = [];

  onCountryChange(event: Select2UpdateEvent) {
    
    const selectedCountryValue = event.value;

    this.selectedCountry = this.country.find(country => 'value' in country && country.value === selectedCountryValue);

    this.states = this.selectedCountry?.data || [];
  }

}
