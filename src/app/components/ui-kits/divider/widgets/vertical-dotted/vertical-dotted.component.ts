import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from '../../../../../shared/components/ui/svg-icon/svg-icon.component';
import { verticalDottedDivider } from '../../../../../shared/data/ui-kits/divider';

@Component({
  selector: 'app-vertical-dotted',
  imports: [CommonModule, TitleCasePipe, CardComponent, SvgIconComponent],
  templateUrl: './vertical-dotted.component.html',
  styleUrl: './vertical-dotted.component.scss'
})

export class VerticalDottedComponent {

  public verticalDottedDivider = verticalDottedDivider;

}
