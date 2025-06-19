import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { PokemonListComponent } from "../features/pages/pokemon-list/pokemon-list.component";
import { HeaderComponent } from "../layout/components/header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, PokemonListComponent, HeaderComponent],
})
export class HomePage {
  constructor() {}
}
