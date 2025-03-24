import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { TableReportComponent } from "../../../shared/components/table-report/table-report.component";
import { getEntityPropiedades } from 'app/shared/models/columnsTables';
import { MonthlyReportService } from './services/monthly-report.service';
import { generateExcelReport } from 'app/shared/utils/generateExcelReport';

export interface monthSelected {
  month: number;
  year: number;
}

@Component({
  selector: 'app-reports-month',
  imports: [FloatLabel, DatePicker, FormsModule, ButtonModule, TableReportComponent, CommonModule],
  templateUrl: './reports-month.component.html',
  styleUrl: './reports-month.component.scss'
})
export default class ReportsMonthComponent {
  
  #router= inject(Router);
  #monthlyReportService = inject(MonthlyReportService);

  date: Date[] | undefined;
  cols: any[] = [];
  services: any[] = [];

  total: number = 0;
  total_trabajadores: number = 0;
  total_ganancias: number = 0;
  servicioMasSolicitado: string = '';

  selectedMonth(date: Date) {
    if (date) {
      const formattedDate = this.formatDate(date);
      this.#monthlyReportService.get(formattedDate).subscribe((response) => {
        this.services = response;
        this.cols = getEntityPropiedades('monthlyReport');

        this.total = response.reduce((acc, service) => acc + service.valor, 0);
        this.total_trabajadores = response.reduce((acc, service) => acc + service.valor_porcentaje, 0);
        this.total_ganancias = this.total - this.total_trabajadores;
        this.servicioMasSolicitado = response
          .map(item => item.servicio)
          .reduce((acc, curr, _, arr) => {
            const count = arr.filter(item => item === curr).length;
            return acc.count < count ? { value: curr, count } : acc;
          }, { value: '', count: 0 }).value;
      });
    }
  }

  private formatDate(date: Date): monthSelected {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { month, year };
  }

  exportReport() {
    if (this.services.length === 0) {
      return;
    }
    const worksheet: any[] = [];

    const headers = this.cols.map(col => col.key);
    worksheet.push(headers);

    this.services.forEach(service => {
      const row = this.cols.map(col => service[col.key]);
      worksheet.push(row);
    });

    generateExcelReport(worksheet);
  }

  salir() {
    this.#router.navigate(['reports']);
  }

  handleAction(event: any) {
    console.log(event);
  }
}
