import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { numberBadgeList } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-number-badge-list',
  imports: [CardComponent],
  templateUrl: './number-badge-list.component.html',
  styleUrl: './number-badge-list.component.scss'
})

export class NumberBadgeListComponent {

  public numberBadgeList = numberBadgeList;

}
