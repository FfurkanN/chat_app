import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-video-chat',
  standalone: true,
  imports: [],
  templateUrl: './video-chat.component.html',
  styleUrl: './video-chat.component.css',
})
export class VideoChatComponent {
  @Output() closeVideoChatEventEventEvmitter: EventEmitter<boolean> =
    new EventEmitter();

  closeVideoChat(): void {
    this.closeVideoChatEventEventEvmitter.emit(false);
  }
}
