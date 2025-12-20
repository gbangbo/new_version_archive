import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-border-tab',
  imports: [CardComponent],
  templateUrl: './border-tab.component.html',
  styleUrl: './border-tab.component.scss'
})

export class BorderTabComponent {

  public activeTab = 'inbox';
  
  handleTab(value: string) {
    this.activeTab = value;
  }
}
