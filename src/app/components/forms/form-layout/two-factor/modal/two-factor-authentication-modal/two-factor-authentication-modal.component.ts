import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { ScanQrCodeModalComponent } from '../scan-qr-code-modal/scan-qr-code-modal.component';

@Component({
  selector: 'app-two-factor-authentication-modal',
  imports: [ScanQrCodeModalComponent],
  templateUrl: './two-factor-authentication-modal.component.html',
  styleUrl: './two-factor-authentication-modal.component.scss'
})

export class TwoFactorAuthenticationModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  public qrModalOpen: boolean = false
  
  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }

  next(){
    this.qrModalOpen = true;
  }

  handleOpenQrModal(value: boolean) {
    this.qrModalOpen = value;
    this.modalOpen.emit(false);
  }
  
}
