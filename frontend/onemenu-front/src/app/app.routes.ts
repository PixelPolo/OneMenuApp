import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { NotFound } from './views/not-found/not-found';
import { Overview } from './views/overview/overview';
import { Vote } from './views/vote/vote';
import { Create } from './views/create/create';
import { Profile } from './views/profile/profile';
import { authGuard } from './guards/auth/auth-guard';
import { Edit } from './views/edit/edit';
import { Session } from './views/session/session';
import { Result } from './views/result/result';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
    title: 'Home',
  },
  {
    path: 'overview',
    component: Overview,
    title: 'Overview',
    canActivate: [authGuard],
  },
  {
    path: 'session',
    component: Session,
    title: 'Session',
    canActivate: [authGuard],
  },
  {
    path: 'vote/:sessionID',
    component: Vote,
    title: 'Vote',
    canActivate: [authGuard],
  },
  {
    path: 'result/:sessionID',
    component: Result,
    title: 'Result',
    canActivate: [authGuard],
  },
  {
    path: 'create',
    component: Create,
    title: 'Create',
    canActivate: [authGuard],
  },
  {
    path: 'edit/:sessionID',
    component: Edit,
    title: 'Edit session',
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: Profile,
    title: 'Profile',
    canActivate: [authGuard],
  },
  {
    path: '404',
    component: NotFound,
    title: '404',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
