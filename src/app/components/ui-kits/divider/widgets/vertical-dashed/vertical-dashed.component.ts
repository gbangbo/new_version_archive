import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from '../../../../../shared/components/ui/svg-icon/svg-icon.component';
import { verticalDashedDivider } from '../../../../../shared/data/ui-kits/divider';

@Component({
  selector: 'app-vertical-dashed',
  imports: [CommonModule, TitleCasePipe, CardComponent, SvgIconComponent],
  templateUrl: './vertical-dashed.component.html',
  styleUrl: './vertical-dashed.component.scss'
})

export class VerticalDashedComponent {

  public verticalDashedDivider = verticalDashedDivider;

}
