import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CardToggleOptions } from '../../../../interface/common';
import { OutsideDirective } from '../../../../directives/outside.directive';

@Component({
  selector: 'app-card-dropdown-button',
  imports: [CommonModule, OutsideDirective],
  templateUrl: './card-dropdown-button.component.html',
  styleUrl: './card-dropdown-button.component.scss'
})

export class CardDropdownButtonComponent {

  @Input() dropdownType: string;
  @Input() options: CardToggleOptions[];
  @Input() dropdownClass: string;

  public dropdownOpen: boolean = false;
  public selectedItem: string;

  ngOnChanges() {
    this.selectedItem = this.options[0]?.title;
  }

  toggleDropdown() {
    this.dropdownOpen =! this.dropdownOpen;
  }

  selectItem(value: string) {
    this.selectedItem = value;
    this.dropdownOpen = false;
  }

  clickOutside(): void {
    this.dropdownOpen = false;
  }
  
}
