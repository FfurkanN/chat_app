import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Channel } from '../../../core/models/channel.model';
import { UserService } from '../../../core/services/user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserChannels().subscribe({
      next: (res) => {
        this.channels = res;
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  expandList(): void {
    this.isListExpanded = !this.isListExpanded;
  }
}
