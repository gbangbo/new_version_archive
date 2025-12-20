import { Component, Input } from '@angular/core';

import { BlogDetails } from '../../../../shared/interface/blog';

@Component({
  selector: 'app-vertical-blog',
  imports: [],
  templateUrl: './vertical-blog.component.html',
  styleUrl: './vertical-blog.component.scss'
})

export class VerticalBlogComponent {

  @Input() blog: BlogDetails;

}
