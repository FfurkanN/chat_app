import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { ChatService } from '../../core/services/chat.service';
import { CreateChat } from '../../models/chat-create';

@Component({
  selector: 'app-chat-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-create.component.html',
  styleUrl: './chat-create.component.css',
})
export class ChatCreateComponent {
  @Output() closeChatCreatingWindow: EventEmitter<boolean> = new EventEmitter();

  users: User[] = [];

  username: string = '';
  userByDb: User = {
    id: '',
    firstname: '',
    lastname: '',
    userName: '',
    email: '',
    password: '',
    refreshToken: '',
    isOnline: false,
    profileImageUrl: '',
  };

  chat: CreateChat = {
    chatName: '',
    members: [],
    isPublic: false,
  };

  userNotFound: boolean = false;

  constructor(
    public userService: UserService,
    public chatService: ChatService
  ) {}

  addUser(): void {
    const userExists = this.users.some(
      (user) => user.userName === this.username
    );

    if (userExists) {
      console.error('User already added');
      return;
    }
    if (this.userNotFound || this.username == '') {
      return;
    }
    this.users.push(this.userByDb);
    this.chat.members.push(this.userByDb.id);
  }

  closeChatCreate(): void {
    this.closeChatCreatingWindow.emit(false);
  }
  createChat(): void {
    this.chatService.createChat(this.chat).subscribe({
      next: (res) => {
        this.closeChatCreate();
        console.log(res);
      },
      error: (err) => {
        console.error('Create chat error', err);
      },
    });
  }

  getUserByUsername(): void {
    this.userService.getUserByUsername(this.username).subscribe({
      next: (res) => {
        if (res != undefined) {
          this.userByDb = res;
          this.userNotFound = false;
        } else {
          if (this.username != '') {
            this.userNotFound = true;
          } else {
            this.userNotFound = false;
          }
        }
      },
      error: (err) => {
        console.error('Error getting user by username ', err);
      },
    });
  }
  removeUsers(username: string): void {
    this.users = this.users.filter((user) => user.userName != username);
  }
}
