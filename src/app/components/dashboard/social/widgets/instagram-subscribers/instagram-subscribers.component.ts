import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { instagramSubscribers } from '../../../../../shared/data/dashboard/social';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-instagram-subscribers',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './instagram-subscribers.component.html',
  styleUrl: './instagram-subscribers.component.scss'
})

export class InstagramSubscribersComponent {

  public cardToggleOption = cardToggleOptions3;
  public instagramSubscribers = instagramSubscribers;

}
