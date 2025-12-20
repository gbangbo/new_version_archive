import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { state } from '../../../../../shared/data/form-widgets';

@Component({
    selector: 'app-select-on-exact',
    imports: [CommonModule, FormsModule, OutsideDirective, CardComponent],
    templateUrl: './select-on-exact.component.html',
    styleUrl: './select-on-exact.component.scss'
})

export class SelectOnExactComponent {

  public model: string = '';
  public filteredStates: { name: string }[] = [];
  public states = state;

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.filteredStates = this.filterStates(term);
    
    if (this.filteredStates.length === 1) {
      this.model = this.filteredStates[0].name;
    }
  }

  private filterStates(term: string): { name: string }[] {
    return term === '' ? [] : this.states.filter(state => state.name.toLowerCase().includes(term.toLowerCase())) .slice(0, 10);
  }

  formatter = (state: { name: string }) => state.name;

  onSelect(state: { name: string }): void {
    this.model = state.name;
    this.filteredStates = []; 
  }

  close() {
    this.filteredStates = [];
  }
}
