/// <reference types="@angular/localize" />

import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";

// Enregistrer la locale française
registerLocaleData(localeFr, 'fr-FR');

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
