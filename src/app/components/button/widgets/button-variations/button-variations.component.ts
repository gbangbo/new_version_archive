import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { horizontalVariationCheckbox, verticalVariationColor, verticalVariationRadio } from '../../../../shared/data/buttons';
import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-button-variations',
  imports: [CommonModule, OutsideDirective,CardComponent],
  templateUrl: './button-variations.component.html',
  styleUrl: './button-variations.component.scss'
})

export class ButtonVariationsComponent {

  public verticalVariationColor = verticalVariationColor;
  public verticalVariationRadio = verticalVariationRadio;
  public horizontalVariationCheckbox = horizontalVariationCheckbox;

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
