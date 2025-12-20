import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-alerts-icon',
  imports: [CommonModule, CardComponent],
  templateUrl: './alerts-icon.component.html',
  styleUrl: './alerts-icon.component.scss'
})

export class AlertsIconComponent {

  public showWarningAlert = true;
  public showDangerAlert = true;

  closeWarningAlert() {
    this.showWarningAlert = false;
  }

  closeDangerAlert() {
    this.showDangerAlert = false;
  }

}
