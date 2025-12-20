import { Component, Input } from '@angular/core';

import { BlogDetails } from '../../../../shared/interface/blog';

@Component({
  selector: 'app-horizontal-blog',
  imports: [],
  templateUrl: './horizontal-blog.component.html',
  styleUrl: './horizontal-blog.component.scss'
})

export class HorizontalBlogComponent {

  @Input() blog: BlogDetails;
  
}
