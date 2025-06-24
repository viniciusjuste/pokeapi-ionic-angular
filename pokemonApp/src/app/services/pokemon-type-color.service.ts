import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonTypeColorService {

  constructor() { }

  private typeColors: { [key: string]: string } = {
    normal: '#B0B67F',
    fire: '#F27C2C',
    water: '#4D88E7',
    electric: '#F2D94E',
    grass: '#6DB144',
    ice: '#7FD1D9',
    fighting: '#B73A36',
    poison: '#9B47A6',
    ground: '#D9B85C',
    flying: '#9E8DF9',
    psychic: '#E84B72',
    bug: '#97B82F',
    rock: '#A88E3B',
    ghost: '#6B5B94',
    dragon: '#5E4FE0',
    dark: '#5D4B3E',
    steel: '#AEB1C4',
    fairy: '#D5779A'
  };

  /**
   * Given a Pokemon type string, returns the color associated with it.
   * @param type the Pokemon type string
   * @returns the color associated with the Pokemon type, or white if no match
   */
  getColor(type: string): string {
    return this.typeColors[type.trim()] || '#FFFFFF';
  }

  private cardColors: { [key: string]: string } = {
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

  /**
   * Given a Pokemon type string, returns the color associated with it to be used in Pokemon card backgrounds.
   * @param type the Pokemon type string
   * @returns the color associated with the Pokemon type, or white if no match
   */
  getCardColor(type: string): string {
    return this.cardColors[type.trim()] || '#FFFFFF';
  }
}
