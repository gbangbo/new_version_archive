import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

import { JobCard } from '../../../shared/interface/jobs';

@Component({
  selector: 'app-common-card',
  imports: [CommonModule, BarRatingModule],
  templateUrl: './common-card.component.html',
  styleUrl: './common-card.component.scss'
})

export class CommonCardComponent {

  @Input() jobCard: JobCard;

}
