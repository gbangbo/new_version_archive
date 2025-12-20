import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomSwitchComponent } from "./custom-switch/custom-switch.component";
import { DisabledOutlineSwitchComponent } from "./disabled-outline-switch/disabled-outline-switch.component";
import { VariationSwitchComponent } from "./variation-switch/variation-switch.component";
import { SwitchSizingComponent } from "./switch-sizing/switch-sizing.component";
import { SwitchWithIconsComponent } from "./switch-with-icons/switch-with-icons.component";
import { CommonSwitchComponent } from "./common-switch/common-switch.component";
import { commonSwitch } from '../../../../shared/data/form-widgets';

@Component({
  selector: 'app-switch',
  imports: [CommonModule, CustomSwitchComponent, DisabledOutlineSwitchComponent, VariationSwitchComponent,
            SwitchSizingComponent, SwitchWithIconsComponent, CommonSwitchComponent],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})

export class SwitchComponent {

  public commonSwitch = commonSwitch;

}
