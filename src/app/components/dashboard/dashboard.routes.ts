import {Routes} from "@angular/router";

import {DefaultComponent} from "./default/default.component";
import {OnlineCourseComponent} from './online-course/online-course.component';
import {CryptoComponent} from "./crypto/crypto.component";
import {NftComponent} from "./nft/nft.component";
import {ECommerceComponent} from "./e-commerce/e-commerce.component";
import {SocialComponent} from "./social/social.component";
import {SchoolManagementComponent} from './school-management/school-management.component';
import {PosComponent} from './pos/pos.component';
import {CrmComponent} from './crm/crm.component';
import {AnalyticsComponent} from './analytics/analytics.component';
import {HrComponent} from './hr/hr.component';
import {ProjectsComponent} from './projects/projects.component';
import {LogisticsComponent} from './logistics/logistics.component';
import {AccueilComponent} from "./accueil/accueil.component";

export const dashboard: Routes = [
    {
        path: 'tableau-de-bord',
        component: DefaultComponent,
        data: {
            pageTitle: "Tableau de bord",
            title: "Tableau de bord",
            breadcrumb: ""
        },
    },
    {
        path: 'statistique',
        component: CrmComponent,
        data: {
            pageTitle: "CRM Dashboard",
            title: "CRM",
            breadcrumb: "Statistiques"
        },
    },
    {
        path: 'accueil',
        component: AccueilComponent,
        data: {
            pageTitle: "Accueil",
            title: "Accueil",
            breadcrumb: "Accueil"
        }
    },
    {
        path: 'online-course',
        component: OnlineCourseComponent,
        data: {
            pageTitle: "Online course Dashboard",
            title: "Online course",
            breadcrumb: "Online course"
        },
    },
    {
        path: 'crypto',
        component: CryptoComponent,
        data: {
            pageTitle: "Crypto Dashboard",
            title: "Crypto",
            breadcrumb: "Crypto"
        },
    },
    {
        path: 'e-commerce',
        component: ECommerceComponent,
        data: {
            pageTitle: "E-Commerce Dashboard",
            title: "E-Commerce",
            breadcrumb: "E-Commerce"
        },
    },
    {
        path: 'social',
        component: SocialComponent,
        data: {
            pageTitle: "Social Dashboard",
            title: "Social",
            breadcrumb: "Social"
        },
    },
    {
        path: 'school-management',
        component: SchoolManagementComponent,
        data: {
            pageTitle: "School management Dashboard",
            title: "School management",
            breadcrumb: "School manage"
        }
    },
    {
        path: 'pos',
        component: PosComponent,
        data: {
            pageTitle: "POS Dashboard",
            title: "POS",
            breadcrumb: "POS"
        },
    },
    {
        path: 'analytics',
        component: AnalyticsComponent,
        data: {
            pageTitle: "Analytics Dashboard",
            title: "Analytics",
            breadcrumb: "Analytics"
        }
    },
    {
        path: 'hr',
        component: HrComponent,
        data: {
            pageTitle: "HR Dashboard",
            title: "HR Dashboard",
            breadcrumb: "HR Dashboard"
        },
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        data: {
            pageTitle: "Projects Dashboard",
            title: "Projects Dashboard",
            breadcrumb: "Projects Dashboard"
        }
    },{
        path: 'nft',
        component: NftComponent,
        data: {
            pageTitle: "Projects Dashboard",
            title: "Projects Dashboard",
            breadcrumb: "Projects Dashboard"
        }
    },
    {
        path: 'logistics',
        component: LogisticsComponent,
        data: {
            pageTitle: "Logistics Dashboard",
            title: "Logistics Dashboard",
            breadcrumb: "Logistics Dashboard"
        },
    },
]