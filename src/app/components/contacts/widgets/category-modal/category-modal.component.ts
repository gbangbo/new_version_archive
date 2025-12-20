import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-category-modal',
  imports: [],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})

export class CategoryModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false)
  }
}
