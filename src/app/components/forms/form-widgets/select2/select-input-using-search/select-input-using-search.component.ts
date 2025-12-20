import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { selectInputSearch } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-select-input-using-search',
  imports: [Select2Module, CardComponent],
  templateUrl: './select-input-using-search.component.html',
  styleUrl: './select-input-using-search.component.scss'
})

export class SelectInputUsingSearchComponent {  

  public selectInputSearch = selectInputSearch;
 
}