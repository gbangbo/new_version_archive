import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { states } from '../../../../../shared/data/form-widgets';

@Component({
    selector: 'app-formatted-results',
    imports: [CommonModule, FormsModule, OutsideDirective, CardComponent],
    templateUrl: './formatted-results.component.html',
    styleUrl: './formatted-results.component.scss'
})

export class FormattedResultsComponent {

  public model: string = '';
  public filteredStates: string[] = [];
  public states = states;

  formatter = (result: string) => result.toUpperCase();

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.filteredStates = this.filterStates(term);
  }

  private filterStates(term: string): string[] {
    return term === '' ? [] : this.states.filter(state => state.toLowerCase().includes(term.toLowerCase())).slice(0, 10);
  }

  onSelectState(state: string): void {
    this.model = state; 
    this.filteredStates = []; 
  }

  close() {
    this.filteredStates = [];
  }
}
