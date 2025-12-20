import {Routes} from "@angular/router";
import {TypeDeDocumentComponent} from "./type-de-document/type-de-document.component";


export const configuration: Routes = [
    {
        path: 'type-de-document',
        component: TypeDeDocumentComponent,
        data: {
            title: 'Type de document',
            breadcrumb: 'Type de document'
        }
    }
]