import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-website-analytics',
  imports: [RouterModule, CardComponent],
  templateUrl: './website-analytics.component.html',
  styleUrl: './website-analytics.component.scss'
})

export class WebsiteAnalyticsComponent {

}
