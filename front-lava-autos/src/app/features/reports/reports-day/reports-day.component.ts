import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-reports-day',
  imports: [FormsModule, DatePicker, FloatLabel, CardModule, ReactiveFormsModule, InputTextModule, TableModule],
  templateUrl: './reports-day.component.html',
  styleUrl: './reports-day.component.scss'
})
export class ReportsDayComponent {
fecha_string: string = '';

dateForm = new FormGroup({
    fecha: new FormControl<string>('', Validators.required),
  });

}
