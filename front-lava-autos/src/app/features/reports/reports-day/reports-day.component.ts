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
    private employeesService: EmployeesService
  ) {
    this.employeesService.getAll().subscribe((res) => {
      this.employees = res;
    });
  }

  setDate(event: any) {
    const fecha = new Date(event);

    this.reportsService.getDayReport(fecha).subscribe((res) => {
      console.log(res);
      this.ingresosdia = res;
      this.totalIngDay = this.ingresosdia.reduce(
        (sum, ingreso) => sum + ingreso.valor,
        0
      );
    });

    const opcionesDia: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const diaSemana = fecha.toLocaleDateString('es-ES', opcionesDia);
    const diaCapitalizado =
      diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

    const opcionesFecha: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);

    this.fecha_string = `${diaCapitalizado}, ${fechaFormateada}`;
  }

  setEmployee(event: SelectChangeEvent) {
    console.log(event.value.nombre);
    console.log(this.ingresosdia);

    this.ingresosFiltrados = this.ingresosdia.filter(
      (ingreso) =>
        ingreso.trabajador === event.value.nombre
    );
    console.log(this.ingresosFiltrados);
    this.totalEmployee = this.ingresosFiltrados.reduce(
      (sum, ingreso) => sum + ingreso.valor,
      0
    )*event.value.porcentaje_servicio/100;
  }

  exportReport() {}

  salir() {
    
  }
}
