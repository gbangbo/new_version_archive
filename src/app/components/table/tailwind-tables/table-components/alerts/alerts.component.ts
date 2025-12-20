import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-alerts',
  imports: [CommonModule,CardComponent],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})

export class AlertsComponent {

  public alertVisible1: boolean = true;
  public alertVisible2: boolean = true;

  closeAlert1() {
    this.alertVisible1 = false;
  }

  closeAlert2() {
    this.alertVisible2 = false;
  }

}
