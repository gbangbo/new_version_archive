import { Component, Input } from '@angular/core';

import { Comments } from '../../../../shared/interface/courses';

@Component({
  selector: 'app-comment-blog-details',
  imports: [],
  templateUrl: './comment-blog-details.component.html',
  styleUrl: './comment-blog-details.component.scss'
})

export class CommentBlogDetailsComponent {

  @Input() comment : Comments[];

}
