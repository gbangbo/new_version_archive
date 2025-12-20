import { Routes } from "@angular/router";

import { CalendarComponent } from "./calendar.component";

export const calendar: Routes = [
    {
        path: '',
        component: CalendarComponent,
        data: {
            title: 'Calender',
            breadcrumb: 'Calender'
        }
    }
]