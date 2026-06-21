import {Routes} from "@angular/router";
import {AbsenceComponent} from "./absence/absence.component";
import {InterimComponent} from "./interim/interim.component";
import {TypeAbsenceComponent} from "./type-absence/type-absence.component";
import {ValiderAbsenceComponent} from "./valider-absence/valider-absence.component";


export const rh: Routes = [
    {
        path: 'absence',
        component: AbsenceComponent,
        data: {
            title: 'Absence',
            breadcrumb: 'Absence'
        }
    } ,   {
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
    }
]