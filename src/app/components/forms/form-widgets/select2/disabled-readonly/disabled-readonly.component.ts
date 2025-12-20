import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-disabled-readonly',
  imports: [CardComponent,TagInputModule,FormsModule],
  templateUrl: './disabled-readonly.component.html',
  styleUrl: './disabled-readonly.component.scss'
})

export class DisabledReadonlyComponent {

  public readonly = ['tag1', 'tag2', 'tag3'];

}
