import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { VerificationCodeComponent } from "../verification-code/verification-code.component";

@Component({
  selector: 'app-email-verification',
  imports: [CardComponent, VerificationCodeComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss'
})

export class EmailVerificationComponent {

}
