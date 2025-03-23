import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-reports-month',
  imports: [FloatLabel, DatePicker, FormsModule, ButtonModule],
  templateUrl: './reports-month.component.html',
  styleUrl: './reports-month.component.scss'
})
export default class ReportsMonthComponent {
  
  #router= inject(Router);
  date: Date[] | undefined;

  exportReport() {}

  salir() {
    this.#router.navigate(['reports']);
  }
}
