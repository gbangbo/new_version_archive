import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-ui-components',
  imports: [CardComponent],
  templateUrl: './ui-components.component.html',
  styleUrl: './ui-components.component.scss'
})

export class UiComponentsComponent {

  public open: boolean = false;

  openMenu(){
    this.open =!this.open;
  }

}
