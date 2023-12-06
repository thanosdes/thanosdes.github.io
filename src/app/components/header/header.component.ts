import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = 'Football Updates';
  countries = [
    { id: 39, attr: 'england', name: 'England' },
    { id: 140, attr: 'spain', name: 'Spain' },
    { id: 78, attr: 'germany', name: 'Germany' },
    { id: 61, attr: 'france', name: 'France' },
    { id: 135, attr: 'italy', name: 'Italy' },
  ];
}
