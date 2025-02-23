import { Component, Input, OnInit } from '@angular/core';
import { Chat } from '../../models/chat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-chats-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-chats-form.component.html',
  styleUrl: './profile-chats-form.component.css',
})
export class ProfileChatsFormComponent implements OnInit {
  @Input() chatId: string = '';

  constructor(private chatService: ChatService) {}
  chat: Chat = {
    id: '',
    name: '',
    creator_Id: '',
    create_date: new Date(),
    unreadMessageCount: 0,
    userCount: 0,
    onlineUserCount: 0,
  };

  users: User[] = [];

  ngOnInit(): void {
    this.chatService.getChatById(this.chatId).subscribe({
      next: (res) => {
        this.chat = res;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.chatService.getUsersFromChat(this.chatId).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
