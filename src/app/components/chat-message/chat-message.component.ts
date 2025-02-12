import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Message } from '../../models/message';
import { CommonModule, JsonPipe } from '@angular/common';
import { User } from '../../models/user';

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

  getSenderName(senderId: string): string {
    const sender = this.users.find((user) => user.id === senderId);
    return sender?.userName || 'Unknown';
  }
}
