import { Component } from '@angular/core';

import { CardPlaceholderComponent } from "./widgets/card-placeholder/card-placeholder.component";
import { WidthSizingPlaceholderComponent } from "./widgets/width-sizing-placeholder/width-sizing-placeholder.component";
import { AnimationPlaceholderComponent } from "./widgets/animation-placeholder/animation-placeholder.component";
import { CustomAnimationPlaceholderComponent } from "./widgets/custom-animation-placeholder/custom-animation-placeholder.component";
import { ColorPlaceholderComponent } from "./widgets/color-placeholder/color-placeholder.component";

@Component({
  selector: 'app-placeholders',
  imports: [CardPlaceholderComponent, WidthSizingPlaceholderComponent, AnimationPlaceholderComponent, 
            CustomAnimationPlaceholderComponent, ColorPlaceholderComponent],
  templateUrl: './placeholders.component.html',
  styleUrl: './placeholders.component.scss'
})

export class PlaceholdersComponent {

}
