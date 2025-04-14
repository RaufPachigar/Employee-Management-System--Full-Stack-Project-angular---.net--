import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  private readonly API_URL = 'https://localhost:44376/api/Employees';

  constructor(private readonly HttpCLient: HttpClient) {}
  getEmployees() {
    return this.HttpCLient.get<any[]>(`${this.API_URL}/GetData`);
  }

  getEmployeeById(id: number) {
    return this.HttpCLient.get<any>(`${this.API_URL}/GetData/${id}`);
  }
  addEmployee(employee: any) {
    return this.HttpCLient.post(`${this.API_URL}/CreateData`, employee);
  }
  updateEmployee(employee: any) {
    return this.HttpCLient.put(`${this.API_URL}/UpdateData`, employee);
  }
  deleteEmployee(id: number) {
    return this.HttpCLient.delete(`${this.API_URL}/Delete/${id}`);
  }
}
