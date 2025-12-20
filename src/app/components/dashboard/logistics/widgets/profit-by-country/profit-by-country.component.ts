import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { profitByCountry } from '../../../../../shared/data/dashboard/logistics';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-profit-by-country',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './profit-by-country.component.html',
  styleUrl: './profit-by-country.component.scss'
})

export class ProfitByCountryComponent {

  public cardToggleOption = cardToggleOptions3;
  public profitByCountry = profitByCountry;
  
}
