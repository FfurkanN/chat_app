import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../models/message';
import { environmentSignal } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalChatService {
  private hubConnection!: signalR.HubConnection;

  constructor() {}

  startConnection(userId: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environmentSignal.apiUrl)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');

        this.hubConnection
          .invoke('Connect', userId)
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
