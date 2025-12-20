import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { iconsAlert } from '../../../../../shared/data/ui-kits/alert';

@Component({
  selector: 'app-icon-alert',
  imports: [CommonModule, CardComponent, FeatherIconComponent],
  templateUrl: './icon-alert.component.html',
  styleUrl: './icon-alert.component.scss'
})

export class IconAlertComponent {

  public iconsAlert = iconsAlert;

}
