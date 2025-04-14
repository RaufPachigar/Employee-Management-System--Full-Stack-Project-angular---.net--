import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { User } from '../interfaces/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-registered-user',
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './registered-user.component.html',
  styleUrl: './registered-user.component.scss',
})
export class RegisteredUserComponent {
  users: User[] = [];
  error: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  canEdit(): boolean {
    const userInfo = this.authService.getUserInfo();
    return userInfo?.role === 'Admin';
  }

  ngOnInit() {
    this.isLoading = true;
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  deleteUser(id: string) {
    const currentUser = this.authService.getUserInfo();
    if (!currentUser) {
      this.error = 'User information not found. Please log in again.';
      return;
    }

    if (currentUser.nameid === id) {
      this.error = 'You cannot delete your own account while logged in.';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.authService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);
        this.isLoading = false;
      },
      error: (err) => {
        this.error =
          'Failed to delete user. The user may have already been deleted or you may not have sufficient permissions.';
        this.isLoading = false;
      },
    });
  }
}
