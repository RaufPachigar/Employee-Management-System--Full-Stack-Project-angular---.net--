import { Component } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';
import { EmployeeApiService } from '../Services/employee-api.service';
import { Employee } from '../interfaces/employee';

@Component({
  selector: 'app-employee-add',
  imports: [EmployeeFormComponent],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss',
})
export class EmployeeAddComponent {
  employee: Employee = {
    id: 0,
    name: '',
    role: '',
    salary: 0,
    department: '',
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeApiService: EmployeeApiService,
  ) {}

  ngOnInit() {
    const empId = +this.route.snapshot.paramMap.get('id')!;
    if (empId) {
      this.employeeApiService.getEmployeeById(empId).subscribe((data) => {
        this.employee = data;
        this.isEdit = true;
      });
    }
  }

  saveEmployee(empData: Employee) {
    if (this.isEdit) {
      this.employeeApiService.updateEmployee(empData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeApiService.addEmployee(empData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
