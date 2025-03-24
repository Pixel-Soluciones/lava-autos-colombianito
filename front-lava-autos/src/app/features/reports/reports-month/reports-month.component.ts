import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { TableReportComponent } from "../../../shared/components/table-report/table-report.component";
import { getEntityPropiedades } from 'app/shared/models/columnsTables';
import { MonthlyReportService } from './services/monthly-report.service';

export interface monthSelected {
  month: number;
  year: number;
}

@Component({
  selector: 'app-reports-month',
  imports: [FloatLabel, DatePicker, FormsModule, ButtonModule, TableReportComponent],
  templateUrl: './reports-month.component.html',
  styleUrl: './reports-month.component.scss'
})
export default class ReportsMonthComponent {
  
  #router= inject(Router);
  #monthlyReportService = inject(MonthlyReportService);

  date: Date[] | undefined;
  cols: any[] = [];
  services: any[] = [];

  selectedMonth(date: Date) {
    if (date) {
      const formattedDate = this.formatDate(date);
      this.#monthlyReportService.get(formattedDate).subscribe((response) => {
        this.services = response;
        this.cols = getEntityPropiedades('monthlyReport');
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

    console.log("📄", worksheet);
  }

  salir() {
    this.#router.navigate(['reports']);
  }

  handleAction(event: any) {
    console.log(event);
  }
}
