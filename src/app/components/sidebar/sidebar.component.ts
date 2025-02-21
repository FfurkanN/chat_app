import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';
import { DeleteChat } from '../../models/chat-delete';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ChatCreateComponent } from '../chat-create/chat-create.component';
import { AlertService } from '../../services/alert.service';
import { SignalChatService } from '../../services/signal-chat.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, ChatCreateComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  @Input() chats: Chat[] = [];
  @Output() setChatEventEmitter = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  router: Router = new Router();

  user: User = {
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

  deleteChatModel: DeleteChat = {
    userId: '',
    chatId: '',
  };
  enviromentProfileImageUrl: string = '';
  currentChatId: string = '';

  isChatCreating: boolean = false;

  isUserDropdown: boolean = true;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['chatId']) {
        this.currentChatId = params['chatId'];
      } else {
        this.currentChatId = '';
      }
    });

    this.userService.getUserByToken().subscribe({
      next: (res) => {
        this.user = res;

        this.enviromentProfileImageUrl =
          environment.profileImageUrl + this.user.profileImageUrl;
      },
      error: (err) => {
        console.error('Error fetching user by token', err);
      },
    });
  }

  setChat(chatId: string): void {
    this.currentChatId = chatId;
    this.setChatEventEmitter.emit(chatId);
  }

  deleteChat(chatId: string, userId: string) {
    this.deleteChatModel.chatId = chatId;
    this.deleteChatModel.userId = userId;
    this.chatService.deleteChat(this.deleteChatModel).subscribe({
      next: (res) => {
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
    localStorage.clear();
    this.router.navigate(['/']);
    this.alertService.createAlert({
      message: 'Chat başarıyla oluşturuldu!',
      alertType: 'information',
    });
  }
  toggleChatCreate(value: any): void {
    this.isChatCreating = value;
    // this.alertService.createAlert({
    //   message: 'Chat başarıyla oluşturuldu!',
    //   alertType: 'success',
    // });
  }
  toggleUserDropdown(): void {
    this.isUserDropdown = !this.isUserDropdown;
  }
}
