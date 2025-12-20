import {Routes} from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {ContentComponent} from './shared/components/layout/content/content.component';
import {FullComponent} from './shared/components/layout/full/full.component';
import {AdminGuard} from './shared/guard/admin.guard';
import {content} from './shared/routes/content.routes';
import {full} from './shared/routes/full.routes';
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
    },
    {
        path: 'auth/login',
        component: LoginComponent,
        data: {
            title: 'Connexion'
        }
    },
    {
        path: 'auth/forgot-password',
        component: ForgotPasswordComponent,
        data: {
            title: 'Mot de passe oublié'
        }
    },
    {
        path: '',
        component: ContentComponent,
        canActivate: [AdminGuard],
        children: content,
    },
    {
        path: '',
        component: FullComponent,
        canActivate: [AdminGuard],
        children: full
    },
    {
        path: '**',
        redirectTo: '',
    }
];
