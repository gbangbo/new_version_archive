import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { facebookCampaign } from '../../../../../shared/data/dashboard/social';
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";

@Component({
  selector: 'app-facebook-campaign',
  imports: [CommonModule, CardComponent, CounterComponent],
  templateUrl: './facebook-campaign.component.html',
  styleUrl: './facebook-campaign.component.scss'
})

export class FacebookCampaignComponent {

  public facebookCampaign = facebookCampaign;
  public showImage: number = 5;

}
