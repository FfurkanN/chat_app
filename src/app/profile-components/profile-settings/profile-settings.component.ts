import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css',
})
export class ProfileSettingsComponent implements OnInit {
  selectedFile: File | null = null;
  uploadedFileUrl: string | null = null;
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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.user.id = params['id'];
    });
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
    }
  }
  uploadProfileImage() {
    if (this.selectedFile) {
      this.userService
        .uploadProfilePicture(this.selectedFile, this.user.id)
        .subscribe({
          next(res) {
            console.log(res);
          },
          error(err) {
            console.error(err);
          },
        });
    }
  }
}
