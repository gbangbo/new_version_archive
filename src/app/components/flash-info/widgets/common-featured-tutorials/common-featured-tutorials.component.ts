import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

import { featuredTutorialDetails } from '../../../../shared/data/knowledge-base';

@Component({
  selector: 'app-common-featured-tutorials',
  imports: [CommonModule, BarRatingModule],
  templateUrl: './common-featured-tutorials.component.html',
  styleUrl: './common-featured-tutorials.component.scss'
})

export class CommonFeaturedTutorialsComponent {

  @Input() details = featuredTutorialDetails;
  @Input() headerTitle: string = '';

}
