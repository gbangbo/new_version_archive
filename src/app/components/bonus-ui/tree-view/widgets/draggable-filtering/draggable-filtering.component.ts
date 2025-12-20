import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { draggableList } from '../../../../../shared/data/bonus-ui/tree-view';

@Component({
  selector: 'app-draggable-filtering',
  imports: [DragDropModule, CardComponent],
  templateUrl: './draggable-filtering.component.html',
  styleUrl: './draggable-filtering.component.scss'
})

export class DraggableFilteringComponent {
  
  public draggableList = draggableList;

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
