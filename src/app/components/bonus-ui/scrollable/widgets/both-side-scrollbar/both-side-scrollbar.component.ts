import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-both-side-scrollbar',
  imports: [NgScrollbarModule, CardComponent],
  templateUrl: './both-side-scrollbar.component.html',
  styleUrl: './both-side-scrollbar.component.scss'
})

export class BothSideScrollbarComponent {

}
