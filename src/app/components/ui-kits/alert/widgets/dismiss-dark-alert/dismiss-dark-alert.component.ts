import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";

@Component({
  selector: 'app-dismiss-dark-alert',
  imports: [CommonModule, CardComponent, FeatherIconComponent],
  templateUrl: './dismiss-dark-alert.component.html',
  styleUrl: './dismiss-dark-alert.component.scss'
})

export class DismissDarkAlertComponent {

  public alertVisible: boolean = true;

  closeAlert() {
    this.alertVisible = false;
  }

}
