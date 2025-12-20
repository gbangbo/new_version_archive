import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { CardDropdownButtonComponent } from "../../../../../shared/components/ui/card/card-dropdown-button/card-dropdown-button.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { LastMonthDetails } from '../../../../../shared/interface/widgets/general';

@Component({
  selector: 'app-last-month-details',
  imports: [CommonModule, SvgIconComponent, CardDropdownButtonComponent, CounterComponent],
  templateUrl: './last-month-details.component.html',
  styleUrl: './last-month-details.component.scss'
})

export class LastMonthDetailsComponent {

  @Input() details: LastMonthDetails;

  public cardToggleOption = cardToggleOptions1;

}
