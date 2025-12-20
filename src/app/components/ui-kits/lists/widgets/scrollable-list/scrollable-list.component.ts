import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { scrollableList } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-scrollable-list',
  imports: [CardComponent],
  templateUrl: './scrollable-list.component.html',
  styleUrl: './scrollable-list.component.scss'
})

export class ScrollableListComponent {

  public scrollableList = scrollableList;

}
