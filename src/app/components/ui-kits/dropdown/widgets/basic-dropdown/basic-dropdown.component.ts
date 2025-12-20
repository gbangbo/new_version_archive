import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { basicDropdown } from '../../../../../shared/data/ui-kits/dropdown';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-basic-dropdown',
  imports: [OutsideDirective, CardComponent],
  templateUrl: './basic-dropdown.component.html',
  styleUrl: './basic-dropdown.component.scss'
})

export class BasicDropdownComponent {

  public basicDropdown = basicDropdown;
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
