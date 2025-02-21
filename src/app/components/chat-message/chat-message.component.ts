import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../models/message';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { formatDistanceToNow } from 'date-fns';
import { environment } from '../../../environments/environment';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { MessageSendModel } from '../../models/message-send';
import { FormsModule } from '@angular/forms';
import { SignalChatService } from '../../services/signal-chat.service';
import { UserService } from '../../services/user.service';
import { UsersBarComponent } from '../users-bar/users-bar.component';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule, FormsModule, UsersBarComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  @Input() messages: Message[] = [];
  @Input() usersInChat: User[] = [];
  @Input() currentChatId: string = '';

  constructor(private chatService: ChatService) {}

  currentUserId: string = '';

  ngOnInit(): void {
    // setTimeout(() => this.scrollToBottom(), 10);
  }

  messageToSend: MessageSendModel = {
    chatId: '',
    content: '',
    sendDate: new Date(),
  };

  previusSender: string = '';
  profileImageApi: string = environment.profileImageUrl;

  sendMessage(message: MessageSendModel): void {
    this.messageToSend.chatId = this.currentChatId;

    if (!this.messageToSend.content.trim()) {
      return;
    }
    this.chatService.sendMessage(this.messageToSend).subscribe({
      next: (res) => {
        this.messages.push(res);
        // this.scrollToBottom();
        this.messageToSend.content = '';
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getSender(senderId: string): User {
    const sender = this.usersInChat.find((user) => user.id === senderId);
    if (!sender) {
      throw new Error(`User with Id ${senderId} not found`);
    }
    // this.scrollToBottom();
    return sender;
  }

  getSendTime(sendDate: Date): string {
    return formatDistanceToNow(sendDate);
  }

  public scrollToBottom() {
    this.chatContainer.nativeElement.scrollTop =
      this.chatContainer.nativeElement.scrollHeight;
  }
}
