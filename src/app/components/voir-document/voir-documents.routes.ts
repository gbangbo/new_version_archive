import {Routes} from "@angular/router";
import {TrouverUnDoucmentComponent} from "./trouver-un-doucment/trouver-un-doucment.component";
import {PreViewDocComponent} from "./pre-view-doc/pre-view-doc.component";



export const voirdocuments: Routes = [
    {
        path: 'trouver-un-document',
         component: TrouverUnDoucmentComponent,
        data: {
            title: 'Trouver un document',
            breadcrumb: 'Trouver un document'
        }
    },
    {
        path: 'previsualisation',
        component: PreViewDocComponent,
        data: {
            title: 'Prévisualiser',
            breadcrumb: 'Prévisualiser'
        }
    }
]