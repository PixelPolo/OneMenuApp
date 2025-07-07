import { Component, signal } from '@angular/core';
import { LoginButton } from '../../components/auth/login-button/login-button';
import { NgOptimizedImage } from '@angular/common';
import { Terms } from '../terms/terms';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, LoginButton, Terms],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  showTerms = signal<boolean>(false);
}
