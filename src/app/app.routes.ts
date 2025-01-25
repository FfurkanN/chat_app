import { Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const routes: Routes = [
  { path: '', component: ChatPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
];
