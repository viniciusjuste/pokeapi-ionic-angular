import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) { }

  /**
   * Fetches a list of Pokemon from the PokeAPI.
   * @param limit the maximum number of Pokemon to return
   * @param offset the starting index of the Pokemon to return
   * @returns an observable of the Pokemon list
   */
  getPokemonList(limit: number, offset: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }
}
