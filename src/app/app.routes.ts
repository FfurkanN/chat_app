import { Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuard } from './auth.guard';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'chat', component: ChatPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
];
