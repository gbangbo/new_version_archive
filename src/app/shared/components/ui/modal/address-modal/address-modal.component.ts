import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Select2Data, Select2Module, Select2UpdateEvent } from 'ng-select2-component';

import { country } from '../../../../data/country';
import { OutsideDirective } from '../../../../directives/outside.directive';

@Component({
  selector: 'app-address-modal',
  imports: [Select2Module, OutsideDirective],
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.scss'
})

export class AddressModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  public country: Select2Data = country;
  public selectedCountry: any = null;
  public states: any[] = [];

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }

  onCountryChange(event: Select2UpdateEvent) {
    const selectedCountryValue = event.value;

    this.selectedCountry = this.country.find(country => 'value' in country && country.value === selectedCountryValue);

    this.states = this.selectedCountry?.data || [];
  }

}
