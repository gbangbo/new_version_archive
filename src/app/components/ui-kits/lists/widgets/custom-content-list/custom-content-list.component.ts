import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { customContent } from '../../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-custom-content-list',
  imports: [CommonModule, CardComponent],
  templateUrl: './custom-content-list.component.html',
  styleUrl: './custom-content-list.component.scss'
})

export class CustomContentListComponent {

  public customContent = customContent;

}
