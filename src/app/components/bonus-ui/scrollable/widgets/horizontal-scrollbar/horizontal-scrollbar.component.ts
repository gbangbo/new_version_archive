import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { scrollableImages } from '../../../../../shared/data/bonus-ui/scrollbar';

@Component({
  selector: 'app-horizontal-scrollbar',
  imports: [NgScrollbarModule, CardComponent],
  templateUrl: './horizontal-scrollbar.component.html',
  styleUrl: './horizontal-scrollbar.component.scss'
})

export class HorizontalScrollbarComponent {

  public scrollableImages = scrollableImages;
  
}
