import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-default-select',
  imports: [CardComponent,TagInputModule,FormsModule],
  templateUrl: './default-select.component.html',
  styleUrl: './default-select.component.scss'
})

export class DefaultSelectComponent {

  public defaultSelect = ['tag1', 'tag2', 'tag3', 'autofocus'];

}
