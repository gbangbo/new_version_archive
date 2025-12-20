import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-pills-tab',
  imports: [CardComponent],
  templateUrl: './pills-tab.component.html',
  styleUrl: './pills-tab.component.scss'
})

export class PillsTabComponent {

  public activeTab = 'blog';
  
  handleTab(value: string) {
    this.activeTab = value;
  }
}
