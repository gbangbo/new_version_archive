import { Component } from '@angular/core';

import { AnimatedTabComponent } from "./widgets/animated-tab/animated-tab.component";
import { ArrowTabComponent } from "./widgets/arrow-tab/arrow-tab.component";
import { BackgroundPillTabComponent } from "./widgets/background-pill-tab/background-pill-tab.component";
import { BorderTabComponent } from "./widgets/border-tab/border-tab.component";
import { BottomTabComponent } from "./widgets/bottom-tab/bottom-tab.component";
import { IconTabComponent } from "./widgets/icon-tab/icon-tab.component";
import { JustifyTabComponent } from "./widgets/justify-tab/justify-tab.component";
import { MaterialStyleLeftTabComponent } from "./widgets/material-style-left-tab/material-style-left-tab.component";
import { MaterialStyleTabComponent } from "./widgets/material-style-tab/material-style-tab.component";
import { PillsTabComponent } from "./widgets/pills-tab/pills-tab.component";
import { SimpleTabComponent } from "./widgets/simple-tab/simple-tab.component";
import { VerticalTabComponent } from "./widgets/vertical-tab/vertical-tab.component";

@Component({
  selector: 'app-tabs',
  imports: [SimpleTabComponent, IconTabComponent, VerticalTabComponent,
            PillsTabComponent, JustifyTabComponent, MaterialStyleLeftTabComponent,
            MaterialStyleTabComponent, BorderTabComponent, BackgroundPillTabComponent,
            ArrowTabComponent, BottomTabComponent, AnimatedTabComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})

export class TabsComponent {

}
