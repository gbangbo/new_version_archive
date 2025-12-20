import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { randomSortable } from '../../../../../shared/data/bonus-ui/tree-view';

@Component({
  selector: 'app-random-sortable',
  imports: [DragDropModule, CardComponent],
  templateUrl: './random-sortable.component.html',
  styleUrl: './random-sortable.component.scss'
})

export class RandomSortableComponent {

  public randomSortable = randomSortable;

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
