import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-border-types',
  imports: [TitleCasePipe, CardComponent],
  templateUrl: './border-types.component.html',
  styleUrl: './border-types.component.scss'
})

export class BorderTypesComponent {

  @Input() borderType: string;

}
