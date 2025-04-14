import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { EmployeeApiService } from '../Services/employee-api.service';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalaryPipe } from '../salary-pipe/salary.pipe';
import { HighlightDirective } from '../employeeDirectives/highlight.directive';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [
    NgFor,
    NgIf,
    RouterModule,
    SalaryPipe,
    HighlightDirective,
    NavbarComponent,
    DatePipe,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  userInfo: any = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private employeeApiService: EmployeeApiService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading = true;
    this.error = null;

    this.employeeApiService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data.map((employee: any) => {
          const date = new Date(employee.dateOfJoining);
          return {
            ...employee,
            dateOfJoining:
              employee.dateOfJoining || new Date().toISOString().split('T')[0],
          };
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load employees. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  onDeleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.isLoading = true;
      this.error = null;

      this.employeeApiService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (err) => {
          this.error = 'Failed to delete employee. Please try again later.';
          this.isLoading = false;
        },
      });
    }
  }

  canEdit(): boolean {
    return this.userInfo && this.userInfo.role === 'Admin';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
