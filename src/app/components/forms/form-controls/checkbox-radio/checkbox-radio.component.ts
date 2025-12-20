import { Component } from '@angular/core';

import { DefaultCheckboxComponent } from "./default-checkbox/default-checkbox.component";
import { CustomCheckboxComponent } from "./custom-checkbox/custom-checkbox.component";
import { DefaultRadioButtonComponent } from "./default-radio-button/default-radio-button.component";
import { ImageCheckboxComponent } from "./image-checkbox/image-checkbox.component";
import { ImageRadioComponent } from "./image-radio/image-radio.component";
import { CustomRadioButtonComponent } from "./custom-radio-button/custom-radio-button.component";
import { DefaultSwitchComponent } from "./default-switch/default-switch.component";
import { InlineInputTypesComponent } from "./inline-input-types/inline-input-types.component";
import { AnimatedButtonComponent } from "./animated-button/animated-button.component";
import { BasicRadioCheckboxComponent } from "./basic-radio-checkbox/basic-radio-checkbox.component";
import { RadioToggleButtonComponent } from "./radio-toggle-button/radio-toggle-button.component";
import { OutlineCheckboxStyleComponent } from "./outline-checkbox-style/outline-checkbox-style.component";

@Component({
  selector: 'app-checkbox-radio',
  imports: [DefaultCheckboxComponent, CustomCheckboxComponent, DefaultRadioButtonComponent,
            ImageCheckboxComponent, ImageRadioComponent, CustomRadioButtonComponent,
            DefaultSwitchComponent, InlineInputTypesComponent, AnimatedButtonComponent,
            BasicRadioCheckboxComponent, RadioToggleButtonComponent, OutlineCheckboxStyleComponent],
  templateUrl: './checkbox-radio.component.html',
  styleUrl: './checkbox-radio.component.scss'
})

export class CheckboxRadioComponent {

}
