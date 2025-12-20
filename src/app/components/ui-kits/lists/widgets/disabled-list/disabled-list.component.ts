import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { disabledLists } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-disabled-list',
  imports: [CardComponent],
  templateUrl: './disabled-list.component.html',
  styleUrl: './disabled-list.component.scss'
})

export class DisabledListComponent {

  public disabledLists = disabledLists;

}
