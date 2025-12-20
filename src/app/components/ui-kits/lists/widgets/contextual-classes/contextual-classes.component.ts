import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { contextualClassList } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-contextual-classes',
  imports: [CardComponent],
  templateUrl: './contextual-classes.component.html',
  styleUrl: './contextual-classes.component.scss'
})

export class ContextualClassesComponent {

  public contextualClassList = contextualClassList;

}
