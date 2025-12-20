import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { balanceDetails } from '../../../../../shared/data/dashboard/crypto';

@Component({
  selector: 'app-balance',
  imports: [RouterModule, CommonModule, CardComponent, FeatherIconComponent, SvgIconComponent, CounterComponent],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss'
})
export class BalanceComponent {

  public balanceDetails = balanceDetails;

}
