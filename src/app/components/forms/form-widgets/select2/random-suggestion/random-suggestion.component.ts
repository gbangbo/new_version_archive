import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { randomSuggestion } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-random-suggestion',
  imports: [TagInputModule, FormsModule, CardComponent],
  templateUrl: './random-suggestion.component.html',
  styleUrl: './random-suggestion.component.scss'
})

export class RandomSuggestionComponent {

  public randomList = ['tivo', 'roxo', 'sheltos', 'viho'];
  public randomSuggestion = randomSuggestion;

}
