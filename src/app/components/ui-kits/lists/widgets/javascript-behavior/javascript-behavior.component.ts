import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { jsBehaviorTabs } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-javascript-behavior',
  imports: [CommonModule, CardComponent],
  templateUrl: './javascript-behavior.component.html',
  styleUrl: './javascript-behavior.component.scss'
})

export class JavascriptBehaviorComponent {

  public jsBehaviorTabs  = jsBehaviorTabs;

  public activeTab = "home";

  handleTab(value: string) {
    this.activeTab = value;
  }

}
