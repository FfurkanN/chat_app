import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { ChannelService } from '../../../core/services/channel.service';
import { Chat } from '../../../core/models/chat.model';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  chats: Chat[] = [];

  constructor(
    private chatService: ChatService,
    private channelService: ChannelService
  ) {}

  ngOnInit(): void {
    this.channelService.currentChannel$.subscribe((channel) => {
      if (channel) {
        this.chatService.getChats(channel.id).subscribe({
          next: (res) => {
            this.chats = res;
          },
        });
      }
    });
  }
  setCurrentChat(chat: Chat): void {
    this.chatService.setCurrentChat(chat);
  }
}
