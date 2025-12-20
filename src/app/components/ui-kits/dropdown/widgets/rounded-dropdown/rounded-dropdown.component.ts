import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { roundedDropdown } from '../../../../../shared/data/ui-kits/dropdown';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-rounded-dropdown',
  imports: [OutsideDirective, TitleCasePipe, CardComponent],
  templateUrl: './rounded-dropdown.component.html',
  styleUrl: './rounded-dropdown.component.scss'
})

export class RoundedDropdownComponent {

  public roundedDropdown = roundedDropdown;
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
