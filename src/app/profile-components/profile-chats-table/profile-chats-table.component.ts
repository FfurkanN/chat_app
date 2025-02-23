import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Chat } from '../../models/chat';

@Component({
  selector: 'app-profile-chats-table',
  standalone: true,
  imports: [],
  templateUrl: './profile-chats-table.component.html',
  styleUrl: './profile-chats-table.component.css',
})
export class ProfileChatsTableComponent {
  @Input() chats: Chat[] = [];
  @Output() manageChatEventEmitter: EventEmitter<string> =
    new EventEmitter<string>();

  manageChat(chatId: string): void {
    this.manageChatEventEmitter.emit(chatId);
  }
}
