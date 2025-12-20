import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-scan-qr-code-modal',
  imports: [],
  templateUrl: './scan-qr-code-modal.component.html',
  styleUrl: './scan-qr-code-modal.component.scss'
})

export class ScanQrCodeModalComponent {

  @Output() qrModalOpen = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.qrModalOpen.emit(false);
  }
  
}
