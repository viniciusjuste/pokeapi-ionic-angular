import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

  constructor(private pokeApiService: PokeApiService) { }

  limit = 10;
  offset = 0;
  pokemonList: any[] = [];
  loading = false;

  searchName = "";
  selectedOrder: string = '';


  ngOnInit() {
    this.loadPokemons();
  }

  getPokemonList(limit: number, offset: number) {
    return this.pokeApiService.getPokemonList(limit, offset);
  }

  loadPokemons() {
    this.loading = true;
    this.getPokemonList(this.limit, this.offset).subscribe({
      next: (response) => {
        this.pokemonList = [...this.pokemonList, ...response.results];
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    })
  }

  getPokemonImage(pokemonUrl: string) {
    return this.pokeApiService.getPokemonImage(pokemonUrl);
  }

  loadNextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  filterByName() {
    if (this.searchName === "") {
      this.pokemonList = [];
      this.loadPokemons();
      return;
    }
    this.pokemonList = this.pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(this.searchName.toLowerCase()));
  }

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
}

