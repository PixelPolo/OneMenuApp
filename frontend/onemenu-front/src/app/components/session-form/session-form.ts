import { Component, effect, inject, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../services/http/http-service';
import { AuthService } from '../../services/auth/auth-service';
import { Session } from '../../models/session.model';
import { switchMap } from 'rxjs';
import { Invitation } from '../../models/invitation.model';

@Component({
  selector: 'app-session-form',
  imports: [ReactiveFormsModule],
  templateUrl: './session-form.html',
  styleUrl: './session-form.scss',
})
export class SessionForm {
  private http = inject(HttpService);
  private auth = inject(AuthService);

  sessionToEdit = input<Session | null>(null);

  sessionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    sessionDate: new FormControl('', Validators.required),
  });

  cancelEvent = output<void>();
  saveEvent = output<void>();

  constructor() {
    effect(() => {
      const session = this.sessionToEdit();
      if (session) {
        this.sessionForm.patchValue({
          title: session.title,
          description: session.description,
          sessionDate: session.sessionDate.slice(0, 16),
        });
      }
    });
  }

  onSubmit() {
    // Get the values to post/put a Session
    const userID = this.auth.currentUserSignal()!.userID;
    const form = this.sessionForm.value;
    const sessionToSend: Session = {
      title: form.title!,
      description: form.description!,
      sessionDate: new Date(form.sessionDate!).toISOString(),
      userID: userID,
    };
    // Post or put the Session
    if (this.sessionToEdit()) {
      this.http
        .put(`/session/${this.sessionToEdit()!.sessionID}`, sessionToSend)
        .subscribe({
          next: () => this.endSubmit(),
          error: (err: unknown) => console.error('Error saving Session:', err),
        });
    } else {
      this.http
        .post('/session', sessionToSend)
        .pipe(
          switchMap((session: Session) => {
            const invitation: Invitation = {
              sessionID: session.sessionID!,
              userID: userID,
            };
            return this.http.post('/invitation/', invitation);
          })
        )
        .subscribe({
          next: () => this.endSubmit(),
          error: (err: unknown) => console.error('Error saving Session:', err),
        });
    }
  }

  private endSubmit() {
    this.sessionForm.reset();
    this.saveEvent.emit();
  }
}
