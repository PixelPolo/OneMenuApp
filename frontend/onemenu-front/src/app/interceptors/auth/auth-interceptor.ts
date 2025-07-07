import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { from, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // If not the backend api, do not intercept
  if (!req.url.startsWith(environment.API_URL)) {
    return next(req);
  }

  // Get the token and add it as Bearer
  const auth = inject(AuthService);
  return from(auth.getAccessTokenSilently()).pipe(
    switchMap((token) => {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(authReq);
    })
  );
};
