import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { numberList } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-list-number',
  imports: [CardComponent],
  templateUrl: './list-number.component.html',
  styleUrl: './list-number.component.scss'
})

export class ListNumberComponent {

  public numberList = numberList;

}
