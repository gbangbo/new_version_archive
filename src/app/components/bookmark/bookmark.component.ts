import { Component } from '@angular/core';

import { FeatherIconComponent } from "../../shared/components/ui/feather-icon/feather-icon.component";
import { BookmarkModalComponent } from './widgets/bookmark-modal/bookmark-modal.component';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { Bookmark } from '../../shared/interface/bookmark';
import { Tabs } from '../../shared/interface/common';
import { bookmarks } from './../../shared/data/bookmark';

@Component({
  selector: 'app-bookmark',
  imports: [SidebarComponent, FeatherIconComponent, BookmarkModalComponent],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss'
})

export class BookmarkComponent {

  public activeTab: Tabs;
  public bookmarks = bookmarks;
  public isListView: boolean = false;
  public selectedBookmark: Bookmark;
  public modalOpen: boolean = false;

  handleCurrentTab(value: Tabs) {
    this.activeTab = value;
  }

  getFilteredBookmark() {
    if(this.activeTab.value == 'created_by_me') {
      return this.bookmarks;
    }
    if(this.activeTab.value == 'favorites') {
      return this.bookmarks.filter((bookmark) => bookmark.is_favorite);
    }
  }

  favoriteBookmark(bookmark: Bookmark) {
    bookmark.is_favorite =! bookmark.is_favorite;
  }

  editBookmark(bookmark: Bookmark) {
    this.selectedBookmark = bookmark;
    this.modalOpen = true;
  }

  deleteBookmark(bookmark: Bookmark) {
    this.bookmarks = this.bookmarks.filter(bookmarks => bookmarks.id !== bookmark.id)
  }

  handleAddBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark)
  }

  toggleListView(value: boolean) {
    this.isListView = value;
  }

  handleOpenModal(value: boolean) {
    this.modalOpen = value;
  }
  
}
