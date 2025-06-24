import { Routes } from '@angular/router';
import { PokemonStatisticsComponent } from './features/pages/pokemon-statistics/pokemon-statistics.component';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },

  {
    path: 'pokemon-details/:name', component: PokemonStatisticsComponent
  }
];
