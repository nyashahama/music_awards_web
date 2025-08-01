import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../cores/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar, // ← inject MatSnackBar
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      loginIdentifier: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  private isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }


  signIn() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { loginIdentifier, password } = this.loginForm.value;
    const payload = this.isEmail(loginIdentifier)
      ? { email: loginIdentifier, password }
      : { username: loginIdentifier, password };

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.snackBar.open('Welcome back!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        const token = res.token;
        console.log('JWT Token:', token);
        this.router.navigate(['/']);
      },
      error: err => {
        this.errorMsg =
          err.error?.message || 'Login failed. Please check your credentials.';
        this.snackBar.open(this.errorMsg, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        });
        this.loading = false;
      },
    });
  }
}
