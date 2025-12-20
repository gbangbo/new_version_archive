import {Routes} from "@angular/router";
import {SocieteComponent} from "./societe/societe.component";
import {DirectionComponent} from "./direction/direction.component";
import {DepartementComponent} from "./departement/departement.component";
import {ServicesComponent} from "./services/services.component";
import {QualificationComponent} from "./qualification/qualification.component";


export const entites: Routes = [
    {
        path: 'societe',
        component: SocieteComponent,
        data: {
            title: 'Société',
            breadcrumb: 'Société'
        }
    },
    {
        path: 'direction',
        component: DirectionComponent,
        data: {
            title: 'Direction',
            breadcrumb: 'Direction'
        }
    },
    {
        path: 'departement',
        component: DepartementComponent,
        data: {
            title: 'Département',
            breadcrumb: 'Département'
        }
    },
    {
        path: 'services',
        component: ServicesComponent,
        data: {
            title: 'Services',
            breadcrumb: 'Services'
        }
    },
    {
        path: 'qualification',
        component: QualificationComponent,
        data: {
            title: 'Qualification',
            breadcrumb: 'Qualification'
        }
    },

]