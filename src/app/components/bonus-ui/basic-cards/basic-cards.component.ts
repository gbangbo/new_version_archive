import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BasicCardComponent } from "./widgets/basic-card/basic-card.component";
import { FlatCardComponent } from "./widgets/flat-card/flat-card.component";
import { ShadowCardComponent } from "./widgets/shadow-card/shadow-card.component";
import { IconHeadingComponent } from "./widgets/icon-heading/icon-heading.component";
import { DarkColorCardComponent } from "./widgets/dark-color-card/dark-color-card.component";
import { InfoCardComponent } from "./widgets/info-card/info-card.component";
import { list } from '../../../shared/data/bonus-ui/draggable-card';

@Component({
  selector: 'app-basic-cards',
  imports: [CommonModule, BasicCardComponent, FlatCardComponent, ShadowCardComponent,
            IconHeadingComponent, DarkColorCardComponent,InfoCardComponent],
  templateUrl: './basic-cards.component.html',
  styleUrl: './basic-cards.component.scss'
})

export class BasicCardsComponent {

  public infoCard = list;

}
