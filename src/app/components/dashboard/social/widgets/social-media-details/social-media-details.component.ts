import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SocialMediaDetails } from '../../../../../shared/interface/dashboard/social';
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";

@Component({
  selector: 'app-social-media-details',
  imports: [CommonModule, NgApexchartsModule, CardComponent, CounterComponent],
  templateUrl: './social-media-details.component.html',
  styleUrl: './social-media-details.component.scss'
})

export class SocialMediaDetailsComponent {

  @Input() details: SocialMediaDetails;

}
