import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { stackableSortableList } from '../../../../../shared/data/bonus-ui/tree-view';

@Component({
  selector: 'app-stackable-sortable-lists',
  imports: [CommonModule, DragDropModule, CardComponent],
  templateUrl: './stackable-sortable-lists.component.html',
  styleUrl: './stackable-sortable-lists.component.scss'
})

export class StackableSortableListsComponent {

  public stackableSortableList = stackableSortableList;

  drop(event: CdkDragDrop<any[]>, items: any[]) {
    if (event.previousContainer === event.container) {
      moveItemInArray(items, event.previousIndex, event.currentIndex);
    }
  }

}
