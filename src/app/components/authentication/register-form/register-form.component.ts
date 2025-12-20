import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})

export class RegisterFormComponent {

  @Input() path: string;
  
  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword =! this.showPassword;
  }
  
}
