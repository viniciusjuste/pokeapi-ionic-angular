import { Routes } from '@angular/router';
import { PokemonStatisticsComponent } from './features/pages/pokemon-statistics/pokemon-statistics.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pokemon-details/:name', component: PokemonStatisticsComponent
  }
];
