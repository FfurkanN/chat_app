import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginRequest } from '../../../core/models/login-req.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  loginReq: LoginRequest = {
    UserNameOrEmail: '',
    Password: '',
    RememberMe: false,
  };

  login(): void {
    this.authService.login(this.loginReq).subscribe({
      next: (res) => {
        this.authService.getUserData();
      },
      error: (err) => {
        console.error(err);
      },
    });
    console.log(this.loginReq);
  }
}
