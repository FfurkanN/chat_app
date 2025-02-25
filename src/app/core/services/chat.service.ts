import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { Chat } from '../../models/chat';
import { CreateChat } from '../../models/chat-create';
import { DeleteChat } from '../../models/chat-delete';
import { Message } from '../../models/message';
import { MessageSendModel } from '../../models/message-send';
import { UserChatModel } from '../../models/user-chat';
import { Channel } from '../../models/channel';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  getChats(channelId: string): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(
      `${environment.apiUrl}/Chat/GetChats?channelId=${channelId}`
    );
  }

  getChatById(chatId: string): Observable<Chat> {
    return this.httpClient.get<Chat>(
      `${environment.apiUrl}/Chat/GetChatById?chatId=${chatId}`
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

  getMessages(chatId: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(
      `${environment}/Chat/GetMessages?chatId=${chatId}`
    );
  }

  sendMessage(message: MessageSendModel): Observable<Message> {
    return this.httpClient.post<Message>(
      `${environment.apiUrl}/Chat/SendMessage`,
      message
    );
  }

  uploadChatFile(
    file: File
  ): Observable<{ fileName: string; fileSize: number; fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<{
      fileName: string;
      fileSize: number;
      fileUrl: string;
    }>(`${environment.apiUrl}/Chat/UploadChatFile`, formData);
  }
}
