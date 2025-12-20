import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-sweet-alert',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-sweet-alert.component.html',
  styleUrl: './login-sweet-alert.component.scss'
})

export class LoginSweetAlertComponent {

  public showPassword: boolean = false;
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(private router: Router) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      Swal.fire("Success!", "Login Success", 'success').then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/']);
        }
      });
    } else {
      Swal.fire("Error!", "Sorry, looks like some data are not filled, please try again !", "error")
    }
  }
  
}
