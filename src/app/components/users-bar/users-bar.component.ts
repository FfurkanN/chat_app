import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-bar.component.html',
  styleUrl: './users-bar.component.css',
})
export class UsersBarComponent {
  @Input() users: User[] = [];
}
