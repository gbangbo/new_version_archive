import { Routes } from '@angular/router';

import { KnowledgeBaseComponent } from './knowledge-base.component';

export const knowledgeBase: Routes = [
    {
        path: '',
        component: KnowledgeBaseComponent,
        data: {
            title: 'Knowledgebase',
            breadcrumb: 'Knowledgebase'
        },
    }
];