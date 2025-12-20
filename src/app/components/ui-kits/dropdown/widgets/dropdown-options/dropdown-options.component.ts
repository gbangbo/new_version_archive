import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-dropdown-options',
  imports: [CardComponent,OutsideDirective],
  templateUrl: './dropdown-options.component.html',
  styleUrl: './dropdown-options.component.scss'
})
export class DropdownOptionsComponent {

  public dropdownOpen: { [key: number]: boolean } = {};

  toggleDropdown(index: number) {
    if (this.dropdownOpen[index]) {
      this.dropdownOpen[index] = false;
    } else {
      Object.keys(this.dropdownOpen).forEach(key => {
        this.dropdownOpen[+key] = false;
      });
  
      this.dropdownOpen[index] = true;
    }
  }

  clickOutside(index: number): void {
    this.dropdownOpen[index] = false;
  }

}
