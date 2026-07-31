import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';

import { bookmarkCollection, bookmarkTags, bookmarks } from '../../../../shared/data/bookmark';
import { OutsideDirective } from '../../../../shared/directives/outside.directive';
import { Bookmark } from '../../../../shared/interface/bookmark';

@Component({
  selector: 'app-bookmark-modal',
  imports: [CommonModule, ReactiveFormsModule, Select2Module, OutsideDirective],
  templateUrl: './bookmark-modal.component.html',
  styleUrl: './bookmark-modal.component.scss'
})

export class BookmarkModalComponent {

  @Output() newBookmark = new EventEmitter<Bookmark>();
  @Output() modalOpen = new EventEmitter<boolean>();

  @Input() bookmarkDetails: Bookmark;

  public bookmarkForm = new FormGroup({
    url: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required]),
    collection: new FormControl('', [Validators.required]),
  });
  
  public bookmarkTags = bookmarkTags;
  public bookmarkCollection = bookmarkCollection;
  public bookmarks = bookmarks;
  public closeResult: string;

  ngOnChanges() {
    if(this.bookmarkDetails) {      
      this.bookmarkForm.patchValue({
        url: this.bookmarkDetails.url || '',
        title: this.bookmarkDetails.title || '',
        description: this.bookmarkDetails.description || '',
        tag: this.bookmarkDetails.tag || '',
        collection: this.bookmarkDetails.collection || '',
      });
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }

  submit() {
    this.bookmarkForm.markAllAsTouched();

    if (this.bookmarkForm.valid) {
      if(this.bookmarkDetails) {
        const index = bookmarks.findIndex(bookmark => bookmark.id == this.bookmarkDetails.id);

        if(index !== -1) {
          bookmarks[index] = {
            ...bookmarks[index],
            url: this.bookmarkForm.value.url!,
            title: this.bookmarkForm.value.title!,
            description: this.bookmarkForm.value.description!,
            tag: this.bookmarkForm.value.tag!,
            collection: this.bookmarkForm.value.collection!,
          };
        }
      } else {
        const bookmark = {
          id: bookmarks.length + 1,
          url: this.bookmarkForm.value.url!,
          title: this.bookmarkForm.value.title!,
          description: this.bookmarkForm.value.description!,
          image: 'assets/images/lightgallery/01.jpg',
          tag: this.bookmarkForm.value.tag!,
          collection: this.bookmarkForm.value.collection!,
          is_favorite: false
        };
        this.newBookmark.emit(bookmark);
      }

      this.closeModal();
      this.bookmarkForm.reset();
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.closeModal();
    }
  }
}
