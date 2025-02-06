import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/register-request';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent implements OnInit {
  private router: Router = new Router();
  constructor(private authService: AuthService) {}
  user: RegisterRequest = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  };

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  registerUser(): void {
    this.authService.register(this.user).subscribe({
      next: () => {
        console.log('Registered successfully');
      },
      error: (err) => {
        console.error('Register failed', err);
      },
    });
  }
}
