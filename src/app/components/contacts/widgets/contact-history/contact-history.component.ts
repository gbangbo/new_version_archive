import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contact-history',
  imports: [],
  templateUrl: './contact-history.component.html',
  styleUrl: './contact-history.component.scss'
})

export class ContactHistoryComponent {

  @Output() history = new EventEmitter();

  closeHistory() {
    this.history.emit(false);
  }
  
}
