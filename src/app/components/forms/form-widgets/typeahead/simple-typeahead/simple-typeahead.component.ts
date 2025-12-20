import { OutsideDirective } from './../../../../../shared/directives/outside.directive';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { states } from '../../../../../shared/data/form-widgets';

@Component({
    selector: 'app-simple-typeahead',
    imports: [CommonModule, FormsModule, OutsideDirective, CardComponent],
    templateUrl: './simple-typeahead.component.html',
    styleUrl: './simple-typeahead.component.scss'
})

export class SimpleTypeaheadComponent {

  public model: string = '';
  public states = states;
  public filteredStates: string[] = [];
  private searchTerms = new Subject<string>();

  constructor() {
    this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) => term.length < 2 ? [] : this.filterStates(term))
    ).subscribe(filteredStates => {
      this.filteredStates = filteredStates;
    });
  }

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchTerms.next(input);
  }

  private filterStates(term: string): string[] {
    return this.states.filter(state => state.toLowerCase().includes(term.toLowerCase())).slice(0, 10);
  }

  onSelectState(state: string): void {
    this.model = state; 
    this.filteredStates = [];
  }
  
  close() {
    this.filteredStates = [];
  }
}
