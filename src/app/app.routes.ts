import { Routes } from '@angular/router';
import { LeagueComponent } from './pages/league/league.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'league', component: LeagueComponent },
  { 
    path: 'team/:id', 
    loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent)
  },
  { 
    path: 'team/:teamId/player/:playerId', 
    loadComponent: () => import('./pages/player/player.component').then(m => m.PlayerComponent)
  }
];
