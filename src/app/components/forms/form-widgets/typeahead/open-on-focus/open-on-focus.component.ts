import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { states } from '../../../../../shared/data/form-widgets';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-open-on-focus',
  imports: [CommonModule, FormsModule, OutsideDirective, CardComponent],
  templateUrl: './open-on-focus.component.html',
  styleUrl: './open-on-focus.component.scss'
})

export class OpenOnFocusComponent {

  public model: string;
  public filteredStates: string[] = [];
  public focus$ = new Subject<string>();
  public click$ = new Subject<string>();

  private states = states;

  constructor() {
    this.focus$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(() => this.filterStates(''))
    ).subscribe(filteredStates => {
      this.filteredStates = filteredStates;
    });

    this.click$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(() => this.filterStates(''))
    ).subscribe(filteredStates => {
      this.filteredStates = filteredStates;
    });
  }

  onFocus(event: FocusEvent): void {
    this.focus$.next((event.target as HTMLInputElement).value);
  }

  onClick(event: MouseEvent): void {
    this.click$.next((event.target as HTMLInputElement).value);
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.filteredStates = this.filterStates(input);
  }

  private filterStates(term: string): string[] {
    return (term === '' ? this.states : this.states.filter(state => state.toLowerCase().includes(term.toLowerCase())
    )).slice(0, 10);
  }

  onSelectState(state: string): void {
    this.model = state; 
    this.filteredStates = [];
  }

  close() {
    this.filteredStates = [];
  }
}
