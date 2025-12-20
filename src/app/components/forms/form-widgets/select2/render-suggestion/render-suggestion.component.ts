import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { randomSuggestion } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-render-suggestion',
  imports: [TagInputModule, FormsModule, CardComponent],
  templateUrl: './render-suggestion.component.html',
  styleUrl: './render-suggestion.component.scss'
})

export class RenderSuggestionComponent {

  public suggestion = [];
  public renderSuggestion = randomSuggestion;
  
}
