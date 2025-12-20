import { Routes } from "@angular/router";

import { BookmarkComponent } from "./bookmark.component";

export const bookmark: Routes = [
    {
        path: '',
        component: BookmarkComponent,
        data: {
            title: 'Bookmark',
            breadcrumb: 'Bookmark'
        }
    }
]