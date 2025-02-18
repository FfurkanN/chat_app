import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
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
  @Output() chatForCreationEventEmitter: EventEmitter<CreateChat> =
    new EventEmitter();

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
    creatorId: '',
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
    console.log('Users:', this.userByDb);
  }

  closeChatCreate(): void {
    this.closeChatCreatingWindow.emit(false);
  }
  createChat(): void {
    this.chatForCreationEventEmitter.emit(this.chat);
    this.closeChatCreate();
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
