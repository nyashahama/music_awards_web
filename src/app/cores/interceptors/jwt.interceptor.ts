import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token && isTokenExpired(token)) {
    authService.logout();
    return next(req);
  }

  const authReq = token ? req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }) : req;

  return next(authReq);
};

function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp < (Date.now() / 1000);
}
