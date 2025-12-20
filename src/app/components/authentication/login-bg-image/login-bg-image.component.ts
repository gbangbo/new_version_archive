import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from "../login-form/login-form.component";

@Component({
  selector: 'app-login-bg-image',
  imports: [CommonModule, RouterModule, LoginFormComponent],
  templateUrl: './login-bg-image.component.html',
  styleUrl: './login-bg-image.component.scss'
})

export class LoginBgImageComponent {

}
