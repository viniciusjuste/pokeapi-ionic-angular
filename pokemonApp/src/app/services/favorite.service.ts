import { Injectable } from '@angular/core';
import { PokeApiService } from './poke-api.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  storageKey = 'favoritePokemons';
  favoritePokemons: any[] = [];

  constructor(private pokeApiService: PokeApiService) { }

  /**
   * Retrieves the list of favorite Pokemon IDs from local storage.
   * @returns An array of favorite Pokemon IDs. If no favorites are found, an empty array is returned.
   */
  getFavoritePokemons(): any[] {
    const favoritePokemons = localStorage.getItem('favoritePokemons');
    return favoritePokemons ? JSON.parse(favoritePokemons) : [];
  }

  storeFavoritePokemons(pokemons: any[]) {
    const pokemonId = pokemons;
    const request = pokemonId.map(id => this.pokeApiService.getAllPokemonsByNameOrId(id));

    if (request.length > 0) {
      forkJoin(request).subscribe((pokemons: any) => {
        this.favoritePokemons = pokemons;
      });
    } else {
      this.favoritePokemons = [];
    }
  }

  showStoragePokemons() {
    return this.favoritePokemons;
  }

  /**
   * Toggles the favorite status of the given Pokemon ID. If the ID is in the list of favorites, it is removed.
   * If the ID is not in the list of favorites, it is added.
   * @param pokemonId the Pokemon ID to toggle
   */
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

  /**
   * Checks if the given Pokemon ID is in the list of favorite Pokemon IDs.
   * @param pokemonId the Pokemon ID to check
   * @returns true if the Pokemon ID is a favorite, false otherwise
   */
  isFavorite(pokemonId: number): boolean {
    return this.getFavoritePokemons().includes(pokemonId);
  }
}
