import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BarRatingModule } from 'ngx-bar-rating';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-reset-rating',
  imports: [CommonModule, ReactiveFormsModule, BarRatingModule, CardComponent],
  templateUrl: './reset-rating.component.html',
  styleUrl: './reset-rating.component.scss'
})

export class ResetRatingComponent {

  public faoRate = 3;
  public faoRated = false;

  onFaoRate(e: number) {
    this.faoRated = true;
    this.faoRate = e;
  }

  faoReset() {
    this.faoRated = false;
    this.faoRate = 3;
  }

}
