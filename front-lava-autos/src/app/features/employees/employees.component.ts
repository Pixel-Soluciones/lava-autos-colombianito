import { Component } from '@angular/core';
import { TableComponent } from "../../shared/components/table/table.component";
import { IEmployee } from 'app/shared/interfaces/employee';
import { EmployeesService } from '@services/employees.service';
import { getEntityPropiedades } from 'app/shared/models/columnsTables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  imports: [TableComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

  employees: IEmployee[] = []
  columns: string[] = []

  constructor(
    private employeesService : EmployeesService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.columns = getEntityPropiedades('employees');
    this.loadEmployees();
  }

  loadEmployees(){
      this.employeesService.getAll().subscribe({
        next: (data: IEmployee[]) => {
          this.employees = data;
        },
        error: (error) => {
          console.error('Error obteniendo empleados:', error);
        },
      });
  }

  atras(){
    this.router.navigate(['dashboard']);
  }

  nuevoServicio(){
    console.log('nuevo servicio');
  }
}
