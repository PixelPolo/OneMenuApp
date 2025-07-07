import { Component } from '@angular/core';
import { LogoutButton } from '../../components/auth/logout-button/logout-button';
import { DeleteButton } from '../../components/auth/delete-button/delete-button';
import { Terms } from '../terms/terms';

@Component({
  selector: 'app-profile',
  imports: [LogoutButton, DeleteButton, Terms],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {}
