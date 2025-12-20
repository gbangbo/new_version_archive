import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-heading-dropdown',
  imports: [OutsideDirective, CardComponent],
  templateUrl: './heading-dropdown.component.html',
  styleUrl: './heading-dropdown.component.scss'
})

export class HeadingDropdownComponent {

  public dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen =! this.dropdownOpen;
  }

  clickOutside(): void {
    this.dropdownOpen = false;
  }
}
