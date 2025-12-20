import { Component } from '@angular/core';

import { LinkLightThemeComponent } from "./widgets/link-light-theme/link-light-theme.component";
import { LinkDarkThemeComponent } from "./widgets/link-dark-theme/link-dark-theme.component";
import { OutlineDarkLightAlertComponent } from "./widgets/outline-dark-light-alert/outline-dark-light-alert.component";
import { AlertsIconComponent } from "./widgets/alerts-icon/alerts-icon.component";
import { LiveAlertComponent } from "./widgets/live-alert/live-alert.component";
import { DismissLightAlertComponent } from "./widgets/dismiss-light-alert/dismiss-light-alert.component";
import { DismissDarkAlertComponent } from "./widgets/dismiss-dark-alert/dismiss-dark-alert.component";
import { LeftBorderAlertComponent } from "./widgets/left-border-alert/left-border-alert.component";
import { CustomAlertComponent } from "./widgets/custom-alert/custom-alert.component";
import { IconAlertComponent } from "./widgets/icon-alert/icon-alert.component";
import { AdditionalContentComponent } from "./widgets/additional-content/additional-content.component";

@Component({
  selector: 'app-alert',
  imports: [LinkLightThemeComponent, LinkDarkThemeComponent, OutlineDarkLightAlertComponent,
            AlertsIconComponent, LiveAlertComponent, DismissLightAlertComponent,
            DismissDarkAlertComponent, LeftBorderAlertComponent, CustomAlertComponent,
            IconAlertComponent, AdditionalContentComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})

export class AlertComponent {

}
