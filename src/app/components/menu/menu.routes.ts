import {Routes} from "@angular/router";
import {OngletComponent} from "./onglet/onglet.component";


export const menuRoutes: Routes = [
    {
        path: 'onglet',
        component: OngletComponent,
        data: {
            title: 'Onglet',
            breadcrumb: 'Onglet'
        }
    }
]