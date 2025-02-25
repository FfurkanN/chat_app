import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private httpClient: HttpClient) {}
}
