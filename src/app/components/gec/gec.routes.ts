import {Routes} from "@angular/router";
import {MailBoxComponent} from "./imputation/mail-box.component";
import {MesImputationsComponent} from "./mes-imputations/mes-imputations.component";
import {AImputerComponent} from "./a-imputer/a-imputer.component";


export const gecRoutes: Routes = [
    {
        path: 'imputation',
        component: MailBoxComponent,
        data: {
            title: 'Imputer',
            breadcrumb: 'Imputer'
        }
    },
    {
        path: 'a-imputer',
        component: AImputerComponent,
        data: {
            title: 'Documents à imputer',
            breadcrumb: 'Documents à imputer'
        }
    },
    {
        path: 'mes-imputations',
        component: MesImputationsComponent,
        data: {
            title: 'Mes imputations',
            breadcrumb: 'Mes imputations'
        }
    }
]
