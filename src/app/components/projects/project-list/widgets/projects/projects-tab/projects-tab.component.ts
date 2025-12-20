import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { projectTab } from '../../../../../../shared/data/project';

@Component({
  selector: 'app-projects-tab',
  imports: [RouterModule],
  templateUrl: './projects-tab.component.html',
  styleUrl: './projects-tab.component.scss'
})

export class ProjectsTabComponent {

  @Output() activeTabValue = new EventEmitter<string>();

  public projectTab = projectTab;
  public activeTab = projectTab[0].value;

  ngOnInit() {
    this.activeTabValue.emit(this.activeTab);
  }
  
  handleTab(value: string) {
    if(value) {
      this.activeTab = value;
      this.activeTabValue.emit(this.activeTab);
    }
  }
  
}
