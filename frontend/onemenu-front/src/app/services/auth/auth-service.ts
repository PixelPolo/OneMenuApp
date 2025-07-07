import { inject, Injectable, signal } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { User as UserAuth0 } from '@auth0/auth0-angular';
import { HttpService } from '../http/http-service';
import { EMPTY, filter, first, firstValueFrom, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// https://auth0.com/docs/quickstart/spa/angular/interactive
export class AuthService {
  private auth = inject(Auth0Service);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private http = inject(HttpService);

  currentUserSignal = signal<User | null>(null);

  private postUser(user: UserAuth0 | null | undefined) {
    if (!user) return;
    this.http
      .get<User>(`/user/${user.sub}`)
      .pipe(
        switchMap((fetchedUser) => {
          if (!fetchedUser) {
            return this.http.post('/user', this.currentUserSignal());
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe({
        error: (err: unknown) => console.error('Error posting User:', err),
      });
  }

  private setCurrentUser(user: UserAuth0) {
    this.currentUserSignal.set({
      userID: user.sub ?? '',
      email: user.email ?? '',
      name: user.name ?? '',
    });
  }

  login() {
    // this.auth.loginWithRedirect(); // -> TODO bug, never logged !
    this.auth.loginWithPopup();
    this.auth.user$
      .pipe(
        filter(Boolean), // Wait for first non-null value (user)
        first() // Complete after first valid value (user)
      )
      .subscribe((user: UserAuth0) => {
        this.setCurrentUser(user);
        this.postUser(user);
        this.router.navigate(['/overview']);
      });
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
    setTimeout(() => window.location.reload(), 500);
  }

  deleteAccount() {
    const id = this.currentUserSignal()?.userID;
    if (id) {
      this.http.delete(`/user/${id}`).subscribe({
        next: () => this.logout(),
        error: (err: unknown) => console.error('Error deleting User:', err),
      });
    }
  }

  async isLogged() {
    const user = await firstValueFrom(this.auth.user$);
    if (user) {
      this.setCurrentUser(user);
      return true;
    } else {
      this.currentUserSignal.set(null);
      return false;
    }
  }
}
