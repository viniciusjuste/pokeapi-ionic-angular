import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  /**
   * Fetches a list of Pokemon from the PokeAPI.
   * @param limit the maximum number of Pokemon to return
   * @param offset the starting index of the Pokemon to return
   * @returns an observable of the Pokemon list
   */
  getPokemonList(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
  }

  /**
   * Returns the id of a Pokemon given its PokeAPI url.
   * @param pokemonUrl the PokeAPI url of the Pokemon
   * @returns the id of the Pokemon
   */
  getPokemonId(pokemonUrl: string) {
    const parts = pokemonUrl.split('/');
    return parts[parts.length - 2];
  }

  /**
   * Returns the image URL of a Pokemon given its PokeAPI url.
   * @param pokemonUrl the PokeAPI url of the Pokemon
   * @returns the URL of the Pokemon image
   */
  getPokemonImage(pokemonUrl: string) {
    const id = this.getPokemonId(pokemonUrl);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
