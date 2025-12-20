import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { states } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-global-configuration-typeahead',
  imports: [CommonModule, FormsModule, OutsideDirective, CardComponent],
  templateUrl: './global-configuration-typeahead.component.html',
  styleUrl: './global-configuration-typeahead.component.scss'
})

export class GlobalConfigurationTypeaheadComponent {

  public model: string = '';
  public states = states; 
  public filteredStates: string[] = [];

  searchStates(term: string): void {
    if (term.length < 2) {
      this.filteredStates = []; 
    } else {
      this.filteredStates = this.states.filter(state => state.toLowerCase().startsWith(term.toLowerCase())).slice(0, 10);
    }
  }

  selectState(state: string): void {
    this.model = state;  
    this.filteredStates = []; 
  }
  
  close() {
    this.filteredStates = [];
  }

}
