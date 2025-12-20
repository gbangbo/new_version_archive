import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from '../../../../../shared/components/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-custom-alert',
  imports: [CommonModule, CardComponent, SvgIconComponent],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.scss'
})

export class CustomAlertComponent {

  public alertVisible: boolean = true;

  closeAlert() {
    this.alertVisible = false;
  }
  
}
