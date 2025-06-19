import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  dropdownIsOpen: boolean = false;

  favoritePokemons: any[] = [];

  constructor(private favoriteService: FavoriteService, private pokeApiService: PokeApiService) { }

  ngOnInit() {
    this.loadFavoritePokemons();
  }

  toggleDropdown() {
    this.dropdownIsOpen = !this.dropdownIsOpen;
  }

  getFavoritePokemons() {
    return this.favoriteService.getFavoritePokemons();
  }

  loadFavoritePokemons() {
    const favoriteIds = this.favoriteService.getFavoritePokemons();

    const requests = favoriteIds.map(id =>
      this.pokeApiService.getAllPokemonsByNameOrId(id)
    );

    forkJoin(requests).subscribe((pokemons: any) => {
      this.favoritePokemons = pokemons;
    });
  }

  goToDetailsPage(pokemonNameOrId : string) {
    this.pokeApiService.goToDetails(pokemonNameOrId);
  }
}
