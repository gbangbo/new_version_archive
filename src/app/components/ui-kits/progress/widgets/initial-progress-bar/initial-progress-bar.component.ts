import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-initial-progress-bar',
  imports: [CommonModule, CardComponent],
  templateUrl: './initial-progress-bar.component.html',
  styleUrl: './initial-progress-bar.component.scss'
})

export class InitialProgressBarComponent {

}
