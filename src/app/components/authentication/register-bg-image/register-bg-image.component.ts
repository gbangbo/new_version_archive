import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-register-bg-image',
  imports: [CommonModule, RouterModule, RegisterFormComponent],
  templateUrl: './register-bg-image.component.html',
  styleUrl: './register-bg-image.component.scss'
})

export class RegisterBgImageComponent {

}
