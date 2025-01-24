import { Component } from '@angular/core';
import { ChatTextboxComponent } from '../../components/chat-textbox/chat-textbox.component';
import { ChatMessageComponent } from '../../components/chat-message/chat-message.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatTextboxComponent, ChatMessageComponent, SidebarComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {
  currentMessage: string = 'lorem ipsum dolor sit amet';
}
