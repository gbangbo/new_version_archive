import {Routes} from "@angular/router";
import {AccueilComponent} from "./accueil.component";



export const accueilRoutes: Routes = [
    {
        path: '',
        component: AccueilComponent,
        data: {
            pageTitle: "Tableau de bord",
            title: "Tableau de bord",
            breadcrumb: ""
        },
    }
]