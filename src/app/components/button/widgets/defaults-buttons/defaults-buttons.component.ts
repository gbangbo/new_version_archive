import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { flatButton } from '../../../../shared/data/buttons';
import { TooltipComponent } from "../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-defaults-buttons',
  imports: [CardComponent, CommonModule, TooltipComponent],
  templateUrl: './defaults-buttons.component.html',
  styleUrl: './defaults-buttons.component.scss'
})

export class DefaultsButtonsComponent {

    public defaultButton = flatButton;

}
