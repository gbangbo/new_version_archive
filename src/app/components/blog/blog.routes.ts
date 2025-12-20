import { Routes } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

export const blog: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    data: {
      title: 'Blog',
      breadcrumb: 'Blog'
    }
  },
  {
    path: 'blog-details',
    component: BlogDetailsComponent,
    data: {
      title: 'Blog Details',
      breadcrumb: 'Blog Details'
    }
  },
  {
    path: 'add-blog',
    component: AddBlogComponent,
    data: {
      title: 'Add Blog',
      breadcrumb: 'Add Blog'
    }
  },
]
