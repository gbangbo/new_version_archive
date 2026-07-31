import { Component, Input } from '@angular/core';

import { articlesAndVideosDetails } from '../../../../shared/data/knowledge-base';
import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";

@Component({
  selector: 'app-common-article-video',
  imports: [FeatherIconComponent],
  templateUrl: './common-article-video.component.html',
  styleUrl: './common-article-video.component.scss'
})

export class CommonArticleVideoComponent {

  @Input() details = articlesAndVideosDetails;
  @Input() headerTitle: string = '';
  @Input() faqClass: string = '';

}
