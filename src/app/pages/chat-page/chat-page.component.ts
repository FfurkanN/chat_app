import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatTextboxComponent } from '../../components/chat-textbox/chat-textbox.component';
import { ChatMessageComponent } from '../../components/chat-message/chat-message.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UsersBarComponent } from '../../components/users-bar/users-bar.component';
import { User } from '../../models/user';
import { ChatCreateComponent } from '../../components/chat-create/chat-create.component';
import { Chat } from '../../models/chat';
import { Message } from '../../models/message';
import { ChatService } from '../../services/chat.service';
import { MessageSendModel } from '../../models/message-send';
import { SignalChatService } from '../../services/signal-chat.service';
import { UserService } from '../../services/user.service';
import { CreateChat } from '../../models/chat-create';
import { VideoChatComponent } from '../../components/video-chat/video-chat.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    ChatTextboxComponent,
    ChatMessageComponent,
    SidebarComponent,
    UsersBarComponent,
    ChatCreateComponent,
    VideoChatComponent,
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  isCreatingChat: boolean = false;
  isLoadingMessages: boolean = false;
  isVideoChat: boolean = false;

  currentMessage: MessageSendModel = {
    chatId: '',
    senderId: '',
    content: '',
    sendDate: new Date(),
  };
  usersInChat: User[] = [];
  messages: Message[] = [];

  currentChatId: string = '';

  currentUser: User = {
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

  chats: Chat[] = [];

  constructor(
    public chatService: ChatService,
    public signalChatService: SignalChatService,
    public userService: UserService
  ) {}

  ngOnInit() {}

  connect(): void {
    this.signalChatService.startConnection(this.currentUser.id);

    this.signalChatService.receiveMessage((message: Message) => {
      const chatIndex: number = this.chats.findIndex(
        (chat) => chat.id == message.chat_Id
      );
      if (this.currentChatId == message.chat_Id) {
        this.messages.push(message);
        setTimeout(() => this.scrollToBottom(), 50);
      } else {
        if (chatIndex !== -1) {
          this.chats[chatIndex].unreadMessageCount += 1;
        }
      }
    });

    this.signalChatService.userConnected((userId: string) => {
      console.log('User connected', userId);
      const userIndex: number = this.usersInChat.findIndex(
        (user) => user.id == userId
      );
      if (userIndex !== -1) {
        this.usersInChat[userIndex].isOnline = true;
      }
    });

    this.signalChatService.userDisconnected((userId: string) => {
      console.log('User disconnected', userId);
      const userIndex: number = this.usersInChat.findIndex(
        (user) => user.id == userId
      );
      if (userIndex !== -1) {
        this.usersInChat[userIndex].isOnline = false;
      }
    });
  }

  handleChildEvent(value: boolean): void {
    this.isCreatingChat = value;
  }

  handleChatEvent(value: Chat): void {
    this.isLoadingMessages = true;

    this.currentChatId = value.id;
    value.unreadMessageCount = 0;

    this.currentMessage.chatId = value.id;

    this.chatService.getMessagesByChatId(value.id).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.isLoadingMessages = false;
        setTimeout(() => this.scrollToBottom(), 10);
      },
      error: (err) => {
        console.error('Error getting messages', err);
      },
    });

    this.userService.getUsersById(value.members).subscribe({
      next: (users) => {
        this.usersInChat = users;
      },
      error: (err) => {
        console.error('Error getting users in chat', err);
      },
    });
  }

  public getChats(): void {
    this.chatService.getUserChats(this.currentUser).subscribe({
      next: (res) => {
        this.chats = res;
      },
      error: (err) => {
        console.error('Error fetching chats', err);
      },
    });
  }

  handleUserIdEvent(value: User): void {
    this.currentUser = value;
    this.currentMessage.senderId = value.id;

    this.connect();
    this.getChats();
  }

  handleMessageEvent(value: string): void {
    this.currentMessage.content = value;

    if (this.currentMessage.senderId !== '') {
      this.chatService.sendMessage(this.currentMessage).subscribe({
        next: (res) => {
          this.messages.push(res);
          setTimeout(() => this.scrollToBottom(), 10);
        },
        error: (err) => {
          console.error('Error sending message', err);
        },
      });
    }
  }

  handleChatCreation(value: CreateChat): void {
    value.creatorId = this.currentUser.id;
    this.chatService.createChat(value).subscribe({
      next: (res) => {
        this.isCreatingChat = false;
        this.getChats();
      },
      error: (err) => {
        console.error('Create chat error', err);
      },
    });
  }
  openVideoChat(value: boolean): void {
    this.isVideoChat = value;
    this.scrollToBottom();
  }

  public scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }
}
