import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { ChannelService } from '../../../core/services/channel.service';
import { CommonModule } from '@angular/common';
import { SignalChatService } from '../../../core/services/signal-chat.service';
import { environment } from '../../../../environments/environment.development';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-chat-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-users.component.html',
  styleUrl: './chat-users.component.css',
})
export class ChatUsersComponent implements OnInit {
  @Input() users: User[] = [];
  isListExpanded: boolean = true;

  envImageUrl: string = '';

  constructor(
    private signalChatService: SignalChatService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.signalChatService.currentSignal$.subscribe((value) => {
      if (value) {
        this.signalChatService.userConnected((userId) => {
          const user = this.users.find((user) => user.id == userId);
          if (user) {
            user.isOnline = true;
            this.toastService.showToast(
              `${user.userName} is now online`,
              'info'
            );
          }
        });

        this.signalChatService.userDisconnected((userId) => {
          const user = this.users.find((user) => user.id == userId);
          if (user) {
            user.isOnline = false;
            this.toastService.showToast(
              `${user.userName} is now offline`,
              'info'
            );
          }
        });
      }
    });
    this.envImageUrl = environment.wwwrootUrl;
  }
  toggleListExpanded(): void {
    this.isListExpanded = !this.isListExpanded;
  }
}
