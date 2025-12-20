import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from "../login-form/login-form.component";

@Component({
  selector: 'app-login-bg-image-two',
  imports: [CommonModule, RouterModule, LoginFormComponent],
  templateUrl: './login-bg-image-two.component.html',
  styleUrl: './login-bg-image-two.component.scss'
})

export class LoginBgImageTwoComponent {

}
