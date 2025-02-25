import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatUsersComponent } from '../chat-users/chat-users.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { Message } from '../../../core/models/message.model';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ChatUsersComponent, NavbarComponent],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css',
})
export class ChatRoomComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  messages: Message[] = [
    {
      id: 'asada',
      sender_Id: 'asfdafsa',
      messageType: 'text  ',
      content: 'Hello',
      send_Date: new Date(),
    },
  ];

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  public scrollToBottom() {
    this.chatContainer.nativeElement.scrollTop =
      this.chatContainer.nativeElement.scrollHeight;
  }
}
