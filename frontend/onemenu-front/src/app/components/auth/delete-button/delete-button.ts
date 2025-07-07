import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-delete-button',
  imports: [],
  templateUrl: './delete-button.html',
  styleUrl: './delete-button.scss',
})
export class DeleteButton {
  private auth = inject(AuthService);

  delete() {
    if (
      !confirm('ATTENTION - êtes-vous sûr de vouloir supprimer votre compte ?')
    )
      return;
    if (!confirm("ATTENTION - désolé d'insister... êtes-vous vraiment sûr ?"))
      return;
    this.auth.deleteAccount();
  }
}
