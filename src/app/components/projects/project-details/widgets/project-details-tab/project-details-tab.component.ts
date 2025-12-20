import { Component, EventEmitter, Output } from '@angular/core';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { projectDetailsTab } from '../../../../../shared/data/project';

@Component({
  selector: 'app-project-details-tab',
  imports: [SvgIconComponent, CardComponent],
  templateUrl: './project-details-tab.component.html',
  styleUrl: './project-details-tab.component.scss'
})

export class ProjectDetailsTabComponent {

  @Output() handleActiveTab = new EventEmitter<string>();

  public projectDetailsTab = projectDetailsTab;
  public activeTab: string = projectDetailsTab[0].value;

  ngOnInit() {
    this.handleActiveTab.emit(this.activeTab);
  }

  changeTab(value: string) {
    this.activeTab = value;
    this.handleActiveTab.emit(this.activeTab);
  }
  
}
