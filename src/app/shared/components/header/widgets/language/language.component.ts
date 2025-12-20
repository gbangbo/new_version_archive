import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { language } from '../../../../data/header';
import { Language } from '../../../../interface/header';
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'app-header-language',
  imports: [CommonModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})

export class LanguageComponent {

  public languages = language;
  public selectedLanguage: Language;

  constructor(public layoutService: LayoutService, public translate: TranslateService) {
    this.languages.filter((details) => {
      if (details.active) {
        this.selectedLanguage = details;
      }
    })

    this.translate.use('fr');
  }

  selectLanguage(language: Language) {
    this.selectedLanguage = language;
    this.translate.use(language.code)
  }

}
