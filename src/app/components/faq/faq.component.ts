import { Component } from '@angular/core';

import { FaqQuestionAnswerComponent } from "./faq-question-answer/faq-question-answer.component";
import { CommonArticleVideoComponent } from "./widgets/common-article-video/common-article-video.component";
import { CommonFaqDetailsComponent } from "./widgets/common-faq-details/common-faq-details.component";
import { CommonFeaturedTutorialsComponent } from "./widgets/common-featured-tutorials/common-featured-tutorials.component";
import { faqArticlesAndVideos, faqDetails, faqFeaturedTutorial } from '../../shared/data/faq';

@Component({
  selector: 'app-faq',
  imports: [FaqQuestionAnswerComponent, CommonFaqDetailsComponent, CommonFeaturedTutorialsComponent, CommonArticleVideoComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})

export class FaqComponent {

  public faqDetails = faqDetails;
  public faqFeaturedTutorial = faqFeaturedTutorial;
  public faqArticlesAndVideos = faqArticlesAndVideos;

}
