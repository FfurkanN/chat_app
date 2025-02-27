import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertService } from './core/services/alert.service';
import { SignalChatService } from './core/services/signal-chat.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'chat_app';

  constructor(
    private signalChatService: SignalChatService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.getUserData();
    this.authService.currentUser$.subscribe((user) => {
      this.signalChatService.startConnection();
    });
  }
}
