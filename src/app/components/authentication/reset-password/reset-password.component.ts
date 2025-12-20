import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})

export class ResetPasswordComponent {

  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword =! this.showPassword;
  }
  
}
