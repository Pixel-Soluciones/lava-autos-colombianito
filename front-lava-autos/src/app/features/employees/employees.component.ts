import { Component } from '@angular/core';
import { TableComponent } from "../../shared/components/table/table.component";
import { IEmployee } from 'app/shared/interfaces/employee';
import { EmployeesService } from '@services/employees.service';
import { getEntityPropiedades } from 'app/shared/models/columnsTables';
import { Router } from '@angular/router';
import { Action } from 'app/shared/interfaces/action';
import { NavFooterComponent } from "../../shared/components/nav-footer/nav-footer.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  imports: [TableComponent, NavFooterComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export default class EmployeesComponent {

  employees: IEmployee[] = []
  columns: string[] = []

  icon: string = 'iconos-botones/nuevo-trabajador.png';

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

  newEmplooye(){
    this.router.navigate(['employees/new']);
  }

  handleAction(action: Action) {
    if (action.action == 'Edit') {
      this.edit(action.row)
    } else if (action.action == 'Delete') {
      this.delete(action.row.cedula)
    }
  }

  edit(employee: IEmployee) {
    console.log('edit', employee);
    this.router.navigate(['employees/new', employee]);
  }

  delete(id: number) {
    Swal.fire({
      title: "¿Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32cd32",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          showConfirmButton:false,
          title: "Empleado eliminado",
          icon: "error",
          timer:1500
        });
        this.employeesService.delete(id).subscribe((res) => {
          this.loadEmployees();
        });
      }
    });
  }
}
