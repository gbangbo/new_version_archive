import { Component } from '@angular/core';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../shared/components/ui/feather-icon/feather-icon.component";
import { browseArticles } from '../../../shared/data/knowledge-base';

@Component({
  selector: 'app-browse-article-category',
  imports: [FeatherIconComponent, CardComponent],
  templateUrl: './browse-article-category.component.html',
  styleUrl: './browse-article-category.component.scss'
})

export class BrowseArticleCategoryComponent {

  public browseArticles = browseArticles;

}
