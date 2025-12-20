import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-arrow-tab',
  imports: [CardComponent],
  templateUrl: './arrow-tab.component.html',
  styleUrl: './arrow-tab.component.scss'
})

export class ArrowTabComponent {

  public activeTab = 'portfolio';
  
  handleTab(value: string) {
    this.activeTab = value;
  }
}
