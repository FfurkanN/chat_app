import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Chat } from '../models/chat';
import { CreateChat } from '../models/chat-create';
import { DeleteChat } from '../models/chat-delete';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  getUserChats(user: User): Observable<Chat[]> {
    return this.httpClient.post<Chat[]>(
      environment.apiUrl + '/Chat/GetChats',
      user
    );
  }
  createChat(createChat: CreateChat): Observable<Chat> {
    return this.httpClient.post<Chat>(
      environment.apiUrl + '/Chat/Create',
      createChat
    );
  }
  deleteChat(deleteChat: DeleteChat): Observable<Chat> {
    return this.httpClient.delete<Chat>(
      `${environment.apiUrl}/Chat/DeleteChat`,
      { body: deleteChat }
    );
  }
}
