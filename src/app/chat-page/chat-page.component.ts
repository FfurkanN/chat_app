import { Component, OnInit } from '@angular/core';
import { ChatTextboxComponent } from '../components/chat-textbox/chat-textbox.component';
import { ChatMessageComponent } from '../components/chat-message/chat-message.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { UsersBarComponent } from '../components/users-bar/users-bar.component';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    ChatTextboxComponent,
    ChatMessageComponent,
    SidebarComponent,
    UsersBarComponent,
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  currentMessage: string = 'Hello';
  users: User[] = [];

  loadUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }
}
