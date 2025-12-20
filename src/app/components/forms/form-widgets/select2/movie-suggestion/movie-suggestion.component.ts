import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { movieSuggestion } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-movie-suggestion',
  imports: [TagInputModule, FormsModule, CardComponent],
  templateUrl: './movie-suggestion.component.html',
  styleUrl: './movie-suggestion.component.scss'
})

export class MovieSuggestionComponent {

  public movieSelect = ["Hot sit", "The Matrix"]

  public movieSuggestion = movieSuggestion;
}
