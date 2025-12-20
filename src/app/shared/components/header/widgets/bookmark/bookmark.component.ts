import { SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { SvgIconComponent } from "../../../ui/svg-icon/svg-icon.component";
import { menuItems } from '../../../../data/menu';
import { Menu } from '../../../../interface/menu';
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'app-header-bookmark',
  imports: [RouterModule, FormsModule, SlicePipe, TranslatePipe,SvgIconComponent],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss'
})

export class BookmarkComponent {

  @Input() bookmark: boolean;

  public flip: boolean = false;
  public menuItems: Menu[] = [];
  public items: Menu[] = [];
  public bookmarkItems: Menu[] = [];
  public text: string = "";
  public open = false;
  public searchResult = false;
  public searchResultEmpty = false;

  constructor(private layoutService: LayoutService) {
    this.items = JSON.parse(JSON.stringify(menuItems));
    this.items.filter((items) => {
      if (items.bookmark) {
        this.bookmarkItems.push(items);
      }
      if (!items.children) return false;
      items.children.filter((subItems) => {
        if (subItems.bookmark) {
          this.bookmarkItems.push(subItems);
        }
      });
      return;
    });
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
    if (!items.length) {
      this.searchResultEmpty = true;
    } else {
      this.searchResultEmpty = false;
    }
  }

  addFix() {
    this.searchResult = true;
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
  }

  addToBookmark(items: Menu) {
    const index = this.bookmarkItems.indexOf(items);
    if (index === -1 && !items.bookmark) {
      items.bookmark = true;
      this.bookmarkItems.push(items);
      this.text = "";
    } else {
      this.bookmarkItems.splice(index, 1);
      items.bookmark = false;
    }
  }

  flipBookmark(value: string) {
    if (value == 'add') {
      this.flip = true;
    } else if (value == 'back') {
      this.flip = false;
    }
  }
  
}
