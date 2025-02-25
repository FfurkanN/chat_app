import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginRequest } from '../../../core/models/login-req.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginReq: LoginRequest = {
    UserNameOrEmail: '',
    Password: '',
    RememberMe: false,
  };

  login(): void {
    console.log(this.loginReq);
  }
}
