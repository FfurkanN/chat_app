import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { AlertService } from '../../core/services/alert.service';

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
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.user.id = params['id'];
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedFileUrl = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  uploadProfileImage() {
    if (this.selectedFile) {
      this.userService
        .uploadProfilePicture(this.selectedFile, this.user.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.createUploadedAlert();
            this.router.navigate(['/profile/info', this.user.id]);
          },
          error(err) {
            console.error(err);
          },
        });
    }
  }

  createUploadedAlert() {
    this.alertService.createAlert({
      message: 'Profile image changed successfully!',
      alertType: 'success',
    });
  }
}
