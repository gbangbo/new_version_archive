import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { alertAdditionalContent } from '../../../../../shared/data/ui-kits/alert';

@Component({
  selector: 'app-additional-content',
  imports: [CardComponent],
  templateUrl: './additional-content.component.html',
  styleUrl: './additional-content.component.scss'
})

export class AdditionalContentComponent {

  public alertAdditionalContent = alertAdditionalContent;

}
