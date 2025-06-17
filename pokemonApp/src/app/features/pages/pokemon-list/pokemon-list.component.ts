import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [IonicModule, CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

  constructor(private pokeApiService: PokeApiService) { }

  limit = 10;
  offset = 0;
  pokemonList: any[] = [];
  loading = false;

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
}
