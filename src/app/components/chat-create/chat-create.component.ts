import { Component } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Username } from '../../models/username';

@Component({
  selector: 'app-chat-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-create.component.html',
  styleUrl: './chat-create.component.css',
})
export class ChatCreateComponent {
  users: User[] = [];
  username: Username = {
    username: '',
  };
  constructor(public userService: UserService) {}

  addUser(): void {
    // console.log(this.users);
    // this.users.push(this.username);
  }
  getUserByUsername(): void {
    const userExists = this.users.some(
      (user) => user.userName === this.username.username
    );

    if (userExists) {
      console.error('User already added');
      return;
    }

    this.userService.getUserByUsername(this.username).subscribe({
      next: (res) => {
        if (res != undefined) {
          this.users.push(res);
        } else {
          this.userNotFound();
        }
      },
      error: (err) => {
        console.error('Error getting user by username ', err);
      },
    });
  }
  userNotFound(): void {
    console.log('User not found');
  }
}
