import { Component } from '@angular/core';

import { SimpleAccordionComponent } from "./widgets/simple-accordion/simple-accordion.component";
import { FlushAccordionComponent } from "./widgets/flush-accordion/flush-accordion.component";
import { MultipleCollapseAccordionComponent } from "./widgets/multiple-collapse-accordion/multiple-collapse-accordion.component";
import { IconAccordionComponent } from "./widgets/icon-accordion/icon-accordion.component";
import { OutlineAccordionComponent } from "./widgets/outline-accordion/outline-accordion.component";
import { HorizontalAccordionComponent } from "./widgets/horizontal-accordion/horizontal-accordion.component";
import { CollapseAccordionComponent } from "./widgets/collapse-accordion/collapse-accordion.component";

@Component({
  selector: 'app-accordion',
  imports: [SimpleAccordionComponent, FlushAccordionComponent, MultipleCollapseAccordionComponent,
            IconAccordionComponent, OutlineAccordionComponent, HorizontalAccordionComponent, CollapseAccordionComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})

export class AccordionComponent {

}
