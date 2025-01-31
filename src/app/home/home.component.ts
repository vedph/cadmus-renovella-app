import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class HomeComponent {
  public logged: boolean;

  constructor(authService: AuthJwtService) {
    this.logged = authService.currentUserValue !== null;
  }
}
