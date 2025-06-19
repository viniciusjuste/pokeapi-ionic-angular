import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pokemon-list',
  imports: [IonicModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

faMagnifyingGlass = faMagnifyingGlass;
  constructor(private pokeApiService: PokeApiService, private router : Router) { }

  typeColors: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };

  limit = 10;
  offset = 0;
  pokemonList: any[] = [];
  loading = false;

  searchTerm = "";    
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
        const requests = response.results.map((pokemon: any) => this.pokeApiService.getPokemonDetails(pokemon.url));
        console.log('Requests:', requests);

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

  getPokemonImage(pokemon: any) {
    return this.pokeApiService.getPokemonImage(pokemon);
  }

  loadNextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  filterByName() {
    if (this.searchTerm === "") {
      this.pokemonList = [];
      this.offset = 0;
      this.loadPokemons();
      console.log("vazio")
      return;
    }

    this.pokeApiService.getAllPokemonsByName(this.searchTerm).subscribe({
      next: (response) => {
        this.pokemonList = [response];
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onSearchTermChange() {
  if (this.searchTerm.trim() === "") {
    this.pokemonList = [];
    this.offset = 0;
    this.loadPokemons();
  }
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

  goToDetails(pokemonName : string){
    this.router.navigate(['pokemon-details', pokemonName]);
  }
}

