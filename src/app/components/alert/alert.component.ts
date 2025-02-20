import { Component, Input } from '@angular/core';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() alert: Alert = {
    message: '',
    alertType: 'error',
  };
}
