import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryFormat',
})
export class SalaryPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return '₹' + value.toLocaleString('en-IN');
  }
}
