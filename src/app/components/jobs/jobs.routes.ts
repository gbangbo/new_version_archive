import { Routes } from '@angular/router';

import { CardViewComponent } from './card-view/card-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ApplyComponent } from './apply/apply.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CompaniesComponent } from './companies/companies.component';

export const jobSearch: Routes = [
    {
        path: 'cards-view',
        component: CardViewComponent,
        data: {
            title: 'Cards View',
            breadcrumb: 'Cards View',
        }
    },
    {
        path: 'list-view',
        component: ListViewComponent,
        data: {
            title: 'List View',
            breadcrumb: 'List View',
        }
    },
    {
        path: 'job-details',
        component: JobDetailsComponent,
        data: {
            title: 'Job Details',
            breadcrumb: 'Job Details',
        }
    },
    {
        path: 'candidates',
        component: CandidatesComponent,
        data: {
            title: 'Candidates',
            breadcrumb: 'Candidates',
        }
    },
    {
        path: 'companies',
        component: CompaniesComponent,
        data: {
            title: 'Companies',
            breadcrumb: 'Companies',
        }
    },
    {
        path: 'apply',
        component: ApplyComponent,
        data: {
            title: 'Apply',
            breadcrumb: 'Apply',
        }
    },

]