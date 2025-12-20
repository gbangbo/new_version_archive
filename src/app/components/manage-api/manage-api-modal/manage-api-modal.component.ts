import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-api-modal',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-api-modal.component.html',
  styleUrl: './manage-api-modal.component.scss'
})

export class ManageApiModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  public validationForm = new FormGroup({
    api_name: new FormControl('', Validators.required),
    api_key: new FormControl('', Validators.required),
  })
  
  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  submitForm() {
    this.validationForm.markAllAsTouched();
    if (this.validationForm.valid) {
      this.closeModal()
    }
  }

  closeModal() {
    this.modalOpen.emit(false);
  }
  
}
