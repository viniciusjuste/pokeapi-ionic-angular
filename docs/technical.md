Technical Documentation - Pokédex App

Folder Structure

src/app/

features/
pages/

pokemon-list/ → Main listing screen

pokemon-statistics/ → Detailed Pokémon information screen

services/

poke-api.service.ts → Requests to PokéAPI

favorite.service.ts → Favorite management with LocalStorage

public/

images/ → Custom icons and images (if necessary)

Services

PokeApiService

getPokemonList(offset: number, limit: number)

getPokemonDetails(url: string)

getPokemonImage(pokemon: any): string

FavoriteService

getFavorites(): number[]

toggleFavorite(id: number): void

isFavorite(id: number): boolean

All services are injected via Angular Dependency Injection (DI), following best practices.

Routing

Configured in app.routes.ts:

'home' → redirects to /pokemon-list

'pokemon-list' → listing

'pokemon-statistics/:name' → details based on Pokémon name

Responsiveness

Layouts created with CSS Grid and Flexbox

Viewport adaptable with media queries

Tested in portrait and landscape via DevTools

Pagination

Uses offset and limit from PokéAPI

Stores the current page state

Navigation with "Previous" and "Next" buttons

Favorites

List persisted in LocalStorage as an array of numbers (Pokémon IDs)

Favorite icon toggles state and updates list automatically

Standards Used

Angular CLI for file generation

Dependency injection

CSS modularized by component

Strong typing with TypeScript

Semantic commits (feat, fix, docs, etc.)
