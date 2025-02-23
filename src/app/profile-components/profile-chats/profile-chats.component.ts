import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat';
import { UserService } from '../../services/user.service';
import { ProfileChatsTableComponent } from '../profile-chats-table/profile-chats-table.component';
import { ProfileChatsFormComponent } from '../profile-chats-form/profile-chats-form.component';

@Component({
  selector: 'app-profile-chats',
  standalone: true,
  imports: [ProfileChatsTableComponent, ProfileChatsFormComponent],
  templateUrl: './profile-chats.component.html',
  styleUrl: './profile-chats.component.css',
})
export class ProfileChatsComponent implements OnInit {
  constructor(private userService: UserService) {}

  chats: Chat[] = [];
  chatName: string | undefined = '';
  chatId: string = '';
  private intervalId: any;

  ngOnInit(): void {
    this.refreshChats();
    this.intervalId = setInterval(() => this.refreshChats(), 5000);
  }

  manageChat(chatId: string): void {
    this.chatName = this.chats.find((chat) => chat.id == chatId)?.name;
    this.chatId = chatId;
  }

  getSelectedChat(): Chat | undefined {
    return this.chats.find((chat) => chat.name == this.chatName);
  }

  resetChatName(): void {
    this.chatName = '';
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  refreshChats(): void {
    this.userService.getChatsOwnedByUser().subscribe({
      next: (res) => {
        this.chats = res;
      },
    });
  }
}
