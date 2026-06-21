import {Routes} from "@angular/router";
import {CreerUnDocumentComponent} from "./creer-un-document/creer-un-document.component";
import {ScannerComponent} from "./scanner/scanner.component";
import {MesDocumentsComponent} from "./mes-documents/mes-documents.component";
import {ClasserDocumentComponent} from "./classer-document/classer-document.component";


export const documents: Routes = [
    {
        path: 'creer-un-document',
        component: CreerUnDocumentComponent,
        data: {
            title: 'Ajouter un document',
            breadcrumb: 'Ajouter un document'
        }
    },
    {
        path: 'mes-documents',
        component: MesDocumentsComponent,
        data: {
            title: 'Mes documents',
            breadcrumb: 'Mes documents'
        }
    },
    {
        path: 'scan-document',
        component: ScannerComponent,
        data: {
            title: 'Scanner un documents',
            breadcrumb: 'Scanner un documents'
        }
    },
    {
        path: 'classer-document',
        component: ClasserDocumentComponent,
        data: {
            title: 'Organisation des fichiers',
            breadcrumb: 'Organisation des fichiers'
        }
    }
]