import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BarRatingModule } from 'ngx-bar-rating';

import { OutsideDirective } from '../../../../directives/outside.directive';

@Component({
  selector: 'app-review-modal',
  imports: [CommonModule, BarRatingModule, ReactiveFormsModule, OutsideDirective],
  templateUrl: './review-modal.component.html',
  styleUrl: './review-modal.component.scss'
})

export class ReviewModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();
  
  public rating = 4;
  public reviewForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    rating: new FormControl(this.rating ? this.rating : 0)
  })

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }

  submit() {
    this.reviewForm.markAllAsTouched();

    if(this.reviewForm.valid) {
      this.closeModal();
    }
  }
}
