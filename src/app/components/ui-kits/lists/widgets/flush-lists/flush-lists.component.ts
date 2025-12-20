import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { flushList } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-flush-lists',
  imports: [CardComponent],
  templateUrl: './flush-lists.component.html',
  styleUrl: './flush-lists.component.scss'
})

export class FlushListsComponent {

  public flushList = flushList;

}
