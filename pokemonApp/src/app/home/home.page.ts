import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { PokemonListComponent } from "../features/pages/pokemon-list/pokemon-list.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, PokemonListComponent],
})
export class HomePage {
  constructor() { }
}
