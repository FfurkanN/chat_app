import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css',
})
export class ProfileInformationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  user: User = {
    id: '',
    firstname: '',
    lastname: '',
    userName: '',
    email: '',
    password: '',
    refreshToken: '',
    isOnline: false,
    profileImageUrl: '',
  };
  enviromentProfileImageUrl: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.user.id = params['id'];
    });
    this.userService.getUsersById([this.user.id]).subscribe({
      next: (res) => {
        this.user = res[0];
        this.enviromentProfileImageUrl =
          environment.profileImageUrl + this.user.profileImageUrl;
        console.log(this.user);
      },
      error: (err) => {
        console.error('Error fetching user by id', err);
      },
    });
  }
}
