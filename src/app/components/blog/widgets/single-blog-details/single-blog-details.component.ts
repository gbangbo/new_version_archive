import { Component, Input } from '@angular/core';

import { CommentBlogDetailsComponent } from "../comment-blog-details/comment-blog-details.component";
import { blog } from '../../../../shared/data/blog';
import { courseDetails } from '../../../../shared/data/courses';
import { Comments } from '../../../../shared/interface/courses';

@Component({
  selector: 'app-single-blog-details',
  imports: [CommentBlogDetailsComponent],
  templateUrl: './single-blog-details.component.html',
  styleUrl: './single-blog-details.component.scss'
})

export class SingleBlogDetailsComponent {
  
  @Input() details = blog;
  @Input() courseDetails = courseDetails;
  @Input() comment: Comments[];  

}
