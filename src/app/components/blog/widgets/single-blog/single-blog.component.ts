import { Component, Input } from '@angular/core';

import { BlogDetails } from '../../../../shared/interface/blog';

@Component({
  selector: 'app-single-blog',
  imports: [],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.scss'
})

export class SingleBlogComponent {

  @Input() blog: BlogDetails;

}
