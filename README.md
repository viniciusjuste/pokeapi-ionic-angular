# Pokédex App - Ionic + Angular

This project is an interactive Pokédex developed with Ionic and Angular. It consumes the PokéAPI to display information about Pokémon, allowing navigation between lists and details, marking favorites, and providing a responsive interface.

## Features

- **Paginated listing** of Pokémon with names and images
- **Detail screen** with at least six pieces of information and images per Pokémon
- **Mark/unmark Pokémon as favorites**
- **Responsive design**: Works on different screen sizes and orientations
- **Local storage** of favorites using LocalStorage

## Approach

- Organized the project with a focus on separating responsibilities between components, pages, and services.
- Used the PokéAPI as the primary data source with native pagination.
- Applied dependency injection with dedicated services for API and favorites.
- Created clear navigation between the listing and details using Angular Router.
- Maintained frequent and descriptive commits to facilitate change tracking.
- Designed the interface with a mobile-first approach, prioritizing usability.
- Implemented a favorites logic using LocalStorage for persistence without a back-end.
- Used CSS Flex/Grid for responsiveness and adaptation between portrait/landscape orientations.
- Utilized TypeScript interfaces for safe API data typing.
- The structure is ready for expansion with new modules or unit tests.

## Running Locally

Clone the project:

```bash
git clone https://[github.com/your-username/pokemon-ionic-angular-app.git](https://github.com/viniciusjuste/pokeapi-ionic-angular)
cd pokemon-ionic-angular-app
npm install
ionic serve
```
