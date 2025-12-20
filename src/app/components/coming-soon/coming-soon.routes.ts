import { Routes } from "@angular/router";

import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { ComingSoonVideoComponent } from "./coming-soon-video/coming-soon-video.component";
import { ComingSoonImageComponent } from "./coming-soon-image/coming-soon-image.component";

export const comingSoon: Routes = [
    {
        path: 'coming-soon',
        component: ComingSoonComponent
    },
    {
        path: 'coming-soon-video',
        component: ComingSoonVideoComponent
    },
    {
        path: 'coming-soon-image',
        component: ComingSoonImageComponent
    }
]