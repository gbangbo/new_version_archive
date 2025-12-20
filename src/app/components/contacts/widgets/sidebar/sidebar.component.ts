import { Component, EventEmitter, Output } from '@angular/core';

import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { AddContactModalComponent } from '../add-contact-modal/add-contact-modal.component';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { contactSidebarList } from '../../../../shared/data/contacts';
import { user } from '../../../../shared/data/user';
import { ContactSidebarList } from '../../../../shared/interface/contacts';

@Component({
  selector: 'app-sidebar',
  imports: [FeatherIconComponent, AddContactModalComponent, CategoryModalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() currentTab = new EventEmitter();

  public contactSidebarList = contactSidebarList;
  public userDetails = user;
  public activeTab: string = contactSidebarList[0].value ? contactSidebarList[0].value : '';
  public sidebarOpen: boolean = false;
  public contactModalOpen: boolean = false;
  public tagModalOpen: boolean = false;

  ngOnInit() {
    if(this.activeTab) {
      this.currentTab.emit(contactSidebarList[0]);
    }
  }

  handleActiveTab(tab: ContactSidebarList) {
    if(tab.value){
      this.activeTab = tab.value;
      this.currentTab.emit(tab);
    }
  }

  openContactModal() {
    this.contactModalOpen = true;
  }

  openCategoryModal() {
    this.tagModalOpen = true;
  }

  toggleFilter() {
    this.sidebarOpen =! this.sidebarOpen;
  }
  
  handleOpenModal(value: boolean) {
    if(this.contactModalOpen) {
      this.contactModalOpen = value
    }

    if(this.tagModalOpen) {
      this.tagModalOpen = value
    }
  }
  
}
