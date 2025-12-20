import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { disableList } from '../../../../../shared/data/bonus-ui/tree-view';

@Component({
  selector: 'app-disable-list',
  imports: [DragDropModule, CardComponent],
  templateUrl: './disable-list.component.html',
  styleUrl: './disable-list.component.scss'
})

export class DisableListComponent {

  public disableList = disableList;

  drop(event: CdkDragDrop<string[]>) {
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
