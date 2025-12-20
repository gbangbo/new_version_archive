import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-background-pill-tab',
  imports: [CardComponent],
  templateUrl: './background-pill-tab.component.html',
  styleUrl: './background-pill-tab.component.scss'
})

export class BackgroundPillTabComponent {

  public activeTab = 'table';

  handleTab(value: string) {
    this.activeTab = value;
  }

}
