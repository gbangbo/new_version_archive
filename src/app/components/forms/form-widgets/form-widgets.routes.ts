import { Routes } from '@angular/router';

import { DatepickerComponent } from './datepicker/datepicker.component';
import { TouchspinComponent } from './touchspin/touchspin.component';
import { Select2Component } from './select2/select2.component';
import { SwitchComponent } from './switch/switch.component';
import { ClipboardComponent } from './clipboard/clipboard.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

export const formWidgets: Routes = [
    {
        path: 'datepicker',
        component: DatepickerComponent,
        data: {
            title: "Datepicker",
            breadcrumb: "Datepicker",
        }
    },
    {
        path: 'touchspin',
        component: TouchspinComponent,
        data: {
            title: "Touchspin",
            breadcrumb: "Touchspin",
        }
    },
    {
        path: 'select2',
        component: Select2Component,
        data: {
            title: "Select2",
            breadcrumb: "Select2",
        }
    },
    {
        path: 'switch',
        component: SwitchComponent,
        data: {
            title: "Switch",
            breadcrumb: "Switch",
        }
    },
    {
        path: 'type-ahead',
        component: TypeaheadComponent,
        data: {
            title: "Typeahead",
            breadcrumb: "Typeahead",
        }
    },
    {
        path: 'clipboard',
        component: ClipboardComponent,
        data: {
            title: "Clipboard",
            breadcrumb: "Clipboard",
        }
    },
];