import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../interfaces/employee';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, NavbarComponent],
  standalone: true,
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  @Input() employee: Employee = {
    id: 0,
    name: '',
    role: '',
    salary: 0,
    department: '',
  };
  @Output() submitEmployee = new EventEmitter<Employee>();

  constructor(private router: Router) {}

  get isEditMode(): boolean {
    return !!this.employee.id;
  }

  isFormValid(): boolean {
    return (
      !!this.employee.name &&
      !!this.employee.role &&
      !!this.employee.salary &&
      !!this.employee.department
    );
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  submitForm() {
    if (this.isFormValid()) {
      this.submitEmployee.emit(this.employee);
    }
  }
}
