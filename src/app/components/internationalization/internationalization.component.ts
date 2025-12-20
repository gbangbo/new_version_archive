import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { internationalizationMenu, internationalizationMenu2 } from '../../shared/data/internationalization';
import { language } from './../../shared/data/header';

@Component({
  selector: 'app-internationalization',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './internationalization.component.html',
  styleUrl: './internationalization.component.scss'
})

export class InternationalizationComponent {

  public languages = language
  public internationalizationMenu = internationalizationMenu;
  public internationalizationMenu2 = internationalizationMenu2;
  
  constructor(private translate: TranslateService) {
    this.translate.use('en')
  }

  handleChange(event: any) {
    const value = event.target.value;

    if(value) {
      this.translate.use(value)
    } 
  }
  
}
