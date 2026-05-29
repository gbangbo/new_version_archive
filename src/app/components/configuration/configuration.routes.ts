import {Routes} from "@angular/router";
import {TypeDeDocumentComponent} from "./type-de-document/type-de-document.component";
import {SiteRayonBoiteComponent} from "./site-rayon-boite/site-rayon-boite.component";
import {ConsignePrioriteComponent} from "./consigne-priorite/consigne-priorite.component";
import {PlanDeClassementComponent} from "./plan-de-classement/plan-de-classement.component";
import {CategorieComponent} from "./categorie/categorie.component";


export const configuration: Routes = [
    {
        path: 'type-de-document',
        component: TypeDeDocumentComponent,
        data: {
            title: 'Inventaire et calendrier de conservation',
            breadcrumb: 'Inventaire et calendrier de conservation'
        }
    }, {
        path: 'plan-de-classement',
        component: PlanDeClassementComponent,
        data: {
            title: 'Plan de classement',
            breadcrumb: 'Plan de classement'
        }
    },
    {
        path: 'site-rayon-boite',
        component: SiteRayonBoiteComponent,
        data: {
            title: 'Site - Rayon - Boite d\'archivage',
            breadcrumb: 'Site - Rayon - Boite d\'archivage'
        }
    },
    {
        path: 'consigne-priorite',
        component: ConsignePrioriteComponent,
        data: {
            title: 'Consigne & Priorité',
            breadcrumb: 'Consigne & Priorité'
        }
    },
    {
        path: 'workflow',
        component: ConsignePrioriteComponent,
        data: {
            title: 'Workflow',
            breadcrumb: 'Workflow'
        }
    },
    {
        path: 'categorie',
        component: CategorieComponent,
        data: {
            title: 'Série',
            breadcrumb: 'Série'
        }
    }
]