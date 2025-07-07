import { Component, input } from '@angular/core';
import { Session } from '../../models/session.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-session-detail',
  imports: [DatePipe],
  templateUrl: './session-detail.html',
  styleUrl: './session-detail.scss',
})
export class SessionDetail {
  session = input.required<Session>();
}
