import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';
import { DeleteChat } from '../../models/chat-delete';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  @Input() chats: Chat[] = [];

  @Output() openChatCreateWindow: EventEmitter<boolean> = new EventEmitter();
  @Output() Chat: EventEmitter<Chat> = new EventEmitter();
  @Output() userIdEmitter: EventEmitter<User> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private chatService: ChatService
  ) {}

  router: Router = new Router();

  user: User = {
    id: '',
    firstname: '',
    lastname: '',
    userName: '',
    email: '',
    password: '',
    chats: [],
    refreshToken: '',
    isOnline: false,
  };

  deleteChatModel: DeleteChat = {
    userId: '',
    chatId: '',
  };

  ngOnInit(): void {
    this.userService.getUserByToken().subscribe({
      next: (res) => {
        this.user = res;
        this.userIdEmitter.emit(this.user);
      },
      error: (err) => {
        console.error('Error fetching user by token', err);
      },
    });
    console.log(this.chats);
  }
  openChatCreate(): void {
    this.openChatCreateWindow.emit(true);
  }
  openChatWindow(chat: Chat): void {
    this.Chat.emit(chat);
  }

  deleteChat(chatId: string, userId: string) {
    this.deleteChatModel.chatId = chatId;
    this.deleteChatModel.userId = userId;
    this.chatService.deleteChat(this.deleteChatModel).subscribe({
      next: (res) => {
        console.log(res);
        this.chats = this.chats.filter((chat) => chat.id !== res.id);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  settings(): void {
    this.router.navigate(['/profile/info', this.user.id]);
  }

  logout(): void {
    this.authService.logout();
  }
}
