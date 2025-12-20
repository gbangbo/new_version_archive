import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../../../shared/components/ui/feather-icon/feather-icon.component';
import { FaqLatestUpdatesComponent } from "./faq-latest-updates/faq-latest-updates.component";
import { FaqNavigationComponent } from "./faq-navigation/faq-navigation.component";
import { FaqSearchArticlesComponent } from "./faq-search-articles/faq-search-articles.component";
import { faqQuestionAnswer } from '../../../shared/data/faq';

@Component({
  selector: 'app-faq-question-answer',
  imports: [CommonModule, FaqSearchArticlesComponent, FaqNavigationComponent, 
            FaqLatestUpdatesComponent, FeatherIconComponent],
  templateUrl: './faq-question-answer.component.html',
  styleUrl: './faq-question-answer.component.scss'
})

export class FaqQuestionAnswerComponent {

  public faqQuestionAnswer = faqQuestionAnswer;
  public accordionOpen: { [key: number]: boolean } = {};

  toggleAccordion(index: number) {
    if (this.accordionOpen[index]) {
      this.accordionOpen[index] = false;
    } else {
      Object.keys(this.accordionOpen).forEach(key => {
        this.accordionOpen[+key] = false;
      });
  
      this.accordionOpen[index] = true;
    }
  }

}
