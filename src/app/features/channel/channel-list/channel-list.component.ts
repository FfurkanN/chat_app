import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Channel } from '../../../core/models/channel.model';
import { UserService } from '../../../core/services/user.service';
import { ChannelService } from '../../../core/services/channel.service';

@Component({
  selector: 'app-channel-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.css',
})
export class ChannelListComponent implements OnInit {
  isListExpanded: boolean = false;
  channels: Channel[] = [];

  constructor(
    private userService: UserService,
    private channelService: ChannelService
  ) {}

  ngOnInit(): void {
    this.userService.getUserChannels().subscribe({
      next: (res) => {
        this.channels = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  setCurrentChannel(channel: Channel): void {
    this.channelService.setCurrentChannel(channel);
  }

  expandList(): void {
    this.isListExpanded = !this.isListExpanded;
  }
}
