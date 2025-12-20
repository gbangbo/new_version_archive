import { Component } from '@angular/core';

import { InitialProgressBarComponent } from "./widgets/initial-progress-bar/initial-progress-bar.component";
import { StripedProgressBarComponent } from "./widgets/striped-progress-bar/striped-progress-bar.component";
import { AnimatedProgressBarComponent } from "./widgets/animated-progress-bar/animated-progress-bar.component";
import { MultipleBarComponent } from "./widgets/multiple-bar/multiple-bar.component";
import { NumberStepProgressComponent } from "./widgets/number-step-progress/number-step-progress.component";
import { CustomProgressBarComponent } from "./widgets/custom-progress-bar/custom-progress-bar.component";
import { SmallProgressBarComponent } from "./widgets/small-progress-bar/small-progress-bar.component";
import { LargeProgressBarComponent } from "./widgets/large-progress-bar/large-progress-bar.component";
import { CustomSizeProgressBarComponent } from "./widgets/custom-size-progress-bar/custom-size-progress-bar.component";
import { StepProgressBarComponent } from "./widgets/step-progress-bar/step-progress-bar.component";

@Component({
  selector: 'app-progress',
  imports: [InitialProgressBarComponent, StripedProgressBarComponent, AnimatedProgressBarComponent,
            MultipleBarComponent, NumberStepProgressComponent, CustomProgressBarComponent,
            SmallProgressBarComponent, LargeProgressBarComponent, CustomSizeProgressBarComponent, 
            StepProgressBarComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})

export class ProgressComponent {

}
