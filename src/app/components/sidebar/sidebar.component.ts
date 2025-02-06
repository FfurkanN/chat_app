import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Chat } from '../../models/chat';
import { CreateChat } from '../../models/chat-create';
import { ChatService } from '../../services/chat.service';
import { DeleteChat } from '../../models/chat-delete';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private chatService: ChatService
  ) {}

  user: User = {
    id: '',
    firstname: '',
    lastname: '',
    userName: '',
    email: '',
    password: '',
    chats: [],
  };
  chats: Chat[] = [];

  createChatModel: CreateChat = {
    chatName: 'NewChat61',
    creatorId: '',
  };

  public deleteChatModel: DeleteChat = {
    userId: '',
    chatId: '',
  };

  ngOnInit(): void {
    this.userService.getUserByToken().subscribe({
      next: (res) => {
        this.user = res;
        this.createChatModel.creatorId = this.user.id;
        this.getChats();
      },
      error: (err) => {
        console.error('Error fetching user by token', err);
      },
    });
  }
  getChats(): void {
    this.chatService.getUserChats(this.user).subscribe({
      next: (res) => {
        this.chats = res;
        console.log('GetChats', this.chats);
      },
      error: (err) => {
        console.error('Error fetching chats', err);
      },
    });
  }
  createChat(): void {
    this.chatService.createChat(this.createChatModel).subscribe({
      next: (res) => {
        console.log('CreateChatRes', res);
      },
      error: (err) => {
        console.error('Create chat error', err);
      },
    });
  }

  deleteChat(chatId: string, userId: string) {
    this.deleteChatModel.chatId = chatId;
    this.deleteChatModel.userId = userId;
    this.chatService.deleteChat(this.deleteChatModel).subscribe({
      next: (res) => {
        console.log(res);
        this.getChats();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
