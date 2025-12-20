import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";

@Component({
  selector: 'app-dismiss-light-alert',
  imports: [CommonModule, CardComponent, FeatherIconComponent],
  templateUrl: './dismiss-light-alert.component.html',
  styleUrl: './dismiss-light-alert.component.scss'
})

export class DismissLightAlertComponent {

  public alertVisible: boolean = true;

  closeAlert() {
    this.alertVisible = false;
  }
  
}
