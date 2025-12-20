import { Component } from '@angular/core';

import { HorizontalSolidComponent } from "./widgets/horizontal-solid/horizontal-solid.component";
import { HorizontalDashedComponent } from "./widgets/horizontal-dashed/horizontal-dashed.component";
import { HorizontalDottedComponent } from "./widgets/horizontal-dotted/horizontal-dotted.component";
import { VerticalDashedComponent } from "./widgets/vertical-dashed/vertical-dashed.component";
import { VerticalDottedComponent } from "./widgets/vertical-dotted/vertical-dotted.component";
import { VerticalDoubleComponent } from "./widgets/vertical-double/vertical-double.component";
import { AnimatedColorComponent } from './widgets/animated-color/animated-color.component';
import { HorizontalEditableComponent } from "./widgets/horizontal-editable/horizontal-editable.component";
import { HorizontalSimpleComponent } from "./widgets/horizontal-simple/horizontal-simple.component";
import { VerticalSimpleComponent } from "./widgets/vertical-simple/vertical-simple.component";

@Component({
  selector: 'app-divider',
  imports: [HorizontalSolidComponent, HorizontalDashedComponent, HorizontalDottedComponent,
            VerticalDashedComponent, VerticalDottedComponent, VerticalDoubleComponent,
            AnimatedColorComponent, HorizontalEditableComponent, HorizontalSimpleComponent,
            VerticalSimpleComponent],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss'
})

export class DividerComponent {

}
