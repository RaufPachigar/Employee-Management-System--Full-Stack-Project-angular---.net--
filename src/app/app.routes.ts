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
    component: EmployeeListComponent,
    canActivate: [authGuard],
  },
  { path: 'add', component: EmployeeAddComponent, canActivate: [authGuard] },
  {
    path: 'edit/:id',
    component: EmployeeAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'registered-users',
    component: RegisteredUserComponent,
    canActivate: [authGuard],
  },
];
