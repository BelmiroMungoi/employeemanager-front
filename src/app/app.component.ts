import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EmployeeManager';

  public employees!: Employee[];
  employee = new Employee();
  deleteEmployee = new Employee();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(): void {
    document.getElementById('close')?.click();
    this.employeeService.addEmployee(this.employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.employee = new Employee();
        this.getEmployees();
        this.clean()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.clean();
      }
    );
  }

  public onUpdateEmployee(update: Employee) {
    document.getElementById('closeEdit')?.click();
    this.employeeService.updateEmployee(update).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        this.clean();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.clean();
      }
    );
  }

  public onDeleteEmploye(id: any) {
    document.getElementById('closeDelete')?.click();
    this.employeeService.deleteEmployee(id).subscribe(
      (response: void) => {
        alert(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employe of this.employees) {
      if (employe.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employe.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employe.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employe.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employe);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.clean();
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenEditModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.employee = employee;
      button.setAttribute('data-target', '#editEmployeeModal');
    }
    if (mode === 'delete') {
      this.employee = employee;
      button.setAttribute('data-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public clean() {
    this.employee = new Employee();
  }
}
