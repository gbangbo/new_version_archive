import {Routes} from "@angular/router";
import {OngletComponent} from "./onglet/onglet.component";
import {TypeObjetComponent} from "./type-objet/type-objet.component";
import {TypeObjetMenuComponent} from "./type-objet-menu/type-objet-menu.component";


export const menuRoutes: Routes = [
    {
        path: 'onglet',
        component: OngletComponent,
        data: {
            title: 'Onglet',
            breadcrumb: 'Onglet'
        }
    },
    {
        path: 'type-objet',
        component: TypeObjetComponent,
        data: {
            title: 'Actions',
            breadcrumb: 'Actions'
        }
    },
    {
        path: 'actions-par-menu',
        component: TypeObjetMenuComponent,
        data: {
            title: 'Actions par menu',
            breadcrumb: 'Actions par menu'
        }
    }
]