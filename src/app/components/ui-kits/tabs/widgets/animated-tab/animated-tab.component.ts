import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-animated-tab',
  imports: [CardComponent],
  templateUrl: './animated-tab.component.html',
  styleUrl: './animated-tab.component.scss'
})

export class AnimatedTabComponent {

  public activeTab = 'profile';
  
  handleTab(value: string) {
    this.activeTab = value;
  }
}
