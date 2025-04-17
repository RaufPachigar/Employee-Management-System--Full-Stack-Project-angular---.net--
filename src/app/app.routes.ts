import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { authGuard } from './auth/auth.guard';
import { RegisteredUserComponent } from './registered-user/registered-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'employees',
    loadComponent: () =>
      import('./employee-list/employee-list.component').then(
        (c) => c.EmployeeListComponent,
      ),
    // component: EmployeeListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./employee-add/employee-add.component').then(
        (c) => c.EmployeeAddComponent,
      ),
    // component: EmployeeAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./employee-add/employee-add.component').then(
        (c) => c.EmployeeAddComponent,
      ),
    // component: EmployeeAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'registered-users',
    loadComponent: () =>
      import('./registered-user/registered-user.component').then(
        (c) => c.RegisteredUserComponent,
      ),
    // component: RegisteredUserComponent,
    canActivate: [authGuard],
  },
];
