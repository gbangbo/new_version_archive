import { Component } from '@angular/core';

import { BasicFormComponent } from "./basic-form/basic-form.component";
import { FloatingFormComponent } from "./floating-form/floating-form.component";
import { SelectSizingComponent } from "./select-sizing/select-sizing.component";
import { FormControlSizingComponent } from "./form-control-sizing/form-control-sizing.component";
import { FileInputComponent } from "./file-input/file-input.component";
import { FlatInputStyleComponent } from "./flat-input-style/flat-input-style.component";
import { BasicHtmlInputControlComponent } from "./basic-html-input-control/basic-html-input-control.component";
import { BasicFloatingInputControlComponent } from "./basic-floating-input-control/basic-floating-input-control.component";
import { EdgesInputStyleComponent } from "./edges-input-style/edges-input-style.component";
import { RaiseInputStyleComponent } from "./raise-input-style/raise-input-style.component";
import { DynamicFormFieldComponent } from "./dynamic-form-field/dynamic-form-field.component";
import { AutoSizeTextareaComponent } from "./auto-size-textarea/auto-size-textarea.component";
import { MaxLengthElementsComponent } from "./max-length-elements/max-length-elements.component";

@Component({
  selector: 'app-base-input',
  imports: [BasicFormComponent, FloatingFormComponent, SelectSizingComponent,
            FormControlSizingComponent, FileInputComponent, FlatInputStyleComponent,
            BasicHtmlInputControlComponent, BasicFloatingInputControlComponent, EdgesInputStyleComponent,
            RaiseInputStyleComponent, DynamicFormFieldComponent, AutoSizeTextareaComponent,
            MaxLengthElementsComponent],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss'
})

export class BaseInputComponent {

}
