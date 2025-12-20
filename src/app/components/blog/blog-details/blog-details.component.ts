import { Component } from '@angular/core';

import { SingleBlogDetailsComponent } from "../widgets/single-blog-details/single-blog-details.component";
import { blog, blogComments } from '../../../shared/data/blog';

@Component({
  selector: 'app-blog-details',
  imports: [SingleBlogDetailsComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})

export class BlogDetailsComponent {

  public blog = blog;
  public blogComment = blogComments;

}
