import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-large-progress-bar',
  imports: [CommonModule, CardComponent],
  templateUrl: './large-progress-bar.component.html',
  styleUrl: './large-progress-bar.component.scss'
})

export class LargeProgressBarComponent {

}
