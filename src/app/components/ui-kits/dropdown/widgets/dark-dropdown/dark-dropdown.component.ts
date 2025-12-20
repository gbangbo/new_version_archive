import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-dark-dropdown',
  imports: [OutsideDirective, CardComponent],
  templateUrl: './dark-dropdown.component.html',
  styleUrl: './dark-dropdown.component.scss'
})

export class DarkDropdownComponent {

  public dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen =! this.dropdownOpen;
  }

  clickOutside(): void {
    this.dropdownOpen = false;
  }

}
