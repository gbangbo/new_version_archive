import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unlock-user',
  imports: [RouterModule],
  templateUrl: './unlock-user.component.html',
  styleUrl: './unlock-user.component.scss'
})

export class UnlockUserComponent {

  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword =! this.showPassword;
  }
  
}
