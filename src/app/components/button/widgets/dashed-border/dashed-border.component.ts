import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { dashedBorder } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-dashed-border',
  imports: [CommonModule, CardComponent],
  templateUrl: './dashed-border.component.html',
  styleUrl: './dashed-border.component.scss'
})

export class DashedBorderComponent {

  public dashedBorder = dashedBorder;

}
