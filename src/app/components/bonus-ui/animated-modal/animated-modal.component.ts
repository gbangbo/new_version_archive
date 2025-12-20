import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { modalInValues, modalOutValues } from '../../../shared/data/bonus-ui/animated-modal';

@Component({
  selector: 'app-animated-modal',
  imports: [CommonModule,FormsModule, Select2Module, CardComponent],
  templateUrl: './animated-modal.component.html',
  styleUrl: './animated-modal.component.scss',
})
export class AnimatedModalComponent {
  
  public modalInValues = modalInValues;
  public modalOutValues = modalOutValues;
  public modalInSelectedValue = 'bounceIn';
  public modalOutSelectedValue = 'flipOutX';
  public toastVisible: boolean = false;
  public modalOpen: boolean = false
  public modalClass: string = ''

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  openModal() {
    this.modalOpen = true
    this.modalClass = this.modalInSelectedValue
  }

  closeModal() {
    this.modalClass = this.modalOutSelectedValue
    setTimeout(() => {
      this.modalOpen = false
    }, 1000);
  }

}
