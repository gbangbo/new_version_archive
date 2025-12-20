import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-read-write-options',
  imports: [TagInputModule, FormsModule, CardComponent],
  templateUrl: './read-write-options.component.html',
  styleUrl: './read-write-options.component.scss'
})

export class ReadWriteOptionsComponent {

  public readonly = ['tag1', 'tag2', 'tag3'];

}
