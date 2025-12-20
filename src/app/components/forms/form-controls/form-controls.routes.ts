import { Routes } from '@angular/router';

import { FormValidationComponent } from './form-validation/form-validation.component';
import { BaseInputComponent } from './base-input/base-input.component';
import { CheckboxRadioComponent } from './checkbox-radio/checkbox-radio.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { MegaOptionsComponent } from './mega-options/mega-options.component';
import { InputMaskComponent } from './input-mask/input-mask.component';

export const formControls: Routes = [
    {
        path: 'form-validation',
        component: FormValidationComponent,
        data: {
            title: "Validation Form",
            breadcrumb: "Validation Form",
        }
    },
    {
        path: 'base-input',
        component: BaseInputComponent,
        data: {
            title: "Base Inputs",
            breadcrumb: "Base Inputs",
        }
    },
    {
        path: 'checkbox-radio',
        component: CheckboxRadioComponent,
        data: {
            title: "Checkbox & Radio",
            breadcrumb: "Checkbox-Radio",
        }
    },
    {
        path: 'input-groups',
        component: InputGroupsComponent,
        data: {
            title: "Input Groups",
            breadcrumb: "Input Groups",
        }
    },
    {
        path: 'input-mask',
        component: InputMaskComponent,
        data: {
            title: "Input Mask",
            breadcrumb: "Input Mask",
        }
    },
    {
        path: 'mega-options',
        component: MegaOptionsComponent,
        data: {
            title: "Mega Options",
            breadcrumb: "Mega Options",
        }
    },
];