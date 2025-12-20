import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { simpleList } from '../../../../../shared/data/bonus-ui/tree-view';

@Component({
  selector: 'app-simple-list',
  imports: [DragDropModule, CardComponent],
  templateUrl: './simple-list.component.html',
  styleUrl: './simple-list.component.scss'
})

export class SimpleListComponent {

  public simpleList = simpleList;

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
