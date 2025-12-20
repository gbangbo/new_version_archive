import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { defaultList } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-default-lists',
  imports: [CardComponent],
  templateUrl: './default-lists.component.html',
  styleUrl: './default-lists.component.scss'
})

export class DefaultListsComponent {

  public defaultList = defaultList;

}
