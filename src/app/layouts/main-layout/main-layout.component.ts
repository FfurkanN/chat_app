import { Component } from '@angular/core';
import { ChannelListComponent } from '../../features/channel/channel-list/channel-list.component';
import { ChatListComponent } from '../../features/chat/chat-list/chat-list.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ChatRoomComponent } from '../../features/chat/chat-room/chat-room.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    ChannelListComponent,
    ChatListComponent,
    NavbarComponent,
    ChatRoomComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
