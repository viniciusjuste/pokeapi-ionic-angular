import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PokemonTypeColorService } from 'src/app/services/pokemon-type-color.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [IonicModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

  faMagnifyingGlass = faMagnifyingGlass;
  faStar = faStar;

  limit = 10;
  offset = 0;
  pokemonList: any[] = [];
  loading = false;
  searchTerm = "";
  selectedOrder: string = '';
  favoritePokemons: number[] = [];

  constructor(private pokeApiService: PokeApiService, private favoriteService: FavoriteService, private typeColorService: PokemonTypeColorService) { }

  ngOnInit() {
    this.loadPokemons();
    this.favoritePokemons = this.favoriteService.getFavoritePokemons();
  }

  /**
   * Returns the color for the given Pokemon type.
   * @param type the Pokemon type
   * @returns the color for the given Pokemon type
   */
  getTypeColor(type: string): string {
    return this.typeColorService.getColor(type);
  }

  /**
  * Generates a diagonal CSS linear gradient based on the Pokémon's types.
  * - For Pokémon with a single type: creates a gradient from the type color to transparent.
  * - For Pokémon with two types: creates a gradient blending both type colors.
  * The gradient flows from top-left (0%) to bottom-right (100%).
  * @param types - An array of Pokémon types (expected format: array of objects with `type.name` string property).
  * @returns A CSS linear-gradient string to be used as the card background.
  */
  getCardBackground(types: any[]): string {
    const colors = types.map(t => this.typeColorService.getCardColor(t?.type?.name || ''));

    if (colors.length === 1) {
      return `linear-gradient(135deg, ${colors[0]} 0%, transparent 100%)`;
    } else {
      return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    }
  }

  /**
   * Returns an observable of the Pokemon list
   * @param limit the maximum number of Pokemon to return
   * @param offset the starting index of the Pokemon to return
   * @returns an observable of the Pokemon list
   */
  getPokemonList(limit: number, offset: number) {
    return this.pokeApiService.getPokemonList(limit, offset);
  }

  /**
   * Loads the next page of Pokemon, or the first page if this.offset is 0.
   * This function is used to load the Pokemon list when the user navigates to the Pokemon list page,
   * or when the user clicks the "Load more" button.
   * @returns an observable of the Pokemon list
   */
  loadPokemons() {
    this.loading = true;
    this.getPokemonList(this.limit, this.offset).subscribe({
      next: (response) => {
        const requests = response.results.map((pokemon: any) =>
          this.pokeApiService.getPokemonDetails(pokemon.url)
        );

        forkJoin(requests).subscribe({
          next: (detailsList: any) => {
            this.pokemonList = [...this.pokemonList, ...detailsList];
            this.loading = false;
          },
          error: (error) => {
            console.error(error);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  loadNextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  /**
   * Filters the Pokemon list to only show Pokemon with a name matching the `searchTerm`.
   * @returns an observable of the filtered Pokemon list
   */
  filterByName() {
    if (this.searchTerm === "") {
      this.pokemonList = [];
      this.offset = 0;
      this.loadPokemons();
      return;
    }

    this.pokeApiService.getAllPokemonsByNameOrId(this.searchTerm).subscribe({
      next: (response) => {
        this.pokemonList = [response];
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  /**
   * Resets the Pokemon list and offset if the search term is empty or only whitespace.
   * This triggers a reload of the Pokemon list.
   */
  onSearchTermChange() {
    if (this.searchTerm.trim() === "") {
      this.pokemonList = [];
      this.offset = 0;
      this.loadPokemons();
    }
  }

  /**
   * Sorts the Pokemon list based on the selected order.
   * - 'az': Sorts the list in ascending order by Pokemon name.
   * - 'za': Sorts the list in descending order by Pokemon name.
   * - 'original-order': Resets the list and loads the Pokemons in the original order.
   */
  applySort() {
    switch (this.selectedOrder) {
      case 'az':
        this.pokemonList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        this.pokemonList.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'original-order':
        this.offset = 0;
        this.pokemonList = [];
        this.loadPokemons();
        break;
    }
  }

  /**
   * Toggles the favorite status of the given Pokemon and updates the list of favorite Pokemon IDs.
   * @param event the event that triggered this function
   * @param pokemon the Pokemon object
   */
  onStarClick(event: Event, pokemon: any) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(pokemon.id);
    this.favoritePokemons = this.favoriteService.getFavoritePokemons();
    this.favoriteService.storeFavoritePokemons(this.favoritePokemons);
  }

  /**
   * Returns whether the given Pokemon is a favorite or not.
   * @param pokemon the Pokemon object
   * @returns true if the Pokemon is a favorite, false otherwise
   */
  isFavorite(pokemon: any): boolean {
    return this.favoriteService.isFavorite(pokemon.id);
  }

  goToDetailPage(pokemon: any) {
    this.pokeApiService.goToDetails(pokemon.name);
  }

  getPokemonImage(pokemon: any) {
    return this.pokeApiService.getPokemonImage(pokemon);
  }
}
