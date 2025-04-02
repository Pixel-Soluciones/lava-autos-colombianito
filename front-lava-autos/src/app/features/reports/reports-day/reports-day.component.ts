import { EmployeesService } from '@services/employees.service';
import { ReportsService } from './../../../core/services/reports.service';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IEmployee } from 'app/shared/interfaces/employee';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { generateExcelReport } from 'app/shared/utils/generateExcelReport';

@Component({
  selector: 'app-reports-day',
  imports: [
    FormsModule,
    DatePicker,
    FloatLabel,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    SelectModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './reports-day.component.html',
  styleUrl: './reports-day.component.scss',
})
export class ReportsDayComponent {
  fecha_string: string = '';
  employees: IEmployee[] = [];
  ingresosdia: any[] = [];
  totalIngDay: number = 0;
  totalEmployee: number = 0;
  ingresosFiltrados: any[] = [];

  dateForm = new FormGroup({
    fecha: new FormControl<string>('', Validators.required),
  });

  employeeForm = new FormGroup({
    employee: new FormControl<IEmployee | null>(null, Validators.required),
  });

  constructor(
    private reportsService: ReportsService,
    private employeesService: EmployeesService,
    private router: Router
  ) {
    this.employeesService.getAll().subscribe((res) => {
      this.employees = res;
    });
  }

  setDate(event: any) {
    const fecha = new Date(event);

    this.reportsService.getDayReport(fecha).subscribe((res) => {
      if (res.length == 0) {
        Swal.fire({
          title: 'Error',
          text: 'No existe información en el día seleccionado',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
      console.log(res);
      this.ingresosdia = res;
      this.totalIngDay = this.ingresosdia.reduce(
        (sum, ingreso) => sum + ingreso.valor,
        0
      );
    });
  }

  setEmployee(event: SelectChangeEvent) {
    console.log(event.value.nombre);
    console.log(this.ingresosdia);

    this.ingresosFiltrados = this.ingresosdia.filter(
      (ingreso) => ingreso.trabajador === event.value.nombre
    );
    console.log(this.ingresosFiltrados);
    this.totalEmployee =
      (this.ingresosFiltrados.reduce((sum, ingreso) => sum + ingreso.valor, 0) *
        event.value.porcentaje_servicio) /
      100;
  }

  exportReport() {
    if (this.ingresosdia.length === 0) return;
    const worksheet: any[] = [
      ['Id', 'Placa', 'Servicio', 'Trabajador', 'Valor'],
    ];

    this.ingresosdia.forEach((ingreso) => {
      worksheet.push([
        ingreso.id,
        ingreso.placa,
        ingreso.servicio,
        ingreso.trabajador,
        ingreso.valor,
      ]);
    });

    generateExcelReport(worksheet, 'D');
  }

  salir() {
    Swal.fire({
      title: '¿Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32cd32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dateForm.reset();
        this.employeeForm.reset();
        this.ingresosFiltrados.length = 0;
        this.router.navigate(['reports']);
      }
    });
  }
}
