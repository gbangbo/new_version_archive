import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { swapList } from '../../../../../shared/data/bonus-ui/tree-view';

@Component({
  selector: 'app-sortable-swap-list',
  imports: [CommonModule, DragDropModule, CardComponent],
  templateUrl: './sortable-swap-list.component.html',
  styleUrl: './sortable-swap-list.component.scss'
})

export class SortableSwapListComponent {

  public swapList = swapList;

  drop(event: CdkDragDrop<any[]>, items: any[]) {
    if (event.previousContainer === event.container) {
      moveItemInArray(items, event.previousIndex, event.currentIndex);
    }
  }
  
}
