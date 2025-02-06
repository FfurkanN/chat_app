import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Chat } from '../models/chat';
import { Username } from '../models/username';

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
  getUserChats(user: User): Observable<Chat[]> {
    return this.httpClient.post<Chat[]>(
      environment.apiUrl + '/Chat/GetChats',
      user
    );
  }
  getUserByUsername(username: Username): Observable<User | undefined> {
    return this.httpClient.post<User | undefined>(
      environment.apiUrl + '/User/GetUserByUsername',
      username
    );
  }
}
