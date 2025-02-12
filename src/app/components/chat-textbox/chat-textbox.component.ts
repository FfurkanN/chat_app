import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message';

@Component({
  selector: 'app-chat-textbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-textbox.component.html',
  styleUrl: './chat-textbox.component.css',
})
export class ChatTextboxComponent {
  @Output() sendMessage: EventEmitter<string> = new EventEmitter();
  message: string = '';

  sendMessagetoParent(): void {
    this.sendMessage.emit(this.message);
    this.message = '';
  }
}
