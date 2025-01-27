import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  constructor() {}
  user: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
  };
  registerUser(): void {
    console.log(this.user);
  }
}
