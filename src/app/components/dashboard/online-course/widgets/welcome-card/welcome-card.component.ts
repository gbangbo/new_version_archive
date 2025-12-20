import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-welcome-card',
  imports: [CardComponent],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.scss'
})

export class WelcomeCardComponent {

}
