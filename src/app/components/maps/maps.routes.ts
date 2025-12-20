import { Routes } from '@angular/router';

import { GoogleMapComponent } from './google-map/google-map.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

export const maps: Routes = [
    {
        path: 'map-google',
        component: GoogleMapComponent,
        data: {
            title: 'Google Map',
            breadcrumb: 'Google Map'
        }
    },
    {
        path: 'leaflet-map',
        component: LeafletMapComponent,
        data: {
            title: 'Leaflet Map',
            breadcrumb: 'Leaflet Map'
        }
    }
   
]