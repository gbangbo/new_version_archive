import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-helper-cards',
  imports: [OutsideDirective, CardComponent],
  templateUrl: './helper-cards.component.html',
  styleUrl: './helper-cards.component.scss'
})

export class HelperCardsComponent {

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
