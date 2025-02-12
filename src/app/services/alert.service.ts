import { Injectable } from '@angular/core';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  createAlert(alert: Alert): void {
    if (alert.alertType === 'error') {
      console.log('ERROR');
    }
    if (alert.alertType === 'information') {
      console.log('INFORMATIN');
    }
    if (alert.alertType === 'success') {
      console.log('SUCCESS');
    }
  }
}
