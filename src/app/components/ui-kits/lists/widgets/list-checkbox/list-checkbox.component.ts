import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { checkboxList } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-list-checkbox',
  imports: [CardComponent],
  templateUrl: './list-checkbox.component.html',
  styleUrl: './list-checkbox.component.scss'
})

export class ListCheckboxComponent {

  public checkboxList = checkboxList;

}
