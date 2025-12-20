import { Component } from '@angular/core';

import { FlatButtonsComponent } from "./widgets/flat-buttons/flat-buttons.component";
import { DefaultsButtonsComponent } from "./widgets/defaults-buttons/defaults-buttons.component";
import { ButtonSizesComponent } from "./widgets/button-sizes/button-sizes.component";
import { OutlineButtonSizesComponent } from "./widgets/outline-button-sizes/outline-button-sizes.component";
import { RoundedButtonComponent } from "./widgets/rounded-button/rounded-button.component";
import { OutlineRoundedButtonComponent } from "./widgets/outline-rounded-button/outline-rounded-button.component";
import { RoundedSizesComponent } from "./widgets/rounded-sizes/rounded-sizes.component";
import { OutlineRoundedSizesComponent } from "./widgets/outline-rounded-sizes/outline-rounded-sizes.component";
import { DisableButtonComponent } from "./widgets/disable-button/disable-button.component";
import { IconsButtonComponent } from "./widgets/icons-button/icons-button.component";
import { IconWithTitleComponent } from "./widgets/icon-with-title/icon-with-title.component";
import { DashedBorderComponent } from "./widgets/dashed-border/dashed-border.component";
import { LoaderButtonComponent } from "./widgets/loader-button/loader-button.component";
import { RippleButtonComponent } from "./widgets/ripple-button/ripple-button.component";
import { ButtonGroupComponent } from "./widgets/button-group/button-group.component";
import { BlockLevelButtonComponent } from "./widgets/block-level-button/block-level-button.component";
import { ButtonVariationsComponent } from "./widgets/button-variations/button-variations.component";
import { BoldBorderOutlineButtonComponent } from "./widgets/bold-border-outline-button/bold-border-outline-button.component";
import { RadioCheckboxAnimatedButtonComponent } from "./widgets/radio-checkbox-animated-button/radio-checkbox-animated-button.component";
import { RadialButtonComponent } from "./widgets/radial-button/radial-button.component";

@Component({
  selector: 'app-button',
  imports: [FlatButtonsComponent, DefaultsButtonsComponent, ButtonSizesComponent,
            OutlineButtonSizesComponent, RoundedButtonComponent, OutlineRoundedButtonComponent,
            RoundedSizesComponent, OutlineRoundedSizesComponent, DisableButtonComponent,
            IconsButtonComponent, IconWithTitleComponent, DashedBorderComponent,
            LoaderButtonComponent, RippleButtonComponent, ButtonGroupComponent,
            BlockLevelButtonComponent, ButtonVariationsComponent, BoldBorderOutlineButtonComponent, 
            RadioCheckboxAnimatedButtonComponent, RadialButtonComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})

export class ButtonComponent {

}
