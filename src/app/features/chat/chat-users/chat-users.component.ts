import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { ChannelService } from '../../../core/services/channel.service';
import { CommonModule } from '@angular/common';
import { SignalChatService } from '../../../core/services/signal-chat.service';

@Component({
  selector: 'app-chat-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-users.component.html',
  styleUrl: './chat-users.component.css',
})
export class ChatUsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private channelService: ChannelService,
    private signalChatService: SignalChatService
  ) {}

  ngOnInit(): void {
    this.channelService.currentChannel$.subscribe((channel) => {
      if (channel) {
        this.channelService.getUsersByChannelId(channel.id).subscribe({
          next: (res) => {
            this.users = res;
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    });

    this.signalChatService.userConnected((userId) => {
      const user = this.users.find((user) => user.id == userId);
      if (user) {
        user.isOnline = true;
      }
    });

    this.signalChatService.userDisconnected((userId) => {
      const user = this.users.find((user) => user.id == userId);
      if (user) {
        user.isOnline = false;
      }
    });
  }
}
