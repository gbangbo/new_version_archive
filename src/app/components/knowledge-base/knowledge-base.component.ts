import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { KnowledgeBaseTopDataComponent } from "./knowledge-base-top-data/knowledge-base-top-data.component";
import { BrowseArticleCategoryComponent } from "./browse-article-category/browse-article-category.component";
import { CommonFeaturedTutorialsComponent } from "../faq/widgets/common-featured-tutorials/common-featured-tutorials.component";
import { CommonArticleVideoComponent } from "../faq/widgets/common-article-video/common-article-video.component";
import { articlesAndVideosDetails, featuredTutorialDetails, knowledgeBase } from '../../shared/data/knowledge-base';
import { CommonFaqDetailsComponent } from "../faq/widgets/common-faq-details/common-faq-details.component";

@Component({
  selector: 'app-knowledge-base',
  imports: [CommonModule, KnowledgeBaseTopDataComponent, BrowseArticleCategoryComponent,
            CommonFeaturedTutorialsComponent, CommonArticleVideoComponent, CommonFaqDetailsComponent],
  templateUrl: './knowledge-base.component.html',
  styleUrl: './knowledge-base.component.scss'
})

export class KnowledgeBaseComponent {

  public featuredTutorialDetails = featuredTutorialDetails;
  public articlesAndVideosDetails = articlesAndVideosDetails;
  public knowledgeBase = knowledgeBase;
  
}
