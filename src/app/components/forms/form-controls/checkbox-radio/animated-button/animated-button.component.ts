import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { paymentDetails, socialMedia } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-animated-button',
  imports: [CardComponent],
  templateUrl: './animated-button.component.html',
  styleUrl: './animated-button.component.scss'
})

export class AnimatedButtonComponent {

  public paymentDetails = paymentDetails;
  public socialMedia = socialMedia;

}
