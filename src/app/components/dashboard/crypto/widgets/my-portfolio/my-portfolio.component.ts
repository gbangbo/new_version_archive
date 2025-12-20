import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { myPortfolio } from '../../../../../shared/data/dashboard/crypto';

@Component({
  selector: 'app-my-portfolio',
  imports: [CommonModule, NgApexchartsModule, CardComponent, SvgIconComponent],
  templateUrl: './my-portfolio.component.html',
  styleUrl: './my-portfolio.component.scss'
})

export class MyPortfolioComponent {

  public myPortfolio = myPortfolio;

}
