import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-register-bg-image-two',
  imports: [CommonModule, RouterModule, RegisterFormComponent],
  templateUrl: './register-bg-image-two.component.html',
  styleUrl: './register-bg-image-two.component.scss'
})

export class RegisterBgImageTwoComponent {

}
