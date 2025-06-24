import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PokemonTypeColorService } from 'src/app/services/pokemon-type-color.service';

@Component({
  selector: 'app-pokemon-statistics',
  imports: [IonicModule, CommonModule],
  templateUrl: './pokemon-statistics.component.html',
  styleUrls: ['./pokemon-statistics.component.scss'],
})
export class PokemonStatisticsComponent implements OnInit {
  pokemon: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private typeColorService: PokemonTypeColorService) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');

    this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).subscribe((data) => {
      this.pokemon = data;
    });
  }

  getStatPercentage(statValue: number): number {
    const maxStat = 200; 
    return statValue / maxStat;
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
}
