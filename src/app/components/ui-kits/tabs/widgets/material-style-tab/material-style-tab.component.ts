import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-material-style-tab',
  imports: [CardComponent],
  templateUrl: './material-style-tab.component.html',
  styleUrl: './material-style-tab.component.scss'
})

export class MaterialStyleTabComponent {

  public activeTab = 'user';
  
  handleTab(value: string) {
    this.activeTab = value;
  }
}
