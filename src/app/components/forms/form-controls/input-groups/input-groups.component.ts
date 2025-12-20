import { Component } from '@angular/core';

import { ButtonAddonsComponent } from "./button-addons/button-addons.component";
import { CustomFormsComponent } from "./custom-forms/custom-forms.component";
import { CustomFileInputComponent } from "./custom-file-input/custom-file-input.component";
import { ButtonDropdownComponent } from "./button-dropdown/button-dropdown.component";
import { SegmentButtonComponent } from "./segment-button/segment-button.component";
import { CheckboxAndRadioComponent } from "./checkbox-and-radio/checkbox-and-radio.component";
import { SizingComponent } from "./sizing/sizing.component";
import { MultipleInputComponent } from "./multiple-input/multiple-input.component";
import { BasicInputGroupComponent } from "./basic-input-group/basic-input-group.component";
import { VariationAddonsComponent } from "./variation-addons/variation-addons.component";

@Component({
  selector: 'app-input-groups',
  imports: [ButtonAddonsComponent, CustomFormsComponent, CustomFileInputComponent,
            ButtonDropdownComponent, SegmentButtonComponent, CheckboxAndRadioComponent,
            SizingComponent, MultipleInputComponent, BasicInputGroupComponent, VariationAddonsComponent],
  templateUrl: './input-groups.component.html',
  styleUrl: './input-groups.component.scss'
})

export class InputGroupsComponent {

}
