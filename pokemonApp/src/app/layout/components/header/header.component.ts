import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  dropdownIsOpen: boolean = false;

  constructor() { }

  toggleDropdown() {
    this.dropdownIsOpen = !this.dropdownIsOpen;
  }

  ngOnInit() { }

}
