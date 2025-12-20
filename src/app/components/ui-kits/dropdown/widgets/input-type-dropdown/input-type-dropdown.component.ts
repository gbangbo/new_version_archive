import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-input-type-dropdown',
  imports: [OutsideDirective, CardComponent],
  templateUrl: './input-type-dropdown.component.html',
  styleUrl: './input-type-dropdown.component.scss'
})

export class InputTypeDropdownComponent {

  public dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen =! this.dropdownOpen;
  }

  clickOutside(): void {
    this.dropdownOpen = false;
  }

}
