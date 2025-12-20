import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { sortableList } from '../../../../../shared/data/bonus-ui/tree-view';

@Component({
  selector: 'app-sortable-handle-list',
  imports: [DragDropModule, CardComponent],
  templateUrl: './sortable-handle-list.component.html',
  styleUrl: './sortable-handle-list.component.scss'
})

export class SortableHandleListComponent {

  public sortableList = sortableList;

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
