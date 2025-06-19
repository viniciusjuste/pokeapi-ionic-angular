import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  storageKey = 'favoritePokemons';

  constructor() { }

   getFavoritePokemons(): any[] {
    const favoritePokemons = localStorage.getItem('favoritePokemons');
    return favoritePokemons ? JSON.parse(favoritePokemons) : [];
  }

  toggleFavorite(pokemonId: any) {
    const favorites = this.getFavoritePokemons();
    const index = favorites.indexOf(pokemonId);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(pokemonId);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

   isFavorite(pokemonId: number): boolean {
    return this.getFavoritePokemons().includes(pokemonId);
  }
}
