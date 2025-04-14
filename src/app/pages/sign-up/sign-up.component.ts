import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const formData = {
        ...this.signUpForm.value,
        roles: ['User'],
      };

      this.authService.register(formData).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.isLoading = false;
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
