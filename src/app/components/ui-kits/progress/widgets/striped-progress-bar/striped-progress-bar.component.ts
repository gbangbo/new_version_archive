import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-striped-progress-bar',
  imports: [CommonModule, CardComponent],
  templateUrl: './striped-progress-bar.component.html',
  styleUrl: './striped-progress-bar.component.scss'
})

export class StripedProgressBarComponent {

}
