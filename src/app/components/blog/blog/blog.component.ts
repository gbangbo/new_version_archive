import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HorizontalBlogComponent } from "../widgets/horizontal-blog/horizontal-blog.component";
import { SingleBlogComponent } from "../widgets/single-blog/single-blog.component";
import { VerticalBlogComponent } from "../widgets/vertical-blog/vertical-blog.component";
import { blogDetails } from '../../../shared/data/blog';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, SingleBlogComponent, VerticalBlogComponent, HorizontalBlogComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})

export class BlogComponent {

  public blogDetails = blogDetails;

}
