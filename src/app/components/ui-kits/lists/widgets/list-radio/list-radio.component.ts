import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { radioList } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-list-radio',
  imports: [CardComponent],
  templateUrl: './list-radio.component.html',
  styleUrl: './list-radio.component.scss'
})

export class ListRadioComponent {

  public radioList = radioList;

}
