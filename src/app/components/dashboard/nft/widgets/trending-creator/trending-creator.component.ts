import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { trendingCreator } from '../../../../../shared/data/dashboard/nft';

@Component({
  selector: 'app-trending-creator',
  imports: [RouterModule, CardComponent],
  templateUrl: './trending-creator.component.html',
  styleUrl: './trending-creator.component.scss'
})

export class TrendingCreatorComponent {

  public trendingCreator = trendingCreator;

}
