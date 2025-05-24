import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  if (token) {
    if (isTokenExpired(token)) {
      authService.logout();
      router.navigate(['/login']); // Add redirect
      return next(req); // Or return EMPTY to cancel request
    }

    return next(
      req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    );
  }

  return next(req);
};

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Math.floor(Date.now() / 1000);
  } catch {
    return true; // Treat invalid tokens as expired
  }
}
