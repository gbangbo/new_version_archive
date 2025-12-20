import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-multiple-bar',
  imports: [CommonModule, CardComponent],
  templateUrl: './multiple-bar.component.html',
  styleUrl: './multiple-bar.component.scss'
})

export class MultipleBarComponent {

}
