import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-progressbar',
  imports: [CommonModule,CardComponent],
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.scss'
})

export class ProgressbarComponent {

}
