import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-project-summary-card',
  imports: [CommonModule, CardComponent],
  templateUrl: './project-summary-card.component.html',
  styleUrl: './project-summary-card.component.scss'
})

export class ProjectSummaryCardComponent {

  public item: number[] = Array.from({ length: 12 }, (_, index) => index);
  
}
