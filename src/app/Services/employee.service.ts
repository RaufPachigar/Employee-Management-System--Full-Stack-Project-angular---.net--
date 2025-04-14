import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: any[] = [];
  private readonly STORAGE_KEY = 'employees';

  constructor() {
    this.loadEmployees();
  }

  private loadEmployees() {
    const storedEmployees = localStorage.getItem(this.STORAGE_KEY);
    this.employees = storedEmployees
      ? JSON.parse(storedEmployees)
      : [
          { id: 1, name: 'Alice Johnson', role: 'Developer', salary: 60000 },
          { id: 2, name: 'Bob Smith', role: 'Designer', salary: 55000 },
        ];
  }

  private saveEmployees() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.employees));
  }

  getEmployees() {
    return this.employees;
  }

  getEmployeeById(id: number) {
    return this.employees.find((emp) => emp.id === id);
  }

  addEmployee(employee: any) {
    employee.id = this.employees.length
      ? Math.max(...this.employees.map((emp) => emp.id)) + 1
      : 1;
    this.employees.push(employee);
    this.saveEmployees();
  }

  updateEmployee(updatedEmp: any) {
    const index = this.employees.findIndex((emp) => emp.id === updatedEmp.id);
    if (index !== -1) {
      this.employees[index] = updatedEmp;
      this.saveEmployees();
    }
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter((emp) => emp.id !== id);
    this.employees = this.employees.map((emp, index) => ({
      ...emp,
      id: index + 1,
    }));
    this.saveEmployees();
  }
}
