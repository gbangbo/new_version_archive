import { Component } from '@angular/core';

import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { navigation } from '../../../../shared/data/faq';

@Component({
  selector: 'app-faq-navigation',
  imports: [FeatherIconComponent],
  templateUrl: './faq-navigation.component.html',
  styleUrl: './faq-navigation.component.scss'
})

export class FaqNavigationComponent {

  public navigation = navigation;

}
