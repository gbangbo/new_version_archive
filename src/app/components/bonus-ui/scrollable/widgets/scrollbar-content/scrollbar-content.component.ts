import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { scrollableContent } from '../../../../../shared/data/bonus-ui/scrollbar';

@Component({
  selector: 'app-scrollbar-content',
  imports: [NgScrollbarModule, CardComponent],
  templateUrl: './scrollbar-content.component.html',
  styleUrl: './scrollbar-content.component.scss'
})

export class ScrollbarContentComponent {

  public scrollableContent = scrollableContent;

}
