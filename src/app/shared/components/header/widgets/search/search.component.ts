import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FeatherIconComponent } from "../../../ui/feather-icon/feather-icon.component";
import { SvgIconComponent } from "../../../ui/svg-icon/svg-icon.component";
import { menuItems } from '../../../../data/menu';
import { OutsideDirective } from '../../../../directives/outside.directive';
import { Menu } from '../../../../interface/menu';
import { LayoutService } from '../../../../services/layout.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe,
            FeatherIconComponent, OutsideDirective, SvgIconComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  public menuItems: Menu[] = [];
  public items: Menu[] = [];
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = '';

  constructor(public layoutService: LayoutService) {
    this.items = JSON.parse(JSON.stringify(menuItems));
  }

  searchTerm(term: string) {
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];
    let items: Menu[] = [];
    term = term.toLowerCase();
    this.items.filter(menuItems => {
      if (!menuItems?.title) return false
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link') {
        items.push(menuItems);
      }
      if (!menuItems.children) return false
      menuItems.children.filter(subItems => {
        if (subItems.title?.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = menuItems.icon
          items.push(subItems);
        }
        if (!subItems.children) return false
        subItems.children.filter(suSubItems => {
          if (suSubItems.title?.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon
            items.push(suSubItems);
          }
        })
        return
      })
      this.checkSearchResultEmpty(items)
      this.menuItems = items
      return
    }
    );
    return

  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas')
  }

  getText(value: string) {
    this.text = value;
  }

  getSearch(value: boolean) {
    this.searchResult = value;
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
    document.body.classList.remove('offcanvas')
  }

  clickOutside(): void {
    this.searchResult = false;
    this.searchResultEmpty = false;
  }

  closeSearch() {
    this.layoutService.isSearchOpen = false;
    this.removeFix();
  }

}
