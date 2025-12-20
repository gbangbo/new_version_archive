import { Component } from '@angular/core';

import { SingleValueSelectComponent } from "./single-value-select/single-value-select.component";
import { DefaultSelectComponent } from "./default-select/default-select.component";
import { RandomSuggestionComponent } from "./random-suggestion/random-suggestion.component";
import { ReadWriteOptionsComponent } from "./read-write-options/read-write-options.component";
import { DisabledReadonlyComponent } from "./disabled-readonly/disabled-readonly.component";
import { MovieSuggestionComponent } from "./movie-suggestion/movie-suggestion.component";
import { AutocompleteWordsComponent } from "./autocomplete-words/autocomplete-words.component";
import { SelectInputUsingSearchComponent } from "./select-input-using-search/select-input-using-search.component";
import { RenderSuggestionComponent } from "./render-suggestion/render-suggestion.component";

@Component({
  selector: 'app-select2',
  imports: [SingleValueSelectComponent, DefaultSelectComponent, RandomSuggestionComponent,
            ReadWriteOptionsComponent, DisabledReadonlyComponent,MovieSuggestionComponent, 
            AutocompleteWordsComponent, SelectInputUsingSearchComponent, RenderSuggestionComponent],
  templateUrl: './select2.component.html',
  styleUrl: './select2.component.scss'
})

export class Select2Component {

}
