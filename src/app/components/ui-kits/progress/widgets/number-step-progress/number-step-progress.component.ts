import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-number-step-progress',
  imports: [CommonModule, CardComponent],
  templateUrl: './number-step-progress.component.html',
  styleUrl: './number-step-progress.component.scss'
})

export class NumberStepProgressComponent {

}
