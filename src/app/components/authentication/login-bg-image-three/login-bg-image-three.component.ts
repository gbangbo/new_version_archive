import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from "../login-form/login-form.component";

@Component({
  selector: 'app-login-bg-image-three',
  imports: [CommonModule, RouterModule, LoginFormComponent],
  templateUrl: './login-bg-image-three.component.html',
  styleUrl: './login-bg-image-three.component.scss'
})

export class LoginBgImageThreeComponent {

}
