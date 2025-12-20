import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-icon-tab',
  imports: [CardComponent],
  templateUrl: './icon-tab.component.html',
  styleUrl: './icon-tab.component.scss'
})

export class IconTabComponent {

  public activeTab = 'home';

  handleTab(value: string) {
    this.activeTab = value;
  }
}
