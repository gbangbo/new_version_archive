import { Component } from '@angular/core';

import { DefaultListsComponent } from "./widgets/default-lists/default-lists.component";
import { ActiveListsComponent } from "./widgets/active-lists/active-lists.component";
import { FlushListsComponent } from "./widgets/flush-lists/flush-lists.component";
import { ContextualClassesComponent } from "./widgets/contextual-classes/contextual-classes.component";
import { HorizontalListComponent } from "./widgets/horizontal-list/horizontal-list.component";
import { CustomContentListComponent } from "./widgets/custom-content-list/custom-content-list.component";
import { ListCheckboxComponent } from "./widgets/list-checkbox/list-checkbox.component";
import { ListRadioComponent } from "./widgets/list-radio/list-radio.component";
import { ListNumberComponent } from "./widgets/list-number/list-number.component";
import { JavascriptBehaviorComponent } from "./widgets/javascript-behavior/javascript-behavior.component";
import { NumberBadgeListComponent } from "./widgets/number-badge-list/number-badge-list.component";
import { DisabledListComponent } from "./widgets/disabled-list/disabled-list.component";
import { ScrollableListComponent } from "./widgets/scrollable-list/scrollable-list.component";

@Component({
  selector: 'app-lists',
  imports: [DefaultListsComponent, ActiveListsComponent, FlushListsComponent,
            ContextualClassesComponent, HorizontalListComponent, CustomContentListComponent,
            ListCheckboxComponent, ListRadioComponent, ListNumberComponent,
            JavascriptBehaviorComponent, NumberBadgeListComponent, DisabledListComponent, 
            ScrollableListComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})

export class ListsComponent {

}
