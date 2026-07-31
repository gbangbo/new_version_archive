import {Routes} from "@angular/router";
import {AbsenceComponent} from "./absence/absence.component";
import {InterimComponent} from "./interim/interim.component";
import {TypeAbsenceComponent} from "./type-absence/type-absence.component";
import {ValiderAbsenceComponent} from "./valider-absence/valider-absence.component";
import {DocPersoListeComponent} from "./doc-perso/doc-perso-liste/doc-perso-liste.component";
import {DocPersonnelComponent} from "./doc-perso/doc-personnel/doc-personnel.component";


export const rh: Routes = [
    {
        path: 'absence',
        component: AbsenceComponent,
        data: {
            title: 'Absence',
            breadcrumb: 'Absence'
        }
    }, {
        path: 'interim',
        component: InterimComponent,
        data: {
            title: 'Intérim',
            breadcrumb: 'Intérim'
        }
    },
    {
        path: 'type-absence',
        component: TypeAbsenceComponent,
        data: {
            title: `Type d'absence`,
            breadcrumb: `Type d'absence`
        }
    },
    {
        path: 'valider-absence',
        component: ValiderAbsenceComponent,
        data: {
            title: `Validation d'une absence`,
            breadcrumb: `Validation d'une absence`
        }
    },
    {
        path: 'doc-personnel',
        component: DocPersonnelComponent,
        data: {
            title: `Document du personnel`,
            breadcrumb: `Document du personnel`
        }
    },
    {
        path: 'doc-perso-liste',
        component: DocPersoListeComponent,
        data: {
            title: `Liste des documents du personnel`,
            breadcrumb: `Liste des documents du personnel`
        }
    }
]