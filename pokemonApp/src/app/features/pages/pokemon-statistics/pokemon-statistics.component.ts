import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-statistics',
  templateUrl: './pokemon-statistics.component.html',
  styleUrls: ['./pokemon-statistics.component.scss'],
})
export class PokemonStatisticsComponent implements OnInit {
  pokemon: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');

    this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).subscribe((data) => {
      this.pokemon = data;
    });
  }

}
