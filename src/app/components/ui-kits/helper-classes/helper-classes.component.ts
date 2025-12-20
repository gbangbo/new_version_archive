import { Component } from '@angular/core';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { BordersComponent } from "./widgets/borders/borders.component";
import { borderRadiusClasses, colors, borderWidth, additiveBorder, subtractiveBorder, additiveRadius, extendedBackgroundColors, 
         borderPosition, colorsTwo, borderTypes } from '../../../shared/data/ui-kits/helper-classes';
import { ExtenderBackgroundColorComponent } from "./widgets/extender-background-color/extender-background-color.component";
import { BorderPositionComponent } from "./widgets/border-position/border-position.component";
import { ImageSizeComponent } from "./widgets/image-size/image-size.component";
import { FontStyleComponent } from "./widgets/font-style/font-style.component";
import { FontWeightComponent } from './widgets/font-weight/font-weight.component';
import { TextColorsComponent } from './widgets/text-colors/text-colors.component';
import { PaddingComponent } from "./widgets/padding/padding.component";
import { BorderTypesComponent } from "./widgets/border-types/border-types.component";
import { OneSidePaddingComponent } from "./widgets/one-side-padding/one-side-padding.component";
import { OneSideMarginComponent } from "./widgets/one-side-margin/one-side-margin.component";
import { MarginsComponent } from "./widgets/margins/margins.component";
import { FontSizeComponent } from "./widgets/font-size/font-size.component";
import { AdditiveRadiusComponent } from "./widgets/additive-radius/additive-radius.component";

@Component({
  selector: 'app-helper-classes',
  imports: [CardComponent, BordersComponent, ExtenderBackgroundColorComponent,
    BorderPositionComponent, ImageSizeComponent, FontStyleComponent,
    FontWeightComponent, TextColorsComponent, PaddingComponent,
    BorderTypesComponent, OneSidePaddingComponent, OneSideMarginComponent,
    MarginsComponent, FontSizeComponent, AdditiveRadiusComponent],
  templateUrl: './helper-classes.component.html',
  styleUrl: './helper-classes.component.scss'
})

export class HelperClassesComponent {

  public borderRadiusClasses = borderRadiusClasses;
  public colors = colors;
  public colorsTwo = colorsTwo;
  public borderWidth = borderWidth;
  public additiveBorder = additiveBorder;
  public subtractiveBorder = subtractiveBorder;
  public additiveRadius = additiveRadius;
  public extendedBackgroundColors = extendedBackgroundColors;
  public borderPosition = borderPosition;
  public borderTypes = borderTypes;
  
}
