import {Routes} from "@angular/router";
import {TypeDeDocumentComponent} from "./type-de-document/type-de-document.component";
import {SiteRayonBoiteComponent} from "./site-rayon-boite/site-rayon-boite.component";
import {ConsignePrioriteComponent} from "./consigne-priorite/consigne-priorite.component";


export const configuration: Routes = [
    {
        path: 'type-de-document',
        component: TypeDeDocumentComponent,
        data: {
            title: 'Type de document',
            breadcrumb: 'Type de document'
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
    }
]