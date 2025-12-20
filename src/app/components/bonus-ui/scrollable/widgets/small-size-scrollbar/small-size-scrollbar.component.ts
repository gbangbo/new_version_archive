import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-small-size-scrollbar',
  imports: [NgScrollbarModule, CardComponent],
  templateUrl: './small-size-scrollbar.component.html',
  styleUrl: './small-size-scrollbar.component.scss'
})

export class SmallSizeScrollbarComponent {

}
