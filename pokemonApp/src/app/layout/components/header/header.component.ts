import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faHeart = faHeart;

  dropdownIsOpen: boolean = false;
  menuMobileIsOpen: boolean = false;

  favoritePokemons: any[] = [];
  loadingFavorites: boolean = false;

  constructor(
    private favoriteService: FavoriteService,
    private pokeApiService: PokeApiService,
    private eRef: ElementRef
  ) { }

  menuToggle() {
    this.menuMobileIsOpen = !this.menuMobileIsOpen;
  }

  toggleDropdown() {
    this.dropdownIsOpen = !this.dropdownIsOpen;

    if (this.dropdownIsOpen) {
      this.loadFavoritePokemons();
    }
  }

  loadFavoritePokemons() {
    const favoriteIds = this.favoriteService.getFavoritePokemons();

    if (favoriteIds.length === 0) {
      this.favoritePokemons = [];
      this.loadingFavorites = false;
      return;
    }

    this.loadingFavorites = true;

    const requests = favoriteIds.map(id =>
      this.pokeApiService.getAllPokemonsByNameOrId(id)
    );

    forkJoin(requests).subscribe(
      (pokemons: any[]) => {
        this.favoritePokemons = pokemons;
        this.loadingFavorites = false;
      },
      error => {
        console.error('Erro ao carregar favoritos', error);
        this.loadingFavorites = false;
      }
    );
  }

  goToDetailsPage(pokemonNameOrId: string) {
    this.pokeApiService.goToDetails(pokemonNameOrId);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.dropdownIsOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.dropdownIsOpen = false;
    }
  }
}
