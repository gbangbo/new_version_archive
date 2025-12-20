import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-custom-size-progress-bar',
  imports: [CommonModule, CardComponent],
  templateUrl: './custom-size-progress-bar.component.html',
  styleUrl: './custom-size-progress-bar.component.scss'
})

export class CustomSizeProgressBarComponent {

}
