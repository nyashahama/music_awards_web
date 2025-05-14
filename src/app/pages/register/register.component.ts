import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: [],
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Custom validator for password matching
  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    // Mark all fields as touched to show validation messages
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    // Remove confirmPassword from payload before sending
    const { confirmPassword, ...userData } = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: () => {
        // Redirect to login
        this.router.navigate(['/login']);
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg =
          err.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      },
    });
  }
}
