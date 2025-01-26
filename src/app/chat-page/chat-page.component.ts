import { Component } from '@angular/core';
import { ChatTextboxComponent } from '../../components/chat-textbox/chat-textbox.component';
import { ChatMessageComponent } from '../../components/chat-message/chat-message.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UsersBarComponent } from '../../components/users-bar/users-bar.component';
import { User } from '../../models/User';
import { environment } from '../../environments/environment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    ChatTextboxComponent,
    ChatMessageComponent,
    SidebarComponent,
    UsersBarComponent,
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {
  currentMessage: string = 'lorem ipsum dolor sit amet';
  users: User[] = [];
  apiUrl = `${environment.apiUrl}/user`;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log(data);
    });
  }
}
