import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-max-length-elements',
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './max-length-elements.component.html',
  styleUrl: './max-length-elements.component.scss'
})

export class MaxLengthElementsComponent {

  public basicMaxLength = 10;
  public basicText = '';
  public basicLengthVisible: boolean = false;

  public thresholdLength = 20;
  public thresholdText = '';
  public thresholdValueVisible: boolean = false;

  public showBadgeLength = 15;
  public showBadgeText = '';
  public showBadgeLengthVisible: boolean = false;
  public showBadge: boolean = true;

  public customizedTextLength = 30;
  public customizedText = '';
  public customizedTextVisible: boolean = false;

  public textAreaLength = 25;
  public textAreaText = '';
  public textAreaTextVisible: boolean = false;

  public topLeftLength = 15;
  public topLeftText = '';
  public topLeftBadgeVisible: boolean = false;

  public topRightLength = 15;
  public topRightText = '';
  public topRightBadgeVisible: boolean = false;

  public bottomRightLength = 15;
  public bottomRightText = '';
  public bottomRightBadgeVisible: boolean = false;

  public bottomLeftLength = 15;
  public bottomLeftText = '';
  public bottomLeftBadgeVisible: boolean = false;

}
