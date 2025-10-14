import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../cores/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styles: [`
    .modal-overlay {
      animation: fadeIn 0.2s ease-out;
    }
    .modal-content {
      animation: slideIn 0.2s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() activeLink: string = '';

  isLoggedIn = false;
  username: string | null = null;
  private userSub!: Subscription;

  userAvatar?: string;
  isProfileDropdownOpen = false;
  isMobileMenuOpen = false;

  // Login Modal properties
  showLoginModal = false;
  loginForm: FormGroup;
  loginLoading = false;
  loginErrorMsg = '';

  // Register Modal properties
  showRegisterModal = false;
  registerForm: FormGroup;
  registerLoading = false;
  registerErrorMsg = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Login Form
    this.loginForm = this.fb.group({
      loginIdentifier: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    // Register Form
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
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.username = user;
      this.isLoggedIn = !!user;
    });
  }

  // Custom validator for password matching
  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  // Login Modal methods
  openLoginModal(): void {
    this.showLoginModal = true;
    this.showRegisterModal = false;
    this.loginErrorMsg = '';
    this.loginForm.reset();
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
    this.loginLoading = false;
    this.loginErrorMsg = '';
  }

  switchToRegister(): void {
    this.closeLoginModal();
    this.openRegisterModal();
  }

  private isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.loginLoading = true;
    this.loginErrorMsg = '';

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
        this.loginLoading = false;
        this.closeLoginModal();

        // Navigate to home or refresh
        setTimeout(() => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }, 500);
      },
      error: (err) => {
        this.loginErrorMsg = err.error?.message || 'Login failed. Please check your credentials.';
        this.loginLoading = false;
      },
    });
  }

  // Register Modal methods
  openRegisterModal(): void {
    this.showRegisterModal = true;
    this.showLoginModal = false;
    this.registerErrorMsg = '';
    this.registerForm.reset();
  }

  closeRegisterModal(): void {
    this.showRegisterModal = false;
    this.registerLoading = false;
    this.registerErrorMsg = '';
  }

  switchToLogin(): void {
    this.closeRegisterModal();
    this.openLoginModal();
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.registerLoading = true;
    this.registerErrorMsg = '';

    // Remove confirmPassword from payload
    const { confirmPassword, ...userData } = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: () => {
        this.snackBar.open('Account created successfully! Please login.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.registerLoading = false;
        this.closeRegisterModal();

        // Switch to login modal
        setTimeout(() => {
          this.openLoginModal();
        }, 500);
      },
      error: (err) => {
        this.registerErrorMsg = err.error?.message || 'Registration failed. Please try again.';
        this.registerLoading = false;
      },
    });
  }

  // Profile dropdown methods
  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  closeProfileDropdown(): void {
    this.isProfileDropdownOpen = false;
  }

  // Mobile menu methods
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open('Logged out successfully', 'Close', {
      duration: 2000,
      verticalPosition: 'top',
    });
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
