import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-custom-scrollbar',
  imports: [NgScrollbarModule, CardComponent],
  templateUrl: './custom-scrollbar.component.html',
  styleUrl: './custom-scrollbar.component.scss'
})

export class CustomScrollbarComponent {

}
