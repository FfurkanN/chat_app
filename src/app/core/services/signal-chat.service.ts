import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../../models/message';
import { environmentSignal } from '../../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SignalChatService {
  private hubConnection!: signalR.HubConnection;

  constructor(private userService: UserService) {}

  userId: string = '';

  startConnection() {
    this.userService.getUserByToken().subscribe({
      next: (res) => {
        this.userId = res.id;
      },
    });
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environmentSignal.apiUrl)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.hubConnection
          .invoke('Connect', this.userId)
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.error('Error while establishing connection', err);
      });
  }

  receiveMessage(callback: (message: Message) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  userConnected(callback: (userId: string) => void) {
    this.hubConnection.on('UserConnected', callback);
  }
  userDisconnected(callback: (userId: string) => void) {
    this.hubConnection.on('UserDisconnected', callback);
  }
}
