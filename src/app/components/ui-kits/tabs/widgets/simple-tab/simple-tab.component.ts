import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-simple-tab',
  imports: [CardComponent],
  templateUrl: './simple-tab.component.html',
  styleUrl: './simple-tab.component.scss'
})

export class SimpleTabComponent {

  public activeTab = 'profile';
  
  handleTab(value: string) {
    this.activeTab = value;
  }
}
