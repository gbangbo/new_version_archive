import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

import { list } from '../../../shared/data/bonus-ui/draggable-card';

@Component({
  selector: 'app-draggable-card',
  imports: [CommonModule, DragDropModule],
  templateUrl: './draggable-card.component.html',
  styleUrl: './draggable-card.component.scss'
})

export class DraggableCardComponent {

  public list = list;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
  }

}
