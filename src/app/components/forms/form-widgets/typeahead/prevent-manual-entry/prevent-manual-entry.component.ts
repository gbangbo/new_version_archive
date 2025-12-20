import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { state } from '../../../../../shared/data/form-widgets';
import { State } from '../../../../../shared/interface/form-widgets';

@Component({
    selector: 'app-prevent-manual-entry',
    imports: [CommonModule, FormsModule, OutsideDirective, CardComponent],
    templateUrl: './prevent-manual-entry.component.html',
    styleUrl: './prevent-manual-entry.component.scss'
})

export class PreventManualEntryComponent {

  public model: string = ''; 
  public filteredStates: State[] = [];
  private searchTerms = new Subject<string>();
  public state = state;

  constructor() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => term.length >= 2), 
      map((term) => this.filterStates(term)) 
    ).subscribe(filteredStates => {
      this.filteredStates = filteredStates; 
    });
  }

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchTerms.next(input);
  }

  private filterStates(term: string): State[] {
    return this.state.filter((state) => state.name.toLowerCase().includes(term.toLowerCase())).slice(0, 10);
  }

  formatter(state: State): string {
    return state.name;
  }

  onSelect(state: State): void {
    this.model = state.name;
    this.filteredStates = []; 
  }

  close() {
    this.filteredStates = [];
  }

}
