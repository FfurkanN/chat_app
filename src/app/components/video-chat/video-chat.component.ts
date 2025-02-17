import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-video-chat',
  standalone: true,
  imports: [],
  templateUrl: './video-chat.component.html',
  styleUrl: './video-chat.component.css',
})
export class VideoChatComponent {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  @ViewChild('chatVideos') chatVideos!: ElementRef;
  @Output() closeVideoChatEventEventEvmitter: EventEmitter<boolean> =
    new EventEmitter();

  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  closeVideoChat(): void {
    this.closeVideoChatEventEventEvmitter.emit(false);
  }

  logHeight() {
    console.log('Div height:', this.chatVideos.nativeElement.offsetHeight);
  }
  get gridClass() {
    const count = this.numbers.length;

    if (count <= 1) return 'grid-cols-1 grid-rows-1';
    if (count <= 2) return 'grid-cols-2 grid-rows-1';
    if (count <= 4) return 'grid-cols-2 grid-rows-2';
    if (count <= 6) return 'grid-cols-3 grid-rows-2';
    if (count <= 9) return 'grid-cols-3 grid-rows-3';
    if (count <= 16) return 'grid-cols-4 grid-rows-4';

    return 'grid-cols-4 grid-rows-4'; // Maksimum 16 kişi için 4x4 grid
  }
}
