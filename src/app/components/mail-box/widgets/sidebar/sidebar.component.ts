import { Component, EventEmitter, Output } from '@angular/core';

import { AddLabelModalComponent } from '../../../../shared/components/ui/modal/add-label-modal/add-label-modal.component';
import { ComposeEmailModalComponent } from '../compose-email-modal/compose-email-modal.component';
import { SvgIconComponent } from "../../../../shared/components/ui/svg-icon/svg-icon.component";
import { emailSidebar, emailTags } from '../../../../shared/data/email';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent, ComposeEmailModalComponent, AddLabelModalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

  @Output() currentTab = new EventEmitter<string>();

  public emailSidebar = emailSidebar;
  public emailTags = emailTags;
  public activeTab = 'inbox';
  public emailModalOpen: boolean = false;
  public labelModalOpen: boolean = false;
  public sidebarOpen: boolean = false;

  ngOnInit() {
    this.currentTab.emit(this.activeTab);
  }

  handleTabChange(value: string) {
    this.activeTab = value;
    this.currentTab.emit(this.activeTab);
  }

  composeEmail(){
    this.emailModalOpen = true;
  }

  openLabelModal() {
    this.labelModalOpen = true;
  }

  handleModalOpen(value: boolean) {
    if(this.emailModalOpen) {
      this.emailModalOpen = value
    }

    if(this.labelModalOpen) {
      this.labelModalOpen = value
    }
  }
  
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
