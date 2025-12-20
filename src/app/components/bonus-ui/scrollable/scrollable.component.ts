import { Component } from '@angular/core';

import { CustomScrollbarComponent } from "./widgets/custom-scrollbar/custom-scrollbar.component";
import { SmallSizeScrollbarComponent } from "./widgets/small-size-scrollbar/small-size-scrollbar.component";
import { BadgeScrollbarComponent } from './widgets/badge-scrollbar/badge-scrollbar.component';
import { ProfileScrollbarComponent } from "./widgets/profile-scrollbar/profile-scrollbar.component";
import { ScrollbarContentComponent } from "./widgets/scrollbar-content/scrollbar-content.component";
import { HorizontalScrollbarComponent } from "./widgets/horizontal-scrollbar/horizontal-scrollbar.component";
import { BothSideScrollbarComponent } from "./widgets/both-side-scrollbar/both-side-scrollbar.component";

@Component({
  selector: 'app-scrollable',
  imports: [CustomScrollbarComponent, SmallSizeScrollbarComponent, BadgeScrollbarComponent,
            ProfileScrollbarComponent, ScrollbarContentComponent, HorizontalScrollbarComponent, 
            BothSideScrollbarComponent],
  templateUrl: './scrollable.component.html',
  styleUrl: './scrollable.component.scss'
})

export class ScrollableComponent {

}
