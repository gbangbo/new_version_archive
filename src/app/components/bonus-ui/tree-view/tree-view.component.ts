import { Component } from '@angular/core';

import { StackableSortableListsComponent } from "./widgets/stackable-sortable-lists/stackable-sortable-lists.component";
import { SortableSwapListComponent } from "./widgets/sortable-swap-list/sortable-swap-list.component";
import { SimpleListComponent } from "./widgets/simple-list/simple-list.component";
import { SharedListComponent } from "./widgets/shared-list/shared-list.component";
import { DisableListComponent } from "./widgets/disable-list/disable-list.component";
import { SortableHandleListComponent } from "./widgets/sortable-handle-list/sortable-handle-list.component";
import { DraggableFilteringComponent } from "./widgets/draggable-filtering/draggable-filtering.component";
import { RandomSortableComponent } from "./widgets/random-sortable/random-sortable.component";

@Component({
  selector: 'app-tree-view',
  imports: [StackableSortableListsComponent, SortableSwapListComponent, SimpleListComponent,
            SharedListComponent, DisableListComponent, SortableHandleListComponent,
            DraggableFilteringComponent, RandomSortableComponent],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss'
})

export class TreeViewComponent {

}
