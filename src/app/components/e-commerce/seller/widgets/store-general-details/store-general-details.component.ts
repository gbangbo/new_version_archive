import { Component, Input } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { StoreGeneralDetails } from '../../../../../shared/interface/store';

@Component({
  selector: 'app-store-general-details',
  imports: [CardComponent, SvgIconComponent, CounterComponent],
  templateUrl: './store-general-details.component.html',
  styleUrl: './store-general-details.component.scss'
})

export class StoreGeneralDetailsComponent {

  @Input() details: StoreGeneralDetails;

}
