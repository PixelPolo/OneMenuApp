import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-login-button',
  imports: [],
  templateUrl: './login-button.html',
  styleUrl: './login-button.scss',
})
export class LoginButton {
  private auth = inject(AuthService);

  login() {
    this.auth.login();
  }
}
