import { Component } from '@angular/core';

import { BasicDropdownComponent } from "./widgets/basic-dropdown/basic-dropdown.component";
import { RoundedDropdownComponent } from "./widgets/rounded-dropdown/rounded-dropdown.component";
import { SplitDropdownComponent } from "./widgets/split-dropdown/split-dropdown.component";
import { HeadingDropdownComponent } from "./widgets/heading-dropdown/heading-dropdown.component";
import { InputTypeDropdownComponent } from "./widgets/input-type-dropdown/input-type-dropdown.component";
import { DarkDropdownComponent } from "./widgets/dark-dropdown/dark-dropdown.component";
import { UniqueDropdownComponent } from "./widgets/unique-dropdown/unique-dropdown.component";
import { JustifyContentsComponent } from "./widgets/justify-contents/justify-contents.component";
import { AlignmentOptionDropdownComponent } from "./widgets/alignment-option-dropdown/alignment-option-dropdown.component";
import { HelperCardsComponent } from "./widgets/helper-cards/helper-cards.component";
import { DividerDropdownComponent } from "./widgets/divider-dropdown/divider-dropdown.component";
import { DropdownSizingComponent } from "./widgets/dropdown-sizing/dropdown-sizing.component";
import { DropdownOptionsComponent } from "./widgets/dropdown-options/dropdown-options.component";

@Component({
  selector: 'app-dropdown',
  imports: [BasicDropdownComponent, RoundedDropdownComponent, SplitDropdownComponent,
    HeadingDropdownComponent, InputTypeDropdownComponent, DarkDropdownComponent,
    UniqueDropdownComponent, JustifyContentsComponent, AlignmentOptionDropdownComponent,
    HelperCardsComponent, DividerDropdownComponent, DropdownSizingComponent, DropdownOptionsComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})

export class DropdownComponent {

}
