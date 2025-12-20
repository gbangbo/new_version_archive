import { Component } from '@angular/core';

import { TwoFactorAuthenticationComponent } from "./two-factor-authentication/two-factor-authentication.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";

@Component({
  selector: 'app-two-factor',
  imports: [TwoFactorAuthenticationComponent, EmailVerificationComponent],
  templateUrl: './two-factor.component.html',
  styleUrl: './two-factor.component.scss'
})

export class TwoFactorComponent {

}
