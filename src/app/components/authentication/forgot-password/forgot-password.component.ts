import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})

export class ForgotPasswordComponent {

  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword =! this.showPassword;
  }
  
}
