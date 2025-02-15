import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faMousePointer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-textbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-textbox.component.html',
  styleUrl: './chat-textbox.component.css',
})
export class ChatTextboxComponent {
  @Output() sendMessage: EventEmitter<string> = new EventEmitter();
  @Output() openVideoChatEventEmitter: EventEmitter<boolean> =
    new EventEmitter();
  message: string = '';

  sendMessagetoParent(): void {
    this.sendMessage.emit(this.message);
    this.message = '';
  }
  openVideoChat(): void {
    this.openVideoChatEventEmitter.emit(true);
  }
}
