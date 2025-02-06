import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  private router: Router = new Router();
  error: string = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  credentials: LoginRequest = {
    UserNameOrEmail: '',
    password: '',
  };

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        console.log('login successfull');
        this.router.navigate(['/chat']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.error = 'Username or Password is wrong!';
      },
    });
  }
}
