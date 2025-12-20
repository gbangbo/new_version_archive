import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardDropdownButtonComponent } from "./card-dropdown-button/card-dropdown-button.component";
import { CardToggleOptions } from '../../../interface/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule, CardDropdownButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() cardClass: string;
  @Input() cardBodyClass: string;
  @Input() headerTitle: string | number;
  @Input() headerTitle2: string | number;
  @Input() dropdownType: string;
  @Input() options: CardToggleOptions[];
  @Input() padding: boolean = true;
  @Input() rightSideDetails: boolean = false;
  @Input() dropdownClass: string = '';
  @Input() headerClass: string = '';
  @Input() header: string = '';
  @Input() border: boolean = false;
  @Input() cardType: string = 'simple';
  @Input() sortDescription: string;
  @Input() buttonText: string;
  @Input() path: string;

}
