import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss',
})
export class LogoutButton {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
