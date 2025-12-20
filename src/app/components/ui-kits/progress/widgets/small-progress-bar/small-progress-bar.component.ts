import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-small-progress-bar',
  imports: [CommonModule, CardComponent],
  templateUrl: './small-progress-bar.component.html',
  styleUrl: './small-progress-bar.component.scss'
})

export class SmallProgressBarComponent {

}
