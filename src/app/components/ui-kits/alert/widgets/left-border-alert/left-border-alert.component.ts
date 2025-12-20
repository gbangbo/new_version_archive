import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';

@Component({
  selector: 'app-left-border-alert',
  imports: [CommonModule, CardComponent, FeatherIconComponent],
  templateUrl: './left-border-alert.component.html',
  styleUrl: './left-border-alert.component.scss'
})

export class LeftBorderAlertComponent {

  public alertVisible: { [key: number]: boolean } = { 
    1: true, 
    2: true,
    3: true,
  };

  closeAlert(index: number) {
    this.alertVisible[index] = false;
  }

}
