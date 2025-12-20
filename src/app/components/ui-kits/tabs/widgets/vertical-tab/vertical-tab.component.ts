import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-vertical-tab',
  imports: [CardComponent],
  templateUrl: './vertical-tab.component.html',
  styleUrl: './vertical-tab.component.scss'
})

export class VerticalTabComponent {

  public activeTab = 'components';
  
  handleTab(value: string) {
    this.activeTab = value;
  }

}
