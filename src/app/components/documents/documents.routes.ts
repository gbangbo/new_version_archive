import {Routes} from "@angular/router";
import {CreerUnDocumentComponent} from "./creer-un-document/creer-un-document.component";


export const documents: Routes = [
    {
        path: 'creer-un-document',
        component: CreerUnDocumentComponent,
        data: {
            title: 'Ajouter un document',
            breadcrumb: 'Ajouter un document'
        }
    }
]