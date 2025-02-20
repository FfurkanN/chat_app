import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DangerAlertComponent } from './components/alerts/alert-danger/alert-danger.component';
import { SuccessAlertComponent } from './components/alerts/success-alert/success-alert.component';
import { InformationAlertComponent } from './components/alerts/information-alert/information-alert.component';
import { AlertService } from './services/alert.service';
import { Alert } from './models/alert';
import { AlertComponent } from './components/alert/alert.component';

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

  constructor(private alertService: AlertService) {
    this.alertService.alert$.subscribe((alert) => {
      this.alerts = alert;
    });
  }
}
