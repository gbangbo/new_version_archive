import { Component, Input } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { Details } from '../../../../../shared/interface/dashboard/default';

@Component({
  selector: 'app-details',
  imports: [CardComponent, SvgIconComponent, CounterComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent {

  @Input() details: Details;

}
