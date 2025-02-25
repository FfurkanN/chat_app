import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  userId: string = '';

  // user: User = {
  //   id: '',
  //   firstname: '',
  //   lastname: '',
  //   userName: '',
  //   email: '',
  //   password: '',
  //   chats: [],
  //   refreshToken: '',
  //   isOnline: false,
  // };

  ngOnInit(): void {
    this.route.firstChild?.params.subscribe((params) => {
      this.userId = params['id'];
    });
    // this.getUserById();
  }

  // getUserById() {
  //   this.userService.getUsersById([this.userId]).subscribe({
  //     next: (res) => {
  //       this.user = res[0];
  //     },
  //     error: (err) => {
  //       console.error('Error fetching user by id', err);
  //     },
  //   });
  // }
}
