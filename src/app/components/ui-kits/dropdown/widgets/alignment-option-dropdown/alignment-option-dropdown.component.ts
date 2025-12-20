import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-alignment-option-dropdown',
  imports: [CommonModule, OutsideDirective, CardComponent],
  templateUrl: './alignment-option-dropdown.component.html',
  styleUrl: './alignment-option-dropdown.component.scss'
})

export class AlignmentOptionDropdownComponent {

  public dropdownPlacementOne: string = 'right-0';
  public dropdownPlacementTwo: string = 'left-0';
  public dropdownOpen: { [key: number]: boolean } = {};

  constructor() {
    this.getPosition();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getPosition();
  }

  getPosition() {
    this.dropdownPlacementOne = window.innerWidth > 1200 ? 'right-0' : 'left-0';
    this.dropdownPlacementTwo = window.innerWidth > 1200 ? 'left-0' : 'right-0';
  }

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
