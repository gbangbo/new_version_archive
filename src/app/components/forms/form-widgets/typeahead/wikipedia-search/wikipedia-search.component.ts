import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
  },
});

@Injectable()

export class WikipediaService {

  constructor(private http: HttpClient) { }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<[any, string[]]>(WIKI_URL, { params: PARAMS.set('search', term) })
      .pipe(map((response) => response[1]));
  }
}

@Component({
    selector: 'app-wikipedia-search',
    imports: [CommonModule, FormsModule, OutsideDirective, CardComponent],
    templateUrl: './wikipedia-search.component.html',
    styleUrl: './wikipedia-search.component.scss',
    providers: [WikipediaService]
})

export class WikipediaSearchComponent {

  public model: string = '';
  public searching = false;
  public searchFailed = false;
  public filteredResults: string[] = [];

  private searchTerms = new Subject<string>();

  constructor(private _service: WikipediaService) {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) => 
        this._service.search(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    ).subscribe(filteredResults => {
      this.filteredResults = filteredResults;
    });
  }

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchTerms.next(input);
  }

  onSelectResult(result: string): void {
    this.model = result;
    this.filteredResults = [];
  }
  
  close() {
    this.filteredResults = [];
  }
}
