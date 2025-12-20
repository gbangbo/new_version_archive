import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegisterFormComponent } from "../register-form/register-form.component";

@Component({
  selector: 'app-register',
  imports: [RouterModule, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

}
