import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { horizontalList } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-horizontal-list',
  imports: [CardComponent],
  templateUrl: './horizontal-list.component.html',
  styleUrl: './horizontal-list.component.scss'
})

export class HorizontalListComponent {

  public horizontalList = horizontalList;

}
