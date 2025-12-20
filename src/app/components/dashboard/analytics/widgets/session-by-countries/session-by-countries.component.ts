import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { sessionByCountries } from '../../../../../shared/data/dashboard/analytics';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-session-by-countries',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './session-by-countries.component.html',
  styleUrl: './session-by-countries.component.scss'
})

export class SessionByCountriesComponent {

  public sessionByCountries = sessionByCountries;
  public cardToggleOption = cardToggleOptions3;

}
