import { Component, HostListener } from '@angular/core';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-profile-modal',
  imports: [OutsideDirective, SvgIconComponent],
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.scss'
})

export class ProfileModalComponent {

  public modalOpen: boolean = false

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  openModal() {
    this.modalOpen = true
  }

  closeModal() {
    this.modalOpen = false
  }
  
}
