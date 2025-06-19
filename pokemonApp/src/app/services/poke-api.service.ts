import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient, private router: Router) { }

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
   * Given a Pokemon object, returns a string representing the URL of its corresponding image from the PokeAPI.
   * @param pokemon the Pokemon object
   * @returns a string URL of the Pokemon image
   */
  getPokemonImage(pokemon: any): string {
    const id = pokemon.id;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  /**
   * Fetches the details of a Pokemon from the PokeAPI.
   * @param pokemonUrl the PokeAPI url of the Pokemon
   * @returns an observable of the Pokemon details
   */
  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getAllPokemonsByName(name : string): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

   goToDetails(pokemonName : string){
    this.router.navigate(['pokemon-details', pokemonName]);
  }
}
