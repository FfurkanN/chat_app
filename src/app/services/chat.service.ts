import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Chat } from '../models/chat';
import { CreateChat } from '../models/chat-create';
import { DeleteChat } from '../models/chat-delete';
import { Message } from '../models/message';
import { MessageSendModel } from '../models/message-send';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  getUserChats(user: User): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(
      environment.apiUrl + `/Chat/GetChats/?userId=${user.id}`
    );
  }
  createChat(createChat: CreateChat): Observable<Chat> {
    console.log('Create', createChat);
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
  getMessagesByChatId(chatId: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(
      `${environment.apiUrl}/Chat/GetMessages/?chatId=${chatId}`
    );
  }
  getUsersFromChat(chatId: string): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${environment.apiUrl}/Chat/GetUsersFromChat/?chatId=${chatId}`
    );
  }

  sendMessage(message: MessageSendModel): Observable<Message> {
    return this.httpClient.post<Message>(
      `${environment.apiUrl}/Chat/SendMessage`,
      message
    );
  }
}
