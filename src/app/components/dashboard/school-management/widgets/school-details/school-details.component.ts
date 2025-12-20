import { Component, Input } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SchoolDetails } from '../../../../../shared/interface/dashboard/school-management';
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";

@Component({
  selector: 'app-school-details',
  imports: [CardComponent, CounterComponent],
  templateUrl: './school-details.component.html',
  styleUrl: './school-details.component.scss'
})

export class SchoolDetailsComponent {

  @Input() details: SchoolDetails;

}
