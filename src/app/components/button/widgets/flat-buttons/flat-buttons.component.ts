import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { flatButton } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-flat-buttons',
  imports: [CommonModule, CardComponent],
  templateUrl: './flat-buttons.component.html',
  styleUrl: './flat-buttons.component.scss'
})

export class FlatButtonsComponent {

  public flatButton = flatButton;

}
