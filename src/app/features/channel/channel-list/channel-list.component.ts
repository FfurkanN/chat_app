import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-channel-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.css',
})
export class ChannelListComponent {
  isListExpanded: boolean = false;

  expandList(): void {
    this.isListExpanded = !this.isListExpanded;
  }
}
