import {Routes} from "@angular/router";
import {TrouverUnDoucmentComponent} from "./trouver-un-doucment/trouver-un-doucment.component";



export const voirdocuments: Routes = [
    {
        path: 'trouver-un-document',
         component: TrouverUnDoucmentComponent,
        data: {
            title: 'Trouver un document',
            breadcrumb: 'Trouver un document'
        }
    }
]