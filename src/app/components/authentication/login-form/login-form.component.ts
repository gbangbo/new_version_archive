import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent {

  @Input() path: string;

  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword =! this.showPassword;
  }
  
}
