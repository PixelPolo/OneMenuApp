import { Component, inject, signal } from '@angular/core';
import { HttpService } from '../../services/http/http-service';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';
import { Invitation } from '../../models/invitation.model';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { Session as SessionModel } from '../../models/session.model';
import { SessionDetail } from '../../components/session-detail/session-detail';
import { SessionJoin } from '../../components/session-join/session-join';

@Component({
  selector: 'app-session',
  imports: [SessionDetail, SessionJoin],
  templateUrl: './session.html',
  styleUrl: './session.scss',
})
export class Session {
  private http = inject(HttpService);
  private auth = inject(AuthService);
  private router = inject(Router);

  invitations = signal<Invitation[]>([]);
  sessions = signal<SessionModel[]>([]);
  selectedSession = signal<SessionModel | null>(null);
  isVoting = signal<boolean>(false);

  constructor() {
    this.loadInvitations();
  }

  loadInvitations() {
    const userID = this.auth.currentUserSignal()?.userID;
    this.http
      .get<Invitation[]>(`/invitation/user/${userID}`)
      .pipe(
        switchMap((invitations: Invitation[]) => {
          const sessionRequests: Observable<SessionModel>[] = invitations.map(
            (invitation) => this.http.get(`/session/${invitation.sessionID}`)
          );
          return forkJoin(sessionRequests);
        })
      )
      .subscribe((sessions: SessionModel[]) => {
        this.sessions.set(sessions);
      });
  }

  selectSession(session: SessionModel) {
    if (this.selectedSession() === session) {
      this.selectedSession.set(null);
    } else {
      this.selectedSession.set(session);
    }
  }

  voteSession() {
    this.router.navigate(['/vote', this.selectedSession()?.sessionID]);
  }

  showResults(): void {
    this.router.navigate(['/result', this.selectedSession()?.sessionID]);
  }
}
