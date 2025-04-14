import { Component } from '@angular/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentDate = new Date();
}
