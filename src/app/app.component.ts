import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertService } from './core/services/alert.service';
import { Alert } from './models/alert';

import { SignalChatService } from './core/services/signal-chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'chat_app';

  constructor(private signalChatService: SignalChatService) {
    // this.signalChatService.startConnection();
  }
}
