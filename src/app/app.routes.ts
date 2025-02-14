import { Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuard } from './auth.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileInformationComponent } from './profile-components/profile-information/profile-information.component';
import { ProfileSettingsComponent } from './profile-components/profile-settings/profile-settings.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'chat', component: ChatPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,

    children: [
      { path: 'info/:id', component: ProfileInformationComponent },
      {
        path: 'settings/:id',
        component: ProfileSettingsComponent,
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: 'info', pathMatch: 'full' },
    ],
  },
];
