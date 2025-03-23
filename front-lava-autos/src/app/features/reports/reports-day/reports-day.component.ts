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
    ButtonModule
  ],
  templateUrl: './reports-day.component.html',
  styleUrl: './reports-day.component.scss',
})
export class ReportsDayComponent {
  fecha_string: string = '';
  employees: IEmployee[] = [];
  ingresosdia: any[] = [];
  serviciosEmployee: any[] = [];

  dateForm = new FormGroup({
    fecha: new FormControl<string>('', Validators.required),
  });

  employeeForm = new FormGroup({
    employee: new FormControl<IEmployee | null>(null, Validators.required),
  });

  setDate(event: any) {
    const fecha = new Date(event);

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

  setEmployee(event: SelectChangeEvent) {}

  exportReport(){}

  salir(){}

}
