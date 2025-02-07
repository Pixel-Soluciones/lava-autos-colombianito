import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'models/user.model';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    FloatLabel,
    InputTextModule,
    PasswordModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user!: User;

  loginForm = new FormGroup({
    user: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.loginForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ups',
        text: 'Ambos campos son requeridos',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.authService
        .login(
          this.loginForm.get('user')?.value!,
          this.loginForm.get('password')?.value!
        )
        .subscribe({
          next: (res) => {
            console.log('Usuario logueado');
            this.loginForm.reset();
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Atencion',
              text: 'Su usuario o contraseña es icorrecto',
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
    }
  }
}
