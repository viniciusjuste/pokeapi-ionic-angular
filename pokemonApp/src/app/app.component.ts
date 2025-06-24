import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader  } from '@ionic/angular/standalone';
import { HeaderComponent } from './layout/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, HeaderComponent, IonHeader],
})
export class AppComponent {
  constructor() {}
}
