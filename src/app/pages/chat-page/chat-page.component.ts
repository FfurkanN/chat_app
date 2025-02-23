import { Component, OnInit } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-message/chat-message.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { User } from '../../models/user';
import { ChatCreateComponent } from '../../components/chat-create/chat-create.component';
import { Chat } from '../../models/chat';
import { Message } from '../../models/message';
import { ChatService } from '../../services/chat.service';
import { SignalChatService } from '../../services/signal-chat.service';
import { UserService } from '../../services/user.service';
import { VideoChatComponent } from '../../components/video-chat/video-chat.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    ChatMessageComponent,
    SidebarComponent,
    ChatCreateComponent,
    VideoChatComponent,
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent implements OnInit {
  isCreatingChat: boolean = false;
  isLoadingMessages: boolean = false;
  isVideoChat: boolean = false;

  chats: Chat[] = [];
  messages: Message[] = [];
  usersInChat: User[] = [];

  currentChatId: string = '';

  currentUser: User = {
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

  constructor(
    public chatService: ChatService,
    public signalChatService: SignalChatService,
    public userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   if (params['chatId']) {
    //     this.currentChatId = params['chatId'];
    //     this.getMessages(this.currentChatId);
    //     this.getUsersInChat(this.currentChatId);
    //   } else {
    //     this.currentChatId = '';
    //   }
    // });

    this.userService.getUserByToken().subscribe({
      next: (res) => {
        this.currentUser = res;
        this.getUserChats();
        this.connect();
      },
      error: (err) => {
        console.error('Error fetching user by token', err);
      },
    });
  }

  connect(): void {
    // this.signalChatService.startConnection(this.currentUser.id);

    this.signalChatService.userConnected((userId: string) => {
      console.log('User connected', userId);
      var user = this.usersInChat.find((user) => user.id == userId);
      if (user != undefined) {
        user.isOnline = true;
      }
    });

    this.signalChatService.userDisconnected((userId: string) => {
      console.log('User disconnected', userId);
      var user = this.usersInChat.find((user) => user.id == userId);
      if (user != undefined) {
        user.isOnline = false;
      }
    });
    this.signalChatService.receiveMessage((message: Message) => {
      console.log('MEESAGE', message);

      if (this.currentChatId == message.chat_Id) {
        this.messages.push(message);
        // setTimeout(() => this.scrollToBottom(), 10);
      }
    });
  }
  getUserChats(): void {
    this.chatService.getUserChats().subscribe({
      next: (res) => {
        console.log(res);
        this.chats = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  setCurrentChat(value: string): void {
    this.currentChatId = value;
    this.getMessages(this.currentChatId);
    this.getUsersInChat(this.currentChatId);
  }

  getMessages(chatId: string) {
    this.chatService.getMessagesByChatId(chatId).subscribe({
      next: (res) => {
        this.messages = res;
        console.log('Messages', this.messages);
        // setTimeout(() => this.scrollToBottom(), 10);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getUsersInChat(chatId: string): void {
    this.chatService.getUsersFromChat(chatId).subscribe({
      next: (res) => {
        this.usersInChat = res;
        console.log('Users in chat', this.usersInChat);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openVideoChat(value: boolean): void {
    this.isVideoChat = value;
  }
}
