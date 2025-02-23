import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertService } from './services/alert.service';
import { Alert } from './models/alert';
import { AlertComponent } from './components/alert/alert.component';
import { SignalChatService } from './services/signal-chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'chat_app';
  alerts: Alert[] | null = null;

  constructor(
    private alertService: AlertService,
    private signalChatService: SignalChatService
  ) {
    this.alertService.alert$.subscribe((alert) => {
      this.alerts = alert;
    });

    this.signalChatService.startConnection();
  }
}
