import { Component } from '@angular/core';

import { HeadingComponent } from "./widgets/heading/heading.component";
import { ColoredHeadingComponent } from "./widgets/colored-heading/colored-heading.component";
import { FontWeightComponent } from "./widgets/font-weight/font-weight.component";
import { ListingTypographyComponent } from "./widgets/listing-typography/listing-typography.component";
import { DisplayHeadingComponent } from "./widgets/display-heading/display-heading.component";
import { InlineTextElementComponent } from "./widgets/inline-text-element/inline-text-element.component";
import { TextColorsComponent } from "./widgets/text-colors/text-colors.component";
import { BlockQuoteComponent } from "./widgets/block-quote/block-quote.component";

@Component({
  selector: 'app-typography',
  imports: [HeadingComponent, ColoredHeadingComponent, FontWeightComponent,
            ListingTypographyComponent, DisplayHeadingComponent, InlineTextElementComponent, 
            TextColorsComponent, BlockQuoteComponent],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss'
})

export class TypographyComponent {

}
