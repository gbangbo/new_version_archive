import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from '../../../../../shared/components/ui/svg-icon/svg-icon.component';
import { verticalDoubleDivider } from '../../../../../shared/data/ui-kits/divider';

@Component({
  selector: 'app-vertical-double',
  imports: [CommonModule, TitleCasePipe, CardComponent, SvgIconComponent],
  templateUrl: './vertical-double.component.html',
  styleUrl: './vertical-double.component.scss'
})

export class VerticalDoubleComponent {

  public verticalDoubleDivider = verticalDoubleDivider;

}
