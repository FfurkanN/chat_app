import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { formatDistanceToNow } from 'date-fns';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent {
  @Input() messages: Message[] = [];
  @Input() userId: string = '';
  @Input() users: User[] = [];

  previusSender: string = '';
  profileImageApi: string = environment.profileImageUrl;

  getSender(senderId: string): User {
    const sender = this.users.find((user) => user.id === senderId);
    if (!sender) {
      throw new Error(`User with Id ${senderId} not found`);
    }
    return sender;
  }
  getSendTime(sendDate: Date): string {
    return formatDistanceToNow(sendDate);
  }
}
