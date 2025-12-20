import { Routes } from '@angular/router';

import { FlagIconComponent } from './flag-icon/flag-icon.component';
import { FontAwesomeIconComponent } from './font-awesome-icon/font-awesome-icon.component';
import { IcoIconComponent } from './ico-icon/ico-icon.component';
import { ThemifyIconComponent } from './themify-icon/themify-icon.component';
import { FeatherIconsComponent } from './feather-icon/feather-icon.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';

export const icons: Routes = [
    {
        path: 'flag-icon',
        component: FlagIconComponent,
        data: {
            title: "Flag Icons",
            breadcrumb: "Flag Icons",
        }
    },
    {
        path: 'font-awesome-icon',
        component: FontAwesomeIconComponent,
        data: {
            title: "Fontawesome Icon",
            breadcrumb: "Fontawesome Icon",
        }
    },
    {
        path: 'ico-icon',
        component: IcoIconComponent,
        data: {
            title: "ICO Icon",
            breadcrumb: "Ico Icon",
        }
    },
    {
        path: 'thimify-icon',
        component: ThemifyIconComponent,
        data: {
            title: "Themify Icon",
            breadcrumb: "Themify Icon",
        }
    },
    {
        path: 'feather-icon',
        component: FeatherIconsComponent,
        data: {
            title: "Feather Icons",
            breadcrumb: "Feather Icon",
        }
    },
    {
        path: 'weather-icon',
        component: WeatherIconComponent,
        data: {
            title: "Weather Icon",
            breadcrumb: "Weather Icon",
        }
    },
]