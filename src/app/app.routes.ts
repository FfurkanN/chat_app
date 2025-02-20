import { Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { authGuard } from './auth.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileInformationComponent } from './profile-components/profile-information/profile-information.component';
import { ProfileSettingsComponent } from './profile-components/profile-settings/profile-settings.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
  { path: '', component: ChatPageComponent, canActivate: [authGuard] },
  {
    path: 'chat',
    component: ChatPageComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then(
        (c) => c.ProfilePageComponent
      ),
    children: [
      {
        path: 'info/:id',
        loadComponent: () =>
          import(
            './profile-components/profile-information/profile-information.component'
          ).then((c) => c.ProfileInformationComponent),
      },
      {
        path: 'settings/:id',
        loadComponent: () =>
          import(
            './profile-components/profile-settings/profile-settings.component'
          ).then((c) => c.ProfileSettingsComponent),
        canActivate: [authGuard],
      },
      { path: '', redirectTo: 'info', pathMatch: 'full' },
    ],
  },
  { path: 'admin', component: AdminPageComponent, canActivate: [adminGuard] },
];
