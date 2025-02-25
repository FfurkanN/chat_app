import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { Chat } from '../../models/chat';
import { Channel } from '../../models/channel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserChannels(): Observable<Channel[]> {
    return this.httpClient.get<Channel[]>(
      `${environment}/User/GetUserChannels`
    );
  }

  getOwnedChannels(): Observable<Channel[]> {
    return this.httpClient.get<Channel[]>(
      `${environment.apiUrl}/User/GetOwnedChannels`
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
