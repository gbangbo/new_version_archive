import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";

@Component({
  selector: 'app-outline-dark-light-alert',
  imports: [CommonModule, CardComponent, FeatherIconComponent],
  templateUrl: './outline-dark-light-alert.component.html',
  styleUrl: './outline-dark-light-alert.component.scss'
})

export class OutlineDarkLightAlertComponent {

  public alertVisible: { [key: number]: boolean } = { 
    1: true, 
    2: true,
    3: true,
    4: true 
  };

  closeAlert(index: number) {
    this.alertVisible[index] = false;
  }

}
