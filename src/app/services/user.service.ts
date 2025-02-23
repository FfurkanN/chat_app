import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserByToken(): Observable<User> {
    return this.httpClient.get<User>(
      environment.apiUrl + '/Auth/GetUserByToken'
    );
  }
  getChatsOwnedByUser(): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(
      `${environment.apiUrl}/User/GetOwnedChats`
    );
  }

  getUserCountByChatId(chatId: string): Observable<number> {
    return this.httpClient.get<number>(
      `${environment.apiUrl}/User/GetUserCountByChatId?chatId=${chatId}`
    );
  }

  GetOnlineUserCountByChatId(chatId: string): Observable<number> {
    return this.httpClient.get<number>(
      `${environment.apiUrl}/User/GetOnlineUserCountByChatId?chatId=${chatId}`
    );
  }

  getUserByUsername(username: string): Observable<User | undefined> {
    return this.httpClient.get<User | undefined>(
      `${environment.apiUrl}/User/GetUserByUsername/?username=${username}`
    );
  }
  getUsersById(usersId: string[]): Observable<User[]> {
    return this.httpClient.post<User[]>(
      `${environment.apiUrl}/User/GetUserById`,
      usersId,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
  uploadProfilePicture(file: File, userId: string): Observable<User> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<User>(
      `${environment.apiUrl}/User/UploadProfileImage`,
      formData
    );
  }
}
