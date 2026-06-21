import {Routes} from "@angular/router";
import {ExcelToPdfComponent} from "./excel-to-pdf/excel-to-pdf.component";
import {ExcelFolderToPdfComponent} from "./excel-folder-to-pdf/excel-folder-to-pdf.component";


export const importerRoutes: Routes = [
    {
        path: 'recuperer-pdf',
        component: ExcelToPdfComponent,
        data: {
            title: 'Récupération de PDF via Excel',
            breadcrumb: 'Récupération de PDF via Excel'
        }
    },
    {
        path: 'pdf-depuis-dossier',
        component: ExcelFolderToPdfComponent,
        data: {
            title: 'Excel : PDFs depuis dossiers',
            breadcrumb: 'Excel : PDFs depuis dossiers'
        }
    }
]