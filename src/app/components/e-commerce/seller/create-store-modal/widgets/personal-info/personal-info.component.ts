import { Component } from '@angular/core';
import { Select2Data, Select2Module, Select2UpdateEvent } from 'ng-select2-component';

import { country } from '../../../../../../shared/data/country';

@Component({
  selector: 'app-personal-info',
  imports: [Select2Module],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})

export class PersonalInfoComponent {

  public country: Select2Data = country;
  public selectedCountry: any = null;
  public states: any[] = [];
  public selectedCity: any = null;
  public city: any[] = [];

  onCountryChange(event: Select2UpdateEvent) {
    const selectedCountryValue = event.value;
    this.selectedCountry = this.country.find(country => 'value' in country && country.value === selectedCountryValue);
    this.states = this.selectedCountry?.data || [];
  }

  onStateChange(event: Select2UpdateEvent) {
    const selectedCityValue = event.value;
    this.selectedCity = this.states.find(city=> 'value' in city && city.value === selectedCityValue);
    this.city = this.selectedCity?.data || [];
  }
  
}
