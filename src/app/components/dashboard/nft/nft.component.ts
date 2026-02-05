import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingCreatorComponent } from "./widgets/trending-creator/trending-creator.component";
import { BannerComponent } from "./widgets/banner/banner.component";
import { WelcomeCardComponent } from './widgets/welcome-card/welcome-card.component';
import { IncomeChartComponent } from "./widgets/income-chart/income-chart.component";
import { ArtworksComponent } from "./widgets/artworks/artworks.component";
import { TrendingBidsComponent } from "./widgets/trending-bids/trending-bids.component";
import { LiveAuctionComponent } from "./widgets/live-auction/live-auction.component";
import { CreatorsComponent } from "./widgets/creators/creators.component";
import { CollectionsComponent } from "./widgets/collections/collections.component";
import { ArtworkTableComponent } from './widgets/artwork-table/artwork-table.component';
import { activityPanel } from '../../../shared/data/dashboard/nft';

@Component({
  selector: 'app-nft',
  imports: [CommonModule,
             LiveAuctionComponent,
             ],
  templateUrl: './nft.component.html',
  styleUrl: './nft.component.scss'
})
/*
WelcomeCardComponent
BannerComponent,
TrendingCreatorComponent,
 */
// ArtworksComponent,   , ArtworkTableComponent   CollectionsComponent  CreatorsComponent  IncomeChartComponent
export class NftComponent {

  public activityPanel = activityPanel;
  
}
