import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-custom-progress-bar',
  imports: [CommonModule, CardComponent],
  templateUrl: './custom-progress-bar.component.html',
  styleUrl: './custom-progress-bar.component.scss'
})

export class CustomProgressBarComponent {

}
