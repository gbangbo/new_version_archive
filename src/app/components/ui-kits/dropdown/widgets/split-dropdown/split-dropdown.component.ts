import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { splitDropdown } from '../../../../../shared/data/ui-kits/dropdown';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-split-dropdown',
  imports: [OutsideDirective, CardComponent],
  templateUrl: './split-dropdown.component.html',
  styleUrl: './split-dropdown.component.scss'
})

export class SplitDropdownComponent {

  public splitDropdown = splitDropdown;
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
