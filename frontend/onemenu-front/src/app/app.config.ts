import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './interceptors/auth/auth-interceptor';

// https://auth0.com/docs/quickstart/spa/angular/interactive
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Router
    provideRouter(routes),
    // HttpClient
    provideHttpClient(
      // Fetch method
      withFetch(),
      // Interceptors
      withInterceptors([authInterceptor])
    ),
    // Auth0 login
    provideAuth0({
      domain: environment.AUTH0_DOMAIN,
      clientId: environment.AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
        // The audience is for the interceptor
        audience: environment.AUTH0_API_AUDIENCE,
      },
    }),
  ],
};
