import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { sharedList, sharedList2 } from '../../../../../shared/data/bonus-ui/tree-view';

@Component({
  selector: 'app-shared-list',
  imports: [DragDropModule, CardComponent],
  templateUrl: './shared-list.component.html',
  styleUrl: './shared-list.component.scss'
})

export class SharedListComponent {

  public sharedList = sharedList;
  public sharedList2 = sharedList2;

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
