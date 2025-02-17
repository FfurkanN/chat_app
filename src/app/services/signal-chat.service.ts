import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../models/message';
import { environmentSignal } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalChatService {
  private hubConnection!: signalR.HubConnection;
  private localStream!: MediaStream;
  private peerConnections: { [key: string]: RTCPeerConnection } = {};
  private readonly configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  };

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

    this.hubConnection.on('ReceiveOffer', (offer, fromUser) => {
      this.handleOffer(offer, fromUser);
    });

    this.hubConnection.on('ReceiveAnswer', (answer, fromUser) => {
      this.handleAnswer(answer, fromUser);
    });

    this.hubConnection.on('ReceiveIceCandidate', (candidate, fromUser) => {
      this.handleIceCandidate(candidate, fromUser);
    });
  }

  public async startLocalStream(): Promise<MediaStream> {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    return this.localStream;
  }

  private createPeerConnection(userId: string) {
    const peerConnection = new RTCPeerConnection(this.configuration);

    this.localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, this.localStream);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.hubConnection.invoke('SendIceCandidate', event.candidate, userId);
      }
    };

    peerConnection.ontrack = (event) => {
      const remoteStream = new MediaStream();
      remoteStream.addTrack(event.track);
      document.dispatchEvent(
        new CustomEvent('remoteStream', {
          detail: { userId, stream: remoteStream },
        })
      );
    };

    return peerConnection;
  }

  private async handleOffer(
    offer: RTCSessionDescriptionInit,
    fromUser: string
  ) {
    this.peerConnections[fromUser] = this.createPeerConnection(fromUser);
    await this.peerConnections[fromUser].setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = await this.peerConnections[fromUser].createAnswer();
    await this.peerConnections[fromUser].setLocalDescription(answer);
    this.hubConnection.invoke('SendAnswer', answer, fromUser);
  }

  public async startCall(userId: string) {
    this.peerConnections[userId] = this.createPeerConnection(userId);
    const offer = await this.peerConnections[userId].createOffer();
    await this.peerConnections[userId].setLocalDescription(offer);
    this.hubConnection.invoke('SendOffer', offer, userId);
  }

  private async handleAnswer(
    answer: RTCSessionDescriptionInit,
    fromUser: string
  ) {
    await this.peerConnections[fromUser].setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  }

  private async handleIceCandidate(
    candidate: RTCIceCandidateInit,
    fromUser: string
  ) {
    await this.peerConnections[fromUser].addIceCandidate(
      new RTCIceCandidate(candidate)
    );
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
