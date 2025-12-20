import { Routes } from "@angular/router";

import { SitemapComponent } from "./sitemap.component";

export const siteMap: Routes = [
    {
        path: '',
        component: SitemapComponent,
        data: {
            title: 'Sitemap',
            breadcrumb: 'Sitemap'
        }
    }
]