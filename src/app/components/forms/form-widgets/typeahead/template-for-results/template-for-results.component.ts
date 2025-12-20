import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { statesWithFlags } from '../../../../../shared/data/form-widgets';

@Component({
    selector: 'app-template-for-results',
    imports: [CommonModule, FormsModule, OutsideDirective, CardComponent],
    templateUrl: './template-for-results.component.html',
    styleUrl: './template-for-results.component.scss'
})

export class TemplateForResultsComponent {

  public model: string = '';
  public filteredStates: { name: string; flag: string }[] = [];
  public statesWithFlags = statesWithFlags;
  public term: string;

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.filteredStates = this.filterStates(term);
  }

  private filterStates(term: string): { name: string; flag: string }[] {
    return term === '' ? [] : this.statesWithFlags.filter(state => state.name.toLowerCase().includes(term.toLowerCase())) .slice(0, 10);
  }

  highlight(text: string, term: string): string {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="highlighted">$1</span>');
  }

  onSelect(state: { name: string; flag: string }): void {
    this.model = state.name;
    this.filteredStates = [];
  }

  close() {
    this.filteredStates = [];
  }

}
