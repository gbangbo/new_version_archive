import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-animated-progress-bar',
  imports: [CommonModule, CardComponent],
  templateUrl: './animated-progress-bar.component.html',
  styleUrl: './animated-progress-bar.component.scss'
})

export class AnimatedProgressBarComponent {

}
