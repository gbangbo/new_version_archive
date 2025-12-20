import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { languageSearch } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-autocomplete-words',
  imports: [Select2Module, CardComponent],
  templateUrl: './autocomplete-words.component.html',
  styleUrl: './autocomplete-words.component.scss'
})

export class AutocompleteWordsComponent {

  public languageSearch = languageSearch;

}
