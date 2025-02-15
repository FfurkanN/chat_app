import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users-bar.component.html',
  styleUrl: './users-bar.component.css',
})
export class UsersBarComponent {
  @Input() users: User[] = [];
}
