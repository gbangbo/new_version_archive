import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { stepProgressBar } from '../../../../../shared/data/ui-kits/progress-bar';

@Component({
  selector: 'app-step-progress-bar',
  imports: [CommonModule, CardComponent, FeatherIconComponent],
  templateUrl: './step-progress-bar.component.html',
  styleUrl: './step-progress-bar.component.scss'
})

export class StepProgressBarComponent {

  public stepProgressBar = stepProgressBar;
  public activeStep = 3;

  handleStep(value: number) {
    this.activeStep = value;
  }
  
}
