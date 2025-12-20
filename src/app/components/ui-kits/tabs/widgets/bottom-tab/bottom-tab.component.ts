import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-bottom-tab',
  imports: [CardComponent],
  templateUrl: './bottom-tab.component.html',
  styleUrl: './bottom-tab.component.scss'
})

export class BottomTabComponent {

  public activeTab = 'vendors';
  
  handleTab(value: string) {
    this.activeTab = value;
  }
}
