import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.router.navigate(['/employees']);
          } else {
            this.errorMessage = 'Invalid email or password. Please try again.';
            this.isLoading = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorMessage = 'Unable to log in. Please try again later.';
          } else {
            this.errorMessage = 'Invalid email or password. Please try again.';
          }
          this.isLoading = false;
        },
      });
    } else {
      if (this.loginForm.get('email')?.invalid) {
        if (this.loginForm.get('email')?.errors?.['required']) {
          this.errorMessage = 'Email is required';
        } else if (this.loginForm.get('email')?.errors?.['email']) {
          this.errorMessage = 'Please enter a valid email address';
        }
      } else if (this.loginForm.get('password')?.invalid) {
        this.errorMessage = 'Password is required';
      }
    }
  }
}
