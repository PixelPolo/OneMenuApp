/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, inject, signal } from '@angular/core';
import { HttpService } from '../../services/http/http-service';
import { SessionForm } from '../../components/session-form/session-form';
import { Session } from '../../models/session.model';
import { SessionDetail } from '../../components/session-detail/session-detail';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [SessionForm, SessionDetail],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  private http = inject(HttpService);
  private auth = inject(AuthService);
  private router = inject(Router);

  sessions = signal<Session[]>([]);
  creatingSession = signal<boolean>(false);
  selectedSession = signal<Session | null>(null);
  clipboardCopied = signal<boolean>(false);

  constructor() {
    this.loadSessions();
  }

  private loadSessions() {
    const userID = this.auth.currentUserSignal()?.userID;
    this.http
      .get<Session[]>(`/session/user/${userID}`)
      .subscribe((sessions) => {
        this.sessions.set(sessions);
      });
  }

  selectSession(session: Session) {
    if (this.selectedSession() === session) {
      this.selectedSession.set(null);
      return;
    }
    this.selectedSession.set(session);
  }

  shareSession() {
    const id = this.selectedSession()?.sessionID;
    navigator.clipboard.writeText(id!);
    this.clipboardCopied.set(true);
    setTimeout(() => this.clipboardCopied.set(false), 5000);
    if (
      !confirm(
        `Identifiant de la session copié dans le presse-papier! Voulez-vous le partager ?`
      )
    )
      return;
    if (navigator.share) {
      navigator
        .share({
          text: id,
        })
        .catch((error: unknown) =>
          console.error('Error sharing session :', error)
        );
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(id!)}`;
      window.open(whatsappUrl, '_blank');
    }
  }

  editSession() {
    this.router.navigate(['/edit', this.selectedSession()?.sessionID]);
  }

  deleteSession() {
    if (!confirm('ATTENTION - êtes-vous sûr de vouloir supprimer la session ?'))
      return;
    if (!confirm("ATTENTION - désolé d'insister... êtes-vous vraiment sûr ?"))
      return;
    const id = this.selectedSession()?.sessionID;
    this.http.delete(`/session/${id}`).subscribe({
      next: () => {
        this.selectedSession.set(null);
        this.loadSessions();
      },
      error: (err: unknown) => console.error('Error deleting Session :', err),
    });
  }

  handleFormCancel(_event: void) {
    this.creatingSession.set(false);
    this.selectedSession.set(null);
  }

  handleFormSave(_event: void) {
    this.creatingSession.set(false);
    this.selectedSession.set(null);
    this.loadSessions();
  }
}
