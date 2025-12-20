import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { activeLists } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-active-lists',
  imports: [CommonModule, CardComponent],
  templateUrl: './active-lists.component.html',
  styleUrl: './active-lists.component.scss'
})

export class ActiveListsComponent {

  public activeLists = activeLists;

}
