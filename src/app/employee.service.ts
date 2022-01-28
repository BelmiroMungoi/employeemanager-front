import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = '';

  constructor(private http: HttpClient) {
  }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiServerUrl + '/employee/');
  }

  public getEmployeeById(id: any): Observable<Employee> {
    return this.http.get<Employee>(this.apiServerUrl + '/employee/find/' + id);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiServerUrl + '/employee/', employee)
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiServerUrl + '/employee/', employee)
  }

  public deleteEmployee(id: any): Observable<any> {
    return this.http.delete(this.apiServerUrl + '/employee/' + id, { responseType: 'text' })
  }
}
