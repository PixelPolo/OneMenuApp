import { Component, inject, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../services/http/http-service';
import { AuthService } from '../../services/auth/auth-service';
import { Invitation } from '../../models/invitation.model';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-session-join',
  imports: [ReactiveFormsModule],
  templateUrl: './session-join.html',
  styleUrl: './session-join.scss',
})
export class SessionJoin {
  private http = inject(HttpService);
  private auth = inject(AuthService);

  joinForm = new FormGroup({
    id: new FormControl('', Validators.required),
  });

  errorMsg = signal<string>('');
  saveEvent = output<void>();

  onSubmit() {
    const sessionID = this.joinForm.value.id;
    const userID = this.auth.currentUserSignal()?.userID;
    const newInvitation: Invitation = {
      userID: userID!,
      sessionID: sessionID!,
    };
    // Check if the format
    if (!this.checkUUID(sessionID!)) {
      this.errorMsg.set('ID de session invalide');
      console.log(this.errorMsg());
      return;
    }
    this.http
      .get(`/session/${sessionID}`)
      .pipe(
        switchMap((session) => {
          // Check if the session exists
          if (!session) {
            this.errorMsg.set('Session introuvable');
            console.log(this.errorMsg());
            return EMPTY;
          } else {
            return this.http.get(`/invitation/${sessionID}/${userID}`);
          }
        }),
        switchMap((invitation) => {
          // Check if already joined
          if (invitation) {
            this.errorMsg.set('Vous avez déjà rejoint cette session');
            console.log(this.errorMsg());
            return EMPTY;
          } else {
            return this.http.post(`/invitation`, newInvitation);
          }
        })
      )
      .subscribe({
        next: () => this.saveEvent.emit(),
        error: (err: unknown) => console.error('Error saving Invitation:', err),
      });
  }

  private checkUUID(value: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }
}
