import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";

@Component({
  selector: 'app-welcome-card',
  imports: [CommonModule, RouterModule, CardComponent, CounterComponent],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.scss'
})

export class WelcomeCardComponent {

}
