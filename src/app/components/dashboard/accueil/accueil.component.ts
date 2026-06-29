import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveAuctionComponent } from "./widgets/flash-info/live-auction.component";
import { activityPanel } from '../../../shared/data/dashboard/nft';
import {MesDocsComponent} from "./widgets/mes-docs/mes-docs.component";


@Component({
  selector: 'app-accueil',
  imports: [CommonModule,
    LiveAuctionComponent,MesDocsComponent
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})

export class AccueilComponent {

  public activityPanel = activityPanel;

}
