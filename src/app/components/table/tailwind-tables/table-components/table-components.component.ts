import { Component } from '@angular/core';

import { UiComponentsComponent } from "./ui-components/ui-components.component";
import { AlertsComponent } from "./alerts/alerts.component";
import { ProgressbarComponent } from "./progressbar/progressbar.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { RadioButtonComponent } from "./radio-button/radio-button.component";
import { SelectComponent } from "./select/select.component";
import { InputComponent } from "./input/input.component";
import { BadgesComponent } from "./badges/badges.component";
import { TooltipTriggersComponent } from "./tooltip-triggers/tooltip-triggers.component";
import { SwitchComponent } from "./switch/switch.component";

@Component({
  selector: 'app-table-components',
  imports: [UiComponentsComponent, AlertsComponent, ProgressbarComponent,
            CheckboxComponent, RadioButtonComponent, SelectComponent,
            InputComponent, BadgesComponent, TooltipTriggersComponent, SwitchComponent],
  templateUrl: './table-components.component.html',
  styleUrl: './table-components.component.scss'
})

export class TableComponentsComponent {

}
