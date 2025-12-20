import { Routes } from '@angular/router';

import { MdeEditorComponent } from './mde-editor/mde-editor.component';
import { NgxEditorComponent } from './ngx-editor/ngx-editor.component';

export const editor: Routes = [
    {
        path: 'ngx-editors',
        component: NgxEditorComponent,
        data: {
            title: 'Ngx Editor',
            breadcrumb: 'Ngx Editor'
        }
    },
    {
        path: 'mde-editors',
        component: MdeEditorComponent   ,
        data: {
            title: 'MDE Editor',
            breadcrumb: 'MDE Editor'
        }
    }  
]